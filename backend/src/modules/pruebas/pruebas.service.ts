import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Prueba } from './entities/prueba.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class PruebasService {
  private readonly logger = new Logger('PruebasService');

  constructor(
    @InjectRepository(Prueba)
    private readonly pruebaRepository: Repository<Prueba>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly dataSource: DataSource,
  ) {}

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException({
      message: 'Unexpected error, check the server logs',
      error: error.message,
    });
  }

  async create(createPruebaDto: CreatePruebaDto) {
    const { tipoPrueba, usuarioId } = createPruebaDto;
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });
    if (!usuario)
      throw new BadRequestException(
        `Usuario con ID ${usuarioId} no encontrado`,
      );
    try {
      const prueba = this.pruebaRepository.create({
        tipoPrueba,
        usuario,
      });
      await this.pruebaRepository.save(prueba);
      return prueba;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const pruebas = await this.pruebaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        usuario: true,
      },
    });
    return pruebas.map(({ usuario, ...data }) => ({
      ...data,
      usuario: usuario.nombre,
    }));
  }

  async findOne(term: string) {
    let prueba: Prueba;
    const queryBuilder = this.pruebaRepository.createQueryBuilder('prueba');
    if (isUUID(term)) {
      prueba = await queryBuilder
        .where(`prueba.id = :id`, { id: term })
        .leftJoinAndSelect('prueba.usuario', 'usuario')
        .getOne();
    } else {
      prueba = await queryBuilder
        .where(`LOWER("tipoPrueba") =:tipoPrueba`, {
          tipoPrueba: term.toLowerCase(),
        })
        .leftJoinAndSelect('prueba.usuario', 'usuario')
        .getOne();
    }
    if (!prueba)
      throw new NotFoundException(`Prueba con término ${term} no encontrado`);
    return prueba;
  }

  async findOnePlain(term: string) {
    const { usuario, ...data } = await this.findOne(term);
    return {
      ...data,
      usuario: usuario.nombre,
    };
  }

  async update(id: string, updatePruebaDto: UpdatePruebaDto) {
    const { usuarioId, ...data } = updatePruebaDto;
    const prueba = await this.pruebaRepository.preload({ id, ...data });
    if (!prueba) throw new NotFoundException(`Prueba #${id} no encontrada`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (usuarioId) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Prueba, 'usuario')
          .of(prueba)
          .remove(prueba.usuario);
      }
      await queryRunner.manager.save(prueba);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const prueba = await this.findOne(id);
    await this.pruebaRepository.remove(prueba);
    return {
      message: `Prueba #${id} eliminada`,
    };
  }
}
