import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { PruebasService } from '../pruebas/pruebas.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHelloWorldReport } from '../reports';

@Injectable()
export class ReporteService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly pruebasService: PruebasService,
  ) {}

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'John Doe' });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async generarReportePrueba(pruebaId: string) {
    // Obtener la prueba y sus resultados
    const prueba =
      await this.pruebasService.obtenerPruebaConResultados(pruebaId);

    if (!prueba) {
      throw new Error('Prueba no encontrada');
    }

    // Crear el docDefinition basado en el tipo de prueba
    const docDefinition = this.crearDocDefinition(prueba);

    // Generar el PDF
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  crearDocDefinition(prueba: any): TDocumentDefinitions {
    // Ejemplo para una prueba VARK
    if (prueba.tipoPrueba === 'vark') {
      const docDefinition: TDocumentDefinitions = {
        content: [
          { text: 'Reporte de Resultados - VARK', style: 'header' },
          { text: `Nombre: ${prueba.usuario.nombre}`, style: 'subheader' },
          {
            text: `Fecha: ${new Date(prueba.fechaRealizacion).toLocaleDateString()}`,
            style: 'subheader',
          },
          { text: 'Resultados:', style: 'subheader' },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Estilo', 'Puntaje'],
                ['Visual', prueba.resultadoVark.visual.toString()],
                ['Auditivo', prueba.resultadoVark.auditivo.toString()],
                [
                  'Lectura/Escritura',
                  prueba.resultadoVark.lecturaEscritura.toString(),
                ],
                ['Kinestésico', prueba.resultadoVark.kinestesico.toString()],
              ],
            },
          },
          {
            text: `Estilo Dominante: ${prueba.resultadoVark.tipoResultado}`,
            style: 'subheader',
          },
          // Agrega interpretaciones y recomendaciones aquí
        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        },
      };
      return docDefinition;
    }

    if (prueba.tipoPrueba === 'mbti') {
      const docDefinition: TDocumentDefinitions = {
        content: [
          { text: 'Reporte de Resultados - MBTI', style: 'header' },
          { text: `Nombre: ${prueba.usuario.nombre}`, style: 'subheader' },
          {
            text: `Fecha: ${new Date(prueba.fechaRealizacion).toLocaleDateString()}`,
            style: 'subheader',
          },
          { text: 'Resultados:', style: 'subheader' },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Dimensión', 'Puntaje'],
                ['Extrovertido', prueba.resultadoMbti.extrovertido.toString()],
                ['Introvertido', prueba.resultadoMbti.introvertido.toString()],
                ['Sensorial', prueba.resultadoMbti.sensorial.toString()],
                ['Intuitivo', prueba.resultadoMbti.intuitivo.toString()],
                ['Racional', prueba.resultadoMbti.racional.toString()],
                ['Emocional', prueba.resultadoMbti.emocional.toString()],
                ['Calificador', prueba.resultadoMbti.calificador.toString()],
                ['Perceptivo', prueba.resultadoMbti.perceptivo.toString()],
              ],
            },
          },
          {
            text: `Tipo de Personalidad: ${prueba.resultadoMbti.tipoPersonalidad}`,
            style: 'subheader',
          },
        ],
        styles: {
          header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        },
      };
      return docDefinition;
    }

    throw new Error('Tipo de prueba no soportado');
  }
}
