import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MailListController } from './mail-list.controller';
import { MailListService } from './mail-list.service';
import { MailList, MailListSchema } from './schemas/mail-list.schema';
import { SendMailTweetsJob } from './send-mail-tweets.job';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MailList.name,
        schema: MailListSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'nest',
          },
        },
      },
    ]),
  ],
  controllers: [MailListController],
  providers: [
    MailListService,
    SendMailTweetsJob,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class MailListModule {}
