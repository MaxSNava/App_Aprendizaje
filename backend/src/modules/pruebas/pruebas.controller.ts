import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PruebasService } from './pruebas.service';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pruebas')
export class PruebasController {
  constructor(private readonly pruebasService: PruebasService) {}

  @Post()
  create(@Body() createPruebaDto: CreatePruebaDto) {
    return this.pruebasService.create(createPruebaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pruebasService.findAll(paginationDto);
  }

  // @Get(':term')
  // findOne(@Param('term') term: string) {
  //   return this.pruebasService.findOnePlain(term);
  // }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePruebaDto: UpdatePruebaDto,
  ) {
    return this.pruebasService.update(id, updatePruebaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pruebasService.remove(id);
  }

  // ------------------- VARK -------------------
  @Get('vark')
  async getVarkPreguntasYOpciones() {
    return this.pruebasService.getVarkPreguntasYOpciones();
  }

  @Post(':pruebaId/vark')
  async guardarRespuestasVark(
    @Param('pruebaId') pruebaId: string,
    @Body()
    respuestas: {
      preguntaId: number;
      opcionId: number;
    }[],
  ) {
    return this.pruebasService.guardarRespuestasVark(pruebaId, respuestas);
  }

  @Get(':pruebaId/vark/resultados')
  async obtenerResultadosVark(
    @Param('pruebaId', ParseUUIDPipe) pruebaId: string,
  ) {
    return this.pruebasService.obtenerResultadosVark(pruebaId);
  }

  // ------------------- MBTI -------------------
  @Get('mbti')
  async obtenerPreguntasMbti() {
    return this.pruebasService.obtenerPreguntasMbti();
  }

  @Post(':pruebaId/mbti')
  async guardarRespuestasMbti(
    @Param('pruebaId', ParseUUIDPipe) pruebaId: string,
    @Body()
    respuestas: { preguntaId: number; opcionId: number }[],
  ) {
    return this.pruebasService.guardarRespuestasMbti(pruebaId, respuestas);
  }

  @Get(':pruebaId/mbti/resultados')
  async obtenerResultadosMbti(
    @Param('pruebaId', ParseUUIDPipe) pruebaId: string,
  ) {
    return this.pruebasService.obtenerResultadosMbti(pruebaId);
  }
}
