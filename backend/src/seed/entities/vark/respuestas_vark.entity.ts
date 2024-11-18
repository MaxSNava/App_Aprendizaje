import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Prueba } from 'src/modules/pruebas/entities/prueba.entity';
import { VarkPregunta } from './vark_preguntas.entity';
import { VarkOpcion } from './vark_opciones.entity';

@Entity('respuestas_vark')
export class RespuestaVark {
  @PrimaryGeneratedColumn()
  id: number;

  // -- Relationships -- //
  @ManyToOne(() => Prueba, { onDelete: 'CASCADE' })
  prueba: Prueba;

  @ManyToOne(() => VarkPregunta, { onDelete: 'CASCADE' })
  pregunta: VarkPregunta;

  @ManyToOne(() => VarkOpcion, { onDelete: 'CASCADE' })
  opcion: VarkOpcion;
}
