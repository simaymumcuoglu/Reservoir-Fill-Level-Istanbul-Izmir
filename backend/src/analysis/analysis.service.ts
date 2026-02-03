import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';

const execAsync = promisify(exec);

export interface CityAnalysisStats {
  remainingDays: number;
  dailyDecreaseM3: number;
  dailyNeedM3: number;
  status: string;
}

export type AnalysisResult = Record<string, CityAnalysisStats>;

@Injectable()
export class AnalysisService {
  async getAnalysis(): Promise<AnalysisResult> {
    const scriptPath = join(process.cwd(), 'scripts', 'analiz.py');
    const command = `python3 "${scriptPath}"`;

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024,
      });

      if (stderr && stderr.trim()) {
        console.warn('Python script stderr:', stderr);
      }

      const lastLine = stdout.trim().split('\n').pop();
      if (!lastLine) {
        throw new InternalServerErrorException(
          'Analysis script produced no JSON output',
        );
      }

      return JSON.parse(lastLine) as AnalysisResult;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown error running analysis';
      throw new InternalServerErrorException(
        `Analysis failed: ${message}`,
      );
    }
  }
}
