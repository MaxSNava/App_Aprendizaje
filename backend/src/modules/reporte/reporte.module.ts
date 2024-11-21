import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { PrinterModule } from '../printer/printer.module';
import { PruebasModule } from '../pruebas/pruebas.module';

@Module({
  controllers: [ReporteController],
  providers: [ReporteService],
  imports: [PrinterModule, PruebasModule],
})
export class ReporteModule {}
