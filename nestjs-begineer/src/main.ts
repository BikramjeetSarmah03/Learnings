import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Index')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  app.use(
    '/api/docs',
    apiReference({
      spec: {
        content: documentFactory,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
