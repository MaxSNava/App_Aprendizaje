import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { Prueba } from './entities/prueba.entity';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  findOne(id: number) {
    return `This action returns a #${id} prueba`;
  }

  update(id: number, updatePruebaDto: UpdatePruebaDto) {
    return `This action updates a #${id} prueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} prueba`;
  }
}
