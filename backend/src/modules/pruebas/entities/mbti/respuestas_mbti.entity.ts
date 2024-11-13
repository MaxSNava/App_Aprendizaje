import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Prueba } from '../prueba.entity';
import { MbtiPregunta } from './mbti_preguntas.entity';
import { MbtiOpcion } from './mbti_opciones.entity';

@Entity('respuestas_mbti')
export class RespuestaMbti {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Prueba, (prueba) => prueba.respuestasMbti, {
    onDelete: 'CASCADE',
  })
  prueba: Prueba;

  @ManyToOne(() => MbtiPregunta, { onDelete: 'CASCADE' })
  pregunta: MbtiPregunta;

  @ManyToOne(() => MbtiOpcion, { onDelete: 'CASCADE' })
  opcion: MbtiOpcion;
}
