import { Module } from '@nestjs/common';
import { AirdropService } from './airdrop.service';
import { AirdropController } from './airdrop.controller';
import { CollectionDBModule } from 'src/entities/collectiondb.module';

@Module({
  imports: [CollectionDBModule],
  controllers: [AirdropController],
  providers: [AirdropService],
})
export class AirdropModule {}
