import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('contacto')
export class Contacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  mensaje: string;

  @CreateDateColumn()
  fecha: Date;
}
