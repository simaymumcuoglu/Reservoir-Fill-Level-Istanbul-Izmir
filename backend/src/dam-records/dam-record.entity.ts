import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservoir } from '../reservoirs/reservoir.entity';

@Entity('dam_records')
export class DamRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'reservoir_id' })
  reservoirId: number;

  @ManyToOne(() => Reservoir, (reservoir) => reservoir.damRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reservoir_id' })
  reservoir: Reservoir;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'fill_rate_pct',
    nullable: true,
  })
  fillRatePct: number | null;
}
