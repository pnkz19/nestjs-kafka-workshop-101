import { Injectable } from '@nestjs/common';

@Injectable()
export class KafkaConsumerService {
  processMessage(message: any) {
    console.log(message);
  }
}
