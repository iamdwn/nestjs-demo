import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ms from 'ms';
import passport from "passport"
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import { VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //config view engine
  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('ejs');

  //config cookies
  app.use(cookieParser());

  //config session
  app.use(session({
    secret: configService.get<string>('EXPRESS_SESSION_SECRET'),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: ms(configService.get<string>('EXPRESS_SESSION_COOKIE')) },
    store: MongoStore.create({
      mongoUrl: configService.get<string>('MONGODB_URI'),
    })
  }));

  //config passport
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(cookieParser());

  app.enableCors(
    {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false
    }
  );

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v1',
    defaultVersion: ['1', '2']
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();