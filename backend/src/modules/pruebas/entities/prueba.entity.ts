import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Entity('pruebas')
export class Prueba {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  tipoPrueba: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRealizacion: Date;

  // -- Relationships --
  @ManyToOne(() => Usuario, (usuario) => usuario.pruebas, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  usuario: Usuario;
}
