import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservoir } from './reservoir.entity';

@Injectable()
export class ReservoirsService {
  constructor(
    @InjectRepository(Reservoir)
    private readonly reservoirRepository: Repository<Reservoir>,
  ) {}

  async findByCityName(cityName: string): Promise<Reservoir[]> {
    return this.reservoirRepository.find({
      where: { city: { name: cityName.toLowerCase() } },
      relations: ['city'],
      order: { name: 'ASC' },
    });
  }
}
