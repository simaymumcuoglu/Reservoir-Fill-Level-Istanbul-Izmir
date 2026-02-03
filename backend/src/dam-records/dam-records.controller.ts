import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalysisService } from '../analysis/analysis.service';
import { DamRecordsService } from './dam-records.service';

@ApiTags('cities')
@Controller('cities')
export class DamRecordsController {
  constructor(
    private readonly damRecordsService: DamRecordsService,
    private readonly analysisService: AnalysisService,
  ) {}

  @Get(':name/dashboard')
  @ApiOperation({ summary: 'Get city dashboard: analysis stats + historical dam records' })
  @ApiParam({ name: 'name', description: 'City name (e.g. istanbul, izmir)' })
  @ApiResponse({ status: 200, description: 'Stats (from Python analysis) and tableData (dam records)' })
  @ApiResponse({ status: 500, description: 'Analysis or DB error' })
  async getCityDashboard(@Param('name') name: string) {
    const cityKey = name.toLowerCase();
    const [analysis, tableData] = await Promise.all([
      this.analysisService.getAnalysis(),
      this.damRecordsService.findByCityName(name),
    ]);
    const stats = analysis[cityKey] ?? null;
    return { stats, tableData };
  }

  @Get(':name/dam-records')
  @ApiOperation({ summary: 'Get dam records for a city' })
  @ApiParam({ name: 'name', description: 'City name' })
  @ApiResponse({ status: 200, description: 'List of dam records with reservoir relation' })
  findByCityName(@Param('name') name: string) {
    return this.damRecordsService.findByCityName(name);
  }
}
