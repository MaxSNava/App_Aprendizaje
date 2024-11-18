import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MbtiPregunta } from './mbti_preguntas.entity';

@Entity('mbti_opciones')
export class MbtiOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  textoOpcion: string;

  @Column({ type: 'int' })
  puntaje: number; // Puntaje asignado a la respuesta

  @Column({ type: 'varchar', length: 1 }) // Ejemplo: 'E', 'I', 'S', 'N'
  categoria: string;

  @ManyToOne(() => MbtiPregunta, (pregunta) => pregunta.opciones, {
    onDelete: 'CASCADE',
  })
  pregunta: MbtiPregunta;
}
