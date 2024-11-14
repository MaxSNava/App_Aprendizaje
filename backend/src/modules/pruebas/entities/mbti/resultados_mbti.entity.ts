import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('resultados_mbti')
export class ResultadoMbti {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  extrovertido: number;

  @Column({ type: 'int', default: 0 })
  introvertido: number;

  @Column({ type: 'int', default: 0 })
  sensorial: number;

  @Column({ type: 'int', default: 0 })
  intuitivo: number;

  @Column({ type: 'int', default: 0 })
  racional: number;

  @Column({ type: 'int', default: 0 })
  emocional: number;

  @Column({ type: 'int', default: 0 })
  calificador: number;

  @Column({ type: 'int', default: 0 })
  perceptivo: number;

  @Column({ type: 'varchar', length: 4 })
  tipoPersonalidad: string; // Ejemplo: "INTJ", "ENFP", etc.
}
