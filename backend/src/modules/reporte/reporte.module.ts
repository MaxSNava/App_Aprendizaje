import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { PrinterModule } from '../printer/printer.module';

@Module({
  controllers: [ReporteController],
  providers: [ReporteService],
  imports: [PrinterModule],
})
export class ReporteModule {}
