import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { CheckNewTweetsTask } from './check-new-tweets/check-new-tweets.task';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Tweet.name,
        schema: TweetSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, CheckNewTweetsTask],
})
export class TweetsModule {}
