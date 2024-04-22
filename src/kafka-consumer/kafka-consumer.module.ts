import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaConsumerController } from './kafka-consumer.controller';

@Module({
  providers: [KafkaConsumerService],
  controllers: [KafkaConsumerController],
})
export class KafkaConsumerModule {}
