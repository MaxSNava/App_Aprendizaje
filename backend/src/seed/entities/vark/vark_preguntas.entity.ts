import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VarkOpcion } from './vark_opciones.entity';

@Entity('vark_preguntas')
export class VarkPregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  textoPregunta: string;

  @OneToMany(() => VarkOpcion, (opcion) => opcion.pregunta, { cascade: true })
  opciones: VarkOpcion[];
}
