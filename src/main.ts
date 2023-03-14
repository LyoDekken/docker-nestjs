import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './shared/infra/http/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      // Configuration required to grab https protocol.
      trustProxy: 1,
    }),
  );

  //Enable CORS on the application using the enableCors method, passing in an object with various options.
  app.enableCors({
    credentials: true,
    allowedHeaders: '*',
    origin: '*',
  });

  //Set the view engine of the application to Handlebars using the setViewEngine method.
  app.setViewEngine({
    engine: {
      handlebars: require('hbs'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  //Add a global validation pipe to the application using the useGlobalPipes method, passing in a ValidationPipe object with various options.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Project Docker CRUD with nestjs')
    .setDescription(
      'Application to manage the registration of users',
    )
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('access')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333, '0.0.0.0');

  const baseUrl = 'http://localhost:3333';
  console.log(`🚀 Server is running on!  ${baseUrl}/docs`);
}

bootstrap();
