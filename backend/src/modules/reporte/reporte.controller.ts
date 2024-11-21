import { Controller, Get, Res } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { Response } from 'express';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Get()
  async hello(@Res() res: Response) {
    const pdfDoc = this.reporteService.hello();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello_World';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
