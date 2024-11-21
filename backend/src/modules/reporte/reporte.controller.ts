import { Controller, Get, Param, Res } from '@nestjs/common';
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

  @Get(':pruebaId')
  async generarReporte(
    @Param('pruebaId') pruebaId: string,
    @Res() res: Response,
  ) {
    try {
      const pdfDoc = await this.reporteService.generarReportePrueba(pruebaId);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=reporte_${pruebaId}.pdf`,
      );
      pdfDoc.pipe(res);
      pdfDoc.end();
    } catch (error) {
      res.status(500).send(`Error al generar el reporte: ${error.message}`);
    }
  }
}
