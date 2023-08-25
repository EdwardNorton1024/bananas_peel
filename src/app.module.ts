import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirdropModule } from './airdrop/airdrop.module';
import { CollectionModule } from './collection/collection.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CollectionDBModule } from './entities/collectiondb.module';
import { MessageSenderService } from './message/message.service';

@Module({
  imports: [
    AirdropModule, 
    CollectionDBModule, 
    CollectionModule, 
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.prod'],
      load: [ configuration ],
      isGlobal: true,
    }), 
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService, MessageSenderService],
})
export class AppModule {}
