import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservoir } from '../reservoirs/reservoir.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'bigint', transformer: { from: (v: string) => Number(v), to: (v: number) => String(v) } })
  population: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, name: 'daily_consumption_per_capita_l' })
  dailyConsumptionPerCapitaL: number;

  @OneToMany(() => Reservoir, (reservoir) => reservoir.city)
  reservoirs: Reservoir[];
}
