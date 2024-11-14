import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('resultados_vark')
export class ResultadoVark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  visual: number;

  @Column({ type: 'int', default: 0 })
  auditivo: number;

  @Column({ type: 'int', default: 0 })
  lecturaEscritura: number;

  @Column({ type: 'int', default: 0 })
  kinestesico: number;

  @Column({ type: 'varchar', length: 50 })
  tipoResultado: string;
}
