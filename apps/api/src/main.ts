import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { add } from '@learning/sample-lib';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log({ add: add(2, 3) });

  await app.listen(3000);
}
bootstrap();
