import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VarkPregunta } from './vark_preguntas.entity';

@Entity('vark_opciones')
export class VarkOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VarkPregunta, (pregunta) => pregunta.opciones, {
    onDelete: 'CASCADE',
  })
  pregunta: VarkPregunta;

  @Column({ type: 'varchar', length: 255 })
  textoOpcion: string;

  @Column({ type: 'varchar', length: 50 })
  estilo: string;
}
