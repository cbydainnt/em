import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { MainModule } from './main.module';
import express from 'express';

import fs from 'fs';
import path from 'path';
async function bootstrap() {
  // const isDev = process.env.NODE_ENV === 'development';
  let app: any;

  const rootPath = path.resolve(__dirname, '..', '..');
  const certPath = path.join(rootPath, 'backend', 'cert');
  const httpsOptions = {
    key: fs.readFileSync(path.join(certPath, 'key.pem')),
    cert: fs.readFileSync(path.join(certPath, 'cert.pem')),
  };
  app = await NestFactory.create<NestExpressApplication>(MainModule, { httpsOptions });

  // const app = await NestFactory.create(MainModule, { cors: false });
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const server = app.getHttpServer();

  // The timeout value for sockets
  server.setTimeout(2 * 60 * 1000);
  // The number of milliseconds of inactivity a server needs to wait for additional incoming data
  server.keepAliveTimeout = 3000000;
  // Limit the amount of time the parser will wait to receive the complete HTTP headers
  server.headersTimeout = 3100000;

  server.requestTimeout = 3000000;
  server.timeout = 3000001;

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '5000mb' }));
  app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
  app.setGlobalPrefix('/api');


  const expressApp = app.getHttpAdapter().getInstance();
  const frontendDist = path.join(rootPath, 'frontend', 'dist');

  expressApp.use(express.static(frontendDist));
  expressApp.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/graphql')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
  await app.listen(process.env.VITE_PORT ?? 3000);
  console.log('FRONTEND_URL,ADMIN_URL', process.env.FRONTEND_URL, process.env.ADMIN_URL);
  console.log(`🚀 HTTPS Server running on ${process.env.VITE_PORT ?? 3000}`);
}
bootstrap();
