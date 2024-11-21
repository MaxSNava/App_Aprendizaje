import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from '../reports';

@Injectable()
export class ReporteService {
  constructor(private readonly printerService: PrinterService) {}

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'John Doe' });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
