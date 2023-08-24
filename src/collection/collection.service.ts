import { Injectable, Inject } from '@nestjs/common';
import { CollectionDBService } from '../entities/collectiondb.service';
@Injectable()
export class collectionService {
  constructor(private readonly collectionDBService: CollectionDBService) {}

  async findAll() {
    const res = await this.collectionDBService.findAll();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }
}
