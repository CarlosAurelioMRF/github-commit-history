import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  const port = process.env.PORT ?? '3000';

  app
    .listen(parseInt(port.toString(), 10), '0.0.0.0')
    .then(() => Logger.log(`API Listen on ${port}`))
    .catch(Logger.error);

  await app.listen(3000);
}
bootstrap();
