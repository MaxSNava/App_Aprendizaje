import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Entity('grupos')
export class Grupo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  nombre: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  // -- Relationships --
  @ManyToMany(() => Usuario, (usuario) => usuario.grupos)
  usuarios: Usuario[];

  // -- BeforeInsert and BeforeUpdate --
  @BeforeInsert()
  checkNameInsert() {
    this.nombre = this.nombre
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkNameUpdate() {
    this.checkNameInsert();
  }
}
