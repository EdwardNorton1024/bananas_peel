import { Module } from '@nestjs/common';
import { collectionService } from './collection.service';
import { collectionController } from './collection.controller';
import { CollectionDBModule } from 'src/entities/collectiondb.module';
@Module({
  imports: [CollectionDBModule],
  controllers: [collectionController],
  providers: [collectionService],
})
export class CollectionModule {}
