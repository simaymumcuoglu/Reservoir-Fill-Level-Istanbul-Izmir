import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { join } from 'path';
import { DataSource, Repository } from 'typeorm';
import { City } from '../cities/city.entity';
import { Reservoir } from '../reservoirs/reservoir.entity';
import { DamRecord } from './dam-record.entity';

interface CsvRow {
  date: string;
  city: string;
  reservoir_name: string;
  fill_rate_pct: string;
}

@Injectable()
export class SeedService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Reservoir)
    private readonly reservoirRepository: Repository<Reservoir>,
    @InjectRepository(DamRecord)
    private readonly damRecordRepository: Repository<DamRecord>,
  ) {}

  async run(csvPath?: string): Promise<{ cities: number; reservoirs: number; damRecords: number }> {
    const citiesCount = await this.cityRepository.count();
    if (citiesCount === 0) {
      await this.runCitiesAndReservoirsSql();
    }

    const cities = await this.cityRepository.find({ order: { name: 'ASC' } });
    const reservoirs = await this.reservoirRepository.find({ relations: ['city'] });
    const cityMap = new Map<string, City>();
    for (const c of cities) {
      cityMap.set(c.name.toLowerCase(), c);
    }
    const reservoirMap = new Map<string, Reservoir>();
    for (const r of reservoirs) {
      const cityName = r.city?.name?.toLowerCase() ?? '';
      reservoirMap.set(`${cityName}:${r.name.toUpperCase()}`, r);
    }

    const path = csvPath || join(process.cwd(), 'data', 'transformed_dam_data.csv');
    const csvContent = readFileSync(path, 'utf-8');
    const rows: CsvRow[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    await this.damRecordRepository.createQueryBuilder().delete().from(DamRecord).execute();

    let damRecordsCount = 0;
    for (const row of rows) {
      const cityNorm = row.city.toLowerCase().trim();
      const resNameNorm = row.reservoir_name.trim().toUpperCase();
      const key = `${cityNorm}:${resNameNorm}`;
      const reservoir = reservoirMap.get(key);
      if (!reservoir) continue;

      let fillRatePct: number | null = null;
      if (row.fill_rate_pct !== undefined && row.fill_rate_pct !== '') {
        const parsed = parseFloat(row.fill_rate_pct.trim());
        if (!Number.isNaN(parsed)) fillRatePct = parsed;
      }

      const record = this.damRecordRepository.create({
        reservoirId: reservoir.id,
        date: row.date,
        fillRatePct: fillRatePct,
      });
      await this.damRecordRepository.save(record);
      damRecordsCount++;
    }

    return {
      cities: cityMap.size,
      reservoirs: reservoirMap.size,
      damRecords: damRecordsCount,
    };
  }

  private async runCitiesAndReservoirsSql(): Promise<void> {
    const sqlPath = join(process.cwd(), 'data', 'seed_cities_reservoirs.sql');
    const sql = readFileSync(sqlPath, 'utf-8');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.toUpperCase().includes('INSERT'));
    for (const statement of statements) {
      await this.dataSource.query(statement + ';');
    }
  }
}
