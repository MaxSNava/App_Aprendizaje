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

  // -- Relationships --
  @ManyToOne(() => Usuario, (usuario) => usuario.pruebas, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  usuario: Usuario;

  @OneToOne(() => ResultadoVark, { nullable: true, cascade: true })
  @JoinColumn()
  resultadoVark: ResultadoVark;

  @OneToOne(() => ResultadoMbti, { nullable: true, cascade: true })
  @JoinColumn()
  resultadoMbti: ResultadoMbti;
}
