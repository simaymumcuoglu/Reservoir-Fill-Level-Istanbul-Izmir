import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { DamRecordsModule } from './dam-records/dam-records.module';
import { ReservoirsModule } from './reservoirs/reservoirs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5431', 10),
            username: process.env.DB_USER || 'iz_ist_dam',
            password: process.env.DB_PASSWORD || 'izmiristanbul@15032!!',
            database: process.env.DB_NAME || 'dam_datas',
            autoLoadEntities: true,
            synchronize: true,
          },
    ),
    CitiesModule,
    ReservoirsModule,
    DamRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
