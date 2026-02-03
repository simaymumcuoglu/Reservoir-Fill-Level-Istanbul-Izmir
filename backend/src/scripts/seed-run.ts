import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from '../dam-records/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seed = app.get(SeedService);
  const result = await seed.run();
  console.log('Seed completed:', result);
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
