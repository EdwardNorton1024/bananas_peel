import { Test, TestingModule } from '@nestjs/testing';
import { collectionController } from './collection.controller';
import { collectionService } from './collection.service';

describe('CollectionController', () => {
  let controller: collectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [collectionController],
      providers: [collectionService],
    }).compile();

    controller = module.get<collectionController>(collectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
