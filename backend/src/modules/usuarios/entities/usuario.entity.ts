import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Grupo } from 'src/modules/grupos/entities/grupo.entity';

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

  @ManyToMany(() => Grupo, (grupo) => grupo.usuarios)
  @JoinTable({
    name: 'usuario_grupos',
  })
  grupos: Grupo[];

  //@OneToMany(() => Prueba, (prueba) => prueba.usuario)
  //pruebas: Prueba[];

  // --
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

  // --
  @BeforeUpdate()
  checkNamEmailUpdate() {
    this.checkNamEmailInsert();
  }
}
