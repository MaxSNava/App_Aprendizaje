import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { VarkPregunta } from './vark_preguntas.entity';
import { VarkOpcion } from './vark_opciones.entity';

@Entity('respuestas_vark')
export class RespuestaVark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VarkPregunta, { onDelete: 'CASCADE' })
  pregunta: VarkPregunta;

  @ManyToOne(() => VarkOpcion, { onDelete: 'CASCADE' })
  opcion: VarkOpcion;
}
