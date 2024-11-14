import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class GruposService {
  private readonly logger = new Logger('GruposService');

  constructor(
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

  async create(createGrupoDto: CreateGrupoDto) {
    try {
      const grupo = this.grupoRepository.create(createGrupoDto);
      await this.grupoRepository.save(grupo);
      return grupo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(pagintationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = pagintationDto;
    const grupos = await this.grupoRepository.find({
      take: limit,
      skip: offset,
    });
    return grupos;
  }

  async findOne(term: string) {
    let grupo: Grupo;

    if (isUUID(term)) {
      grupo = await this.grupoRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.grupoRepository.createQueryBuilder('grupo');
      grupo = await queryBuilder
        .where(`LOWER(nombre)=:nombre`, { nombre: term.toLowerCase() })
        .getOne();
    }
    if (!grupo) throw new NotFoundException('Grupo not found');
    return grupo;
  }

  async update(id: string, updateGrupoDto: UpdateGrupoDto) {
    const { ...toUpdate } = updateGrupoDto;
    const grupo = await this.grupoRepository.preload({ id, ...toUpdate });
    if (!grupo) throw new NotFoundException(`Grupo #${id} not found`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(grupo);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return grupo;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const grupo = await this.findOne(id);
    await this.grupoRepository.remove(grupo);
    return {
      message: `Grupo #${id} deleted`,
    };
  }
}
