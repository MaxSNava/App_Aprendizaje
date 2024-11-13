import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Grupo } from 'src/modules/grupos/entities/grupo.entity';
import { Prueba } from 'src/modules/pruebas/entities/prueba.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'usuario' })
  rol: string;

  @ManyToOne(() => Grupo, (grupo) => grupo.usuarios)
  grupo: Grupo;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @OneToMany(() => Prueba, (prueba) => prueba.usuario)
  pruebas: Prueba[];
}
