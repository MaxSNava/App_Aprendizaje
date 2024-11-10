import { Controller } from '@nestjs/common';
import { ReporteService } from './reporte.service';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}
}
