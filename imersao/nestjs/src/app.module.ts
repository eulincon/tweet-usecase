import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailListModule } from './mail-list/mail-list.module';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_DSN, {
      useNewUrlParser: true,
    }),
    ScheduleModule.forRoot(),
    TweetsModule,
    MailListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
