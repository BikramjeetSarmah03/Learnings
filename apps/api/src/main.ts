import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { add } from '@learning/sample-lib';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log({ add: add(2, 3) });

  const config = new DocumentBuilder()
    .setTitle('Nextjs Nestjs')
    .setDescription(
      `<b>
      Looking for the graphql api ?
      </b>
    Go to <a href="/graphql" target="_blank">/graphql</a>
    `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('/', app as any, document);

  await app.listen(3000);
}
bootstrap();
