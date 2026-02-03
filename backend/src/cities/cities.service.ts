import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { DamRecord } from '../dam-records/dam-record.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(DamRecord)
    private readonly damRecordRepository: Repository<DamRecord>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.cityRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findByName(name: string): Promise<City & { averageFillRatePct: number | null }> {
    const city = await this.cityRepository.findOne({
      where: { name: name.toLowerCase() },
      relations: ['reservoirs'],
    });
    if (!city) {
      throw new NotFoundException(`City "${name}" not found`);
    }
    const avgResult = await this.damRecordRepository
      .createQueryBuilder('dr')
      .innerJoin('dr.reservoir', 'r')
      .innerJoin('r.city', 'c')
      .select('AVG(dr.fill_rate_pct)', 'avg')
      .where('c.name = :name', { name: name.toLowerCase() })
      .andWhere('dr.fill_rate_pct IS NOT NULL')
      .getRawOne<{ avg: string }>();
    const averageFillRatePct = avgResult?.avg != null ? parseFloat(avgResult.avg) : null;
    return { ...city, averageFillRatePct };
  }
}
