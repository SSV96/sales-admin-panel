import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const logger = new Logger('Bootstrap');

  const PORT = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Sales-Admin Panel')
    .setDescription('API documentation Sales-Admin Panel')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
  const appUrl = await app.getUrl(); // Get the running URL

  logger.log(`🚀 Server is running at: \x1b[32m${appUrl}\x1b[0m`);
  logger.log(`📄 Swagger API Docs: \x1b[34m${appUrl}/api-docs\x1b[0m`);
}

bootstrap();
