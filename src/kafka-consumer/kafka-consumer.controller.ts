import 'dotenv/config';
import { Controller, Injectable } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka-consumer.service';

@Injectable()
@Controller('kafka-consumer')
export class KafkaConsumerController {
  @Client({
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
  })
  protected client: ClientKafka;

  constructor(protected readonly consumerService: KafkaConsumerService) {}

  @MessagePattern(process.env.KAFKA_TOPIC)
  consumeMessage(@Payload() message: any) {
    this.consumerService.processMessage(message);
  }
}
