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
import {
  RespuestaVark,
  ResultadoVark,
  VarkOpcion,
  VarkPregunta,
} from 'src/seed/entities/vark';
import {
  MbtiOpcion,
  MbtiPregunta,
  RespuestaMbti,
  ResultadoMbti,
} from 'src/seed/entities/mbti';

@Injectable()
export class PruebasService {
  private readonly logger = new Logger('PruebasService');

  constructor(
    @InjectRepository(Prueba)
    private readonly pruebaRepository: Repository<Prueba>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    // ------------------- VARK -------------------
    @InjectRepository(RespuestaVark)
    private readonly respuestaVarkRepository: Repository<RespuestaVark>,
    @InjectRepository(ResultadoVark)
    private readonly resultadoVarkRepository: Repository<ResultadoVark>,
    @InjectRepository(VarkPregunta)
    private readonly varkPreguntaRepository: Repository<VarkPregunta>,
    @InjectRepository(VarkOpcion)
    private readonly varkOpcionRepository: Repository<VarkOpcion>,
    // ------------------- MBTI -------------------
    @InjectRepository(RespuestaMbti)
    private readonly respuestaMbtiRepository: Repository<RespuestaMbti>,
    @InjectRepository(ResultadoMbti)
    private readonly resultadoMbtiRepository: Repository<ResultadoMbti>,
    @InjectRepository(MbtiPregunta)
    private readonly mbtiPreguntaRepository: Repository<MbtiPregunta>,
    @InjectRepository(MbtiOpcion)
    private readonly mbtiOpcionRepository: Repository<MbtiOpcion>,
    // ---------------------------------------------
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

  // ------------------- VARK -------------------
  async getVarkPreguntasYOpciones() {
    try {
      const preguntas = await this.varkPreguntaRepository.find();
      const opciones = await this.varkOpcionRepository.find();
      const preguntasConOpciones = preguntas.map((pregunta) => {
        return {
          id: pregunta.id,
          textoPregunta: pregunta.textoPregunta,
          opciones: opciones
            //preguntaId === pregunta.id)
            .filter((opcion) => opcion.preguntaId === pregunta.id)
            .map((opcion) => ({
              id: opcion.id,
              textoOpcion: opcion.textoOpcion,
              estilo: opcion.estilo,
            })),
        };
      });
      return preguntasConOpciones;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async obtenerResultadosVark(pruebaId: string): Promise<ResultadoVark> {
    const prueba = await this.pruebaRepository.findOne({
      where: { id: pruebaId },
      relations: ['resultadoVark'], // Cargar la relación con resultados
    });

    if (!prueba)
      throw new NotFoundException(`Prueba con ID ${pruebaId} no encontrada`);

    if (!prueba.resultadoVark)
      throw new NotFoundException(
        `Resultados para la prueba con ID ${pruebaId} no encontrados`,
      );

    return prueba.resultadoVark;
  }

  async guardarRespuestasVark(
    pruebaId: string,
    respuestas: { preguntaId: number; opcionId: number }[],
  ) {
    // Validar que la prueba existe y es de tipo VARK
    const prueba = await this.pruebaRepository.findOne({
      where: { id: pruebaId },
    });

    if (!prueba || prueba.tipoPrueba.toLowerCase() !== 'vark')
      throw new Error('Prueba no válida o no es de tipo VARK');

    // Guardar las respuestas en la tabla `respuestas_vark`
    const respuestasEntidades = respuestas.map((respuesta) =>
      this.respuestaVarkRepository.create({
        prueba: { id: pruebaId },
        pregunta: { id: respuesta.preguntaId },
        opcion: { id: respuesta.opcionId },
      }),
    );
    await this.respuestaVarkRepository.save(respuestasEntidades);

    // Calcular los resultados
    const resultado = await this.calcularResultadoVark(pruebaId);

    // Guardar el resultado en `resultados_vark`
    const nuevoResultado = this.resultadoVarkRepository.create(resultado);
    const savedResultado =
      await this.resultadoVarkRepository.save(nuevoResultado);

    // Relacionar el resultado con la prueba
    prueba.resultadoVark = savedResultado;
    await this.pruebaRepository.save(prueba);

    return savedResultado;
  }

  private async calcularResultadoVark(
    pruebaId: string,
  ): Promise<Partial<ResultadoVark>> {
    const respuestas = await this.respuestaVarkRepository.find({
      where: { prueba: { id: pruebaId } },
      relations: ['opcion'],
    });

    // Calcular los puntajes por estilo
    const resultado = {
      visual: 0,
      auditivo: 0,
      lecturaEscritura: 0,
      kinestesico: 0,
      tipoResultado: '',
    };

    respuestas.forEach((respuesta) => {
      switch (respuesta.opcion.estilo) {
        case 'V':
          resultado.visual++;
          break;
        case 'A':
          resultado.auditivo++;
          break;
        case 'R':
          resultado.lecturaEscritura++;
          break;
        case 'K':
          resultado.kinestesico++;
          break;
      }
    });

    // Determinar el estilo dominante
    const maxPuntaje = Math.max(
      resultado.visual,
      resultado.auditivo,
      resultado.lecturaEscritura,
      resultado.kinestesico,
    );
    if (maxPuntaje === resultado.visual) resultado.tipoResultado = 'Visual';
    else if (maxPuntaje === resultado.auditivo)
      resultado.tipoResultado = 'Auditivo';
    else if (maxPuntaje === resultado.lecturaEscritura)
      resultado.tipoResultado = 'Lectura/Escritura';
    else if (maxPuntaje === resultado.kinestesico)
      resultado.tipoResultado = 'Kinestésico';

    return resultado;
  }

  // ------------------- MBTI -------------------
  async obtenerPreguntasMbti() {
    try {
      const preguntas = await this.mbtiPreguntaRepository.find({
        relations: ['opciones'],
      });

      return preguntas.map((pregunta) => ({
        id: pregunta.id,
        textoPregunta: pregunta.textoPregunta,
        dimension: pregunta.dimension,
        opciones: pregunta.opciones.map((opcion) => ({
          id: opcion.id,
          textoOpcion: opcion.textoOpcion,
          puntaje: opcion.puntaje,
          categoria: opcion.categoria,
        })),
      }));
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private async calcularResultadoMbti(
    pruebaId: string,
  ): Promise<Partial<ResultadoMbti>> {
    const respuestas = await this.respuestaMbtiRepository.find({
      where: { prueba: { id: pruebaId } },
      relations: ['opcion'],
    });

    const resultado = {
      extrovertido: 0,
      introvertido: 0,
      sensorial: 0,
      intuitivo: 0,
      racional: 0,
      emocional: 0,
      calificador: 0,
      perceptivo: 0,
      tipoPersonalidad: '',
    };

    respuestas.forEach((respuesta) => {
      switch (respuesta.opcion.categoria) {
        case 'E':
          resultado.extrovertido += respuesta.opcion.puntaje;
          break;
        case 'I':
          resultado.introvertido += respuesta.opcion.puntaje;
          break;
        case 'S':
          resultado.sensorial += respuesta.opcion.puntaje;
          break;
        case 'N':
          resultado.intuitivo += respuesta.opcion.puntaje;
          break;
        case 'T':
          resultado.racional += respuesta.opcion.puntaje;
          break;
        case 'F':
          resultado.emocional += respuesta.opcion.puntaje;
          break;
        case 'J':
          resultado.calificador += respuesta.opcion.puntaje;
          break;
        case 'P':
          resultado.perceptivo += respuesta.opcion.puntaje;
          break;
      }
    });

    resultado.tipoPersonalidad = this.determinarTipoPersonalidad(resultado);

    return resultado;
  }

  private determinarTipoPersonalidad(
    resultado: Partial<ResultadoMbti>,
  ): string {
    const tipo = [
      resultado.extrovertido >= resultado.introvertido ? 'E' : 'I',
      resultado.sensorial >= resultado.intuitivo ? 'S' : 'N',
      resultado.racional >= resultado.emocional ? 'T' : 'F',
      resultado.calificador >= resultado.perceptivo ? 'J' : 'P',
    ];
    return tipo.join('');
  }

  async guardarRespuestasMbti(
    pruebaId: string,
    respuestas: { preguntaId: number; opcionId: number }[],
  ) {
    const prueba = await this.pruebaRepository.findOne({
      where: { id: pruebaId },
    });

    if (!prueba || prueba.tipoPrueba.toLowerCase() !== 'mbti') {
      throw new BadRequestException('Prueba no válida o no es de tipo MBTI');
    }

    const respuestasEntidades = respuestas.map((respuesta) =>
      this.respuestaMbtiRepository.create({
        prueba: { id: pruebaId },
        pregunta: { id: respuesta.preguntaId },
        opcion: { id: respuesta.opcionId },
      }),
    );

    await this.respuestaMbtiRepository.save(respuestasEntidades);

    const resultado = await this.calcularResultadoMbti(pruebaId);

    const nuevoResultado = this.resultadoMbtiRepository.create(resultado);
    const savedResultado =
      await this.resultadoMbtiRepository.save(nuevoResultado);

    prueba.resultadoMbti = savedResultado;
    await this.pruebaRepository.save(prueba);

    return savedResultado;
  }

  async obtenerResultadosMbti(pruebaId: string): Promise<ResultadoMbti> {
    // Buscar la prueba con su resultado relacionado
    const prueba = await this.pruebaRepository.findOne({
      where: { id: pruebaId },
      relations: ['resultadoMbti'], // Cargar la relación con resultados
    });

    if (!prueba) {
      throw new NotFoundException(`Prueba con ID ${pruebaId} no encontrada`);
    }

    if (!prueba.resultadoMbti) {
      throw new NotFoundException(
        `Resultados para la prueba con ID ${pruebaId} no encontrados`,
      );
    }

    // Retornar los resultados MBTI asociados
    return prueba.resultadoMbti;
  }
}
