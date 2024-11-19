import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PruebasModule } from 'src/modules/pruebas/pruebas.module';
import {
  RespuestaVark,
  ResultadoVark,
  VarkOpcion,
  VarkPregunta,
} from './entities/vark';
import {
  MbtiOpcion,
  MbtiPregunta,
  RespuestaMbti,
  ResultadoMbti,
} from './entities/mbti';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([
      RespuestaVark,
      ResultadoVark,
      VarkOpcion,
      VarkPregunta,
      MbtiOpcion,
      MbtiPregunta,
      RespuestaMbti,
      ResultadoMbti,
    ]),
    AuthModule,
    PruebasModule,
  ],
  exports: [TypeOrmModule],
})
export class SeedModule {}
