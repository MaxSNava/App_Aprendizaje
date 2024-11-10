import { Module } from '@nestjs/common';
import { PruebasService } from './pruebas.service';
import { PruebasController } from './pruebas.controller';
import { ResultadosModule } from './resultados/resultados.module';

@Module({
  controllers: [PruebasController],
  providers: [PruebasService],
  imports: [ResultadosModule],
})
export class PruebasModule {}
