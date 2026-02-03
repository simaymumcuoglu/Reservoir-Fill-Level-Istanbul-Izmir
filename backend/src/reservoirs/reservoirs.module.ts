import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservoir } from './reservoir.entity';
import { ReservoirsController } from './reservoirs.controller';
import { ReservoirsService } from './reservoirs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservoir])],
  controllers: [ReservoirsController],
  providers: [ReservoirsService],
  exports: [ReservoirsService],
})
export class ReservoirsModule {}
