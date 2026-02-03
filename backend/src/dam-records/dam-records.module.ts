import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisService } from '../analysis/analysis.service';
import { City } from '../cities/city.entity';
import { Reservoir } from '../reservoirs/reservoir.entity';
import { DamRecord } from './dam-record.entity';
import { DamRecordsController } from './dam-records.controller';
import { DamRecordsService } from './dam-records.service';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DamRecord, City, Reservoir]),
  ],
  controllers: [DamRecordsController, SeedController],
  providers: [DamRecordsService, SeedService, AnalysisService],
  exports: [DamRecordsService, SeedService],
})
export class DamRecordsModule {}
