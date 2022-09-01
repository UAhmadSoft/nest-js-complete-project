import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { SocketAdapter } from './socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new SocketAdapter());

  app.use(helmet());
  // app.enableCors();
  app.use(cookieParser());
  const configService = app.get<ConfigService>(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
