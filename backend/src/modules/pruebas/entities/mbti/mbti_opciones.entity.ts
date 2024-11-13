import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MbtiPregunta } from './mbti_preguntas.entity';

@Entity('mbti_opciones')
export class MbtiOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MbtiPregunta, (pregunta) => pregunta.opciones, {
    onDelete: 'CASCADE',
  })
  pregunta: MbtiPregunta;

  @Column({ type: 'varchar', length: 255 })
  textoOpcion: string;

  @Column({ type: 'int' })
  puntaje: number;

  @Column({ type: 'varchar', length: 50 })
  categoria: string; // Ejemplo: "E", "I", "S", "N", "T", "F", "J", "P"
}
