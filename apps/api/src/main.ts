/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { environment } from '@environment';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new WsAdapter(app));

  app.setGlobalPrefix(environment.globalPrefix);
  app.enableCors();

  const port = environment.httPort;

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + environment.globalPrefix);
  });
}

bootstrap();
