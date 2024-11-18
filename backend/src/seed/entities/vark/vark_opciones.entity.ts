import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VarkPregunta } from './vark_preguntas.entity';

@Entity('vark_opciones')
export class VarkOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  textoOpcion: string;

  @Column({ type: 'varchar', length: 1 }) // V, A, R, K
  estilo: string;

  @ManyToOne(() => VarkPregunta, (pregunta) => pregunta.opciones, {
    onDelete: 'CASCADE',
  })
  pregunta: VarkPregunta;
}
