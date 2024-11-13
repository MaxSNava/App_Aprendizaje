import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Prueba } from 'src/modules/pruebas/entities/prueba.entity';

@Entity('resultados_vark')
export class ResultadoVark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Prueba, { onDelete: 'CASCADE' })
  prueba: Prueba;

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
