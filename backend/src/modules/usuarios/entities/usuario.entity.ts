import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Grupo } from 'src/modules/grupos/entities/grupo.entity';
import { Prueba } from 'src/modules/pruebas/entities/prueba.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  nombre: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date;

  // -- Relationships --
  @ManyToMany(() => Grupo, (grupo) => grupo.usuarios)
  @JoinTable({
    name: 'usuario_grupos',
  })
  grupos: Grupo[];

  @OneToMany(() => Prueba, (prueba) => prueba.usuario, { cascade: true })
  pruebas: Prueba[];

  // -- BeforeInsert and BeforeUpdate --
  @BeforeInsert()
  checkNamEmailInsert() {
    this.nombre = this.nombre
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
    this.email = this.email
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkNamEmailUpdate() {
    this.checkNamEmailInsert();
  }
}
