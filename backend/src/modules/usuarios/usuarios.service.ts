import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { DataSource, Repository } from 'typeorm';
import { Grupo } from '../grupos/entities/grupo.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
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

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { grupos = [], ...usuarioData } = createUsuarioDto;
      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        grupos: grupos.map((g) => this.grupoRepository.create({ id: g })),
      });
      await this.usuarioRepository.save(usuario);
      return { ...usuario, grupos };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const usuarios = await this.usuarioRepository.find({
      take: limit,
      skip: offset,
      relations: {
        grupos: true,
      },
    });
    return usuarios.map(({ grupos, ...data }) => ({
      ...data,
      grupos: grupos.map((g) => g.nombre),
    }));
  }

  async findOne(term: string) {
    let usuario: Usuario;
    const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario');
    if (isUUID(term)) {
      usuario = await queryBuilder
        .where(`usuario.id = :id`, { id: term })
        .leftJoinAndSelect('usuario.grupos', 'grupo')
        .getOne();
    } else {
      usuario = await queryBuilder
        .where(`LOWER(usuario.nombre) = :nombre`, {
          nombre: term.toLowerCase(),
        })
        .leftJoinAndSelect('usuario.grupos', 'grupo')
        .getOne();
    }
    if (!usuario) throw new NotFoundException(`Usuario ${term} not found`);
    return usuario;
  }

  async findOnePlain(term: string) {
    const { grupos = [], ...data } = await this.findOne(term);
    return {
      ...data,
      grupos: grupos.map((g) => g.nombre),
    };
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { grupos, ...userData } = updateUsuarioDto;
    const usuario = await this.usuarioRepository.preload({ id, ...userData });
    if (!usuario) throw new NotFoundException(`Usuario #${id} not found`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (grupos) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Usuario, 'grupos')
          .of(usuario)
          .remove(usuario.grupos);
        usuario.grupos = grupos.map((g) =>
          this.grupoRepository.create({ id: g }),
        );
      }
      await queryRunner.manager.save(usuario);
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
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return {
      message: `Usuario #${id} deleted successfully`,
    };
  }

  async count(): Promise<number> {
    return await this.usuarioRepository.count();
  }
}
