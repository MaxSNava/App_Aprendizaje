import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { Contacto } from './entities/contacto.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ContactoService {
  private readonly logger = new Logger('ContactoService');

  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,

    private readonly dataSource: DataSource,
  ) {}

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException({
      message: 'Error inesperado, revisa los logs del servidor',
      error: error.message,
    });
  }

  async create(createContactoDto: CreateContactoDto) {
    try {
      const contacto = this.contactoRepository.create(createContactoDto);
      await this.contactoRepository.save(contacto);
      return contacto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const contactos = await this.contactoRepository.find({
      take: limit,
      skip: offset,
    });
    return contactos;
  }

  async findOne(term: string) {
    let contacto: Contacto;

    if (isUUID(term)) {
      contacto = await this.contactoRepository.findOneBy({ id: term });
    } else {
      const queryBuilder =
        this.contactoRepository.createQueryBuilder('contacto');
      contacto = await queryBuilder
        .where('LOWER(nombre) = :nombre', { nombre: term.toLowerCase() })
        .getOne();
    }

    if (!contacto) throw new NotFoundException('Contacto no encontrado');
    return contacto;
  }

  async update(id: string, updateContactoDto: UpdateContactoDto) {
    const { ...toUpdate } = updateContactoDto;
    const contacto = await this.contactoRepository.preload({ id, ...toUpdate });
    if (!contacto) throw new NotFoundException(`Contacto #${id} no encontrado`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(contacto);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return contacto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const contacto = await this.findOne(id);
    await this.contactoRepository.remove(contacto);
    return {
      message: `Contacto #${id} eliminado`,
    };
  }
}
