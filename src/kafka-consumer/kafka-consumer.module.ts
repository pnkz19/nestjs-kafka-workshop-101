import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerController } from './kafka-consumer.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-kafka-client',
            brokers: [process.env.KAFKA_SERVER ?? 'localhost:9092'],
          },
          consumer: {
            groupId: 'my-kafka-consumer',
          },
        },
      },
    ]),
  ],
  providers: [KafkaConsumerService],
  controllers: [KafkaConsumerController],
})
export class KafkaConsumerModule {}
