import { Controller, Get, Param } from '@nestjs/common';
import { ReservoirsService } from './reservoirs.service';

@Controller('cities')
export class ReservoirsController {
  constructor(private readonly reservoirsService: ReservoirsService) {}

  @Get(':name/reservoirs')
  findByCityName(@Param('name') name: string) {
    return this.reservoirsService.findByCityName(name);
  }
}
