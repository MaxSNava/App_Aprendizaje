import { Module } from '@nestjs/common';
import { PruebasService } from './pruebas.service';
import { PruebasController } from './pruebas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Grupo } from '../grupos/entities/grupo.entity';

import {
  RespuestaVark,
  ResultadoVark,
  VarkOpcion,
  VarkPregunta,
} from '../../seed/entities/vark';
import {
  MbtiOpcion,
  MbtiPregunta,
  RespuestaMbti,
  ResultadoMbti,
} from '../../seed/entities/mbti';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prueba,
      Usuario,
      Grupo,
      RespuestaVark,
      ResultadoVark,
      VarkOpcion,
      VarkPregunta,
      MbtiOpcion,
      MbtiPregunta,
      RespuestaMbti,
      ResultadoMbti,
    ]),
  ],
  controllers: [PruebasController],
  providers: [PruebasService],
})
export class PruebasModule {}
