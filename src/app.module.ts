import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirdropModule } from './airdrop/airdrop.module';
import { CollectionModule } from './collection/collection.module';
@Module({
  imports: [AirdropModule, CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
