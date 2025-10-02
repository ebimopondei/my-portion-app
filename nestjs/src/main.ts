
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SequelizeExceptionFilter } from 'error-handling/sequelize-error-handling';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors( { 
    origin: ["http://localhost:3000", "https://my-portion-app-frontend.vercel.app", "https://my-portion-app.vercel.app", "portion.ng", "https://portion.ng", "https://www.portion.ng"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  })
  app.useGlobalFilters(new SequelizeExceptionFilter(new LoggerService()));
  await app.listen(process.env.PORT || 3001);
}
bootstrap();