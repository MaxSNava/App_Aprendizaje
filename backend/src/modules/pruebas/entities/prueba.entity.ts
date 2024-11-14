import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
// import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { RespuestaVark } from './vark';
import { RespuestaMbti } from './mbti/respuestas_mbti.entity';

@Entity('pruebas')
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  tipoPrueba: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRealizacion: Date;

  // @ManyToOne(() => Usuario, (usuario) => usuario.pruebas, {
  //   onDelete: 'CASCADE',
  // })
  // usuario: Usuario;

  @OneToMany(() => RespuestaVark, (respuesta) => respuesta.prueba)
  respuestasVark: RespuestaVark[];

  @OneToMany(() => RespuestaMbti, (respuesta) => respuesta.prueba)
  respuestasMbti: RespuestaMbti[];
}
