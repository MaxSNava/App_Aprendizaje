import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MbtiOpcion } from './mbti_opciones.entity';

@Entity('mbti_preguntas')
export class MbtiPregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  textoPregunta: string;

  @Column({ type: 'varchar', length: 4 })
  dimension: string; // Ejemplo: 'E/I', 'S/N', 'T/F', 'J/P'

  @OneToMany(() => MbtiOpcion, (opcion) => opcion.pregunta, { cascade: true })
  opciones: MbtiOpcion[];
}
