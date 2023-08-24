import { Controller, Get, Param } from '@nestjs/common';
import { collectionService } from './collection.service';

@Controller('collection')
export class collectionController {
  constructor(private readonly collectionService: collectionService) {}

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }
}
