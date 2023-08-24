import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { collectionDBProviders } from './collectiondb.providers';
import { CollectionDBService } from './collectiondb.service';
@Module({
  imports: [DatabaseModule],
  providers: [...collectionDBProviders, CollectionDBService],
  exports: [...collectionDBProviders, CollectionDBService],
})
export class CollectionDBModule {}
