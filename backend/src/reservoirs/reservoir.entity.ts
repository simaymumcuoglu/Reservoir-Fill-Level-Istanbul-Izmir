import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from '../cities/city.entity';
import { DamRecord } from '../dam-records/dam-record.entity';

@Entity('reservoirs')
export class Reservoir {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'city_id' })
  cityId: number;

  @ManyToOne(() => City, (city) => city.reservoirs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, name: 'capacity_m3' })
  capacityM3: number;

  @OneToMany(() => DamRecord, (record) => record.reservoir)
  damRecords: DamRecord[];
}
