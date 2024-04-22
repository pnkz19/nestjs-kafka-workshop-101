import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_SERVER ?? 'localhost:9092'],
          ssl: process.env.KAFKA_SSL === 'true',
          sasl: {
            mechanism: 'plain',
            username: process.env.KAFKA_API_KEY,
            password: process.env.KAFKA_API_SECRET,
          },
        },
      },
    },
  );

  await app.listen();
}

void bootstrap();
