
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SequelizeExceptionFilter } from 'error-handling/sequelize-error-handling';
import { LoggerService } from './logger/logger.service';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors( { 
    origin: ['http://localhost:5173', 'https://my-portion-app-frontend.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  })
  app.useGlobalFilters(new SequelizeExceptionFilter(new LoggerService(), app.get(HttpAdapterHost)));
  await app.listen(process.env.PORT || 3001);
}
bootstrap();