import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DamRecord } from './dam-record.entity';

@Injectable()
export class DamRecordsService {
  constructor(
    @InjectRepository(DamRecord)
    private readonly damRecordRepository: Repository<DamRecord>,
  ) {}

  async findByCityName(cityName: string): Promise<DamRecord[]> {
    return this.damRecordRepository.find({
      where: { reservoir: { city: { name: cityName.toLowerCase() } } },
      relations: ['reservoir', 'reservoir.city'],
      order: { date: 'ASC' },
    });
  }
}
