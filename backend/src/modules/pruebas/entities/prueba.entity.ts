import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { ResultadoVark } from 'src/seed/entities/vark';
import { ResultadoMbti } from 'src/seed/entities/mbti';

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

  // Nuevo campo explícito
  @Column({
    type: 'uuid',
    nullable: true,
  })
  usuarioId: string;

  // Relaciones
  @ManyToOne(() => Usuario, (usuario) => usuario.pruebas, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  usuario: Usuario;

  @OneToOne(() => ResultadoVark, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  resultadoVark: ResultadoVark;

  @OneToOne(() => ResultadoMbti, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  resultadoMbti: ResultadoMbti;
}
