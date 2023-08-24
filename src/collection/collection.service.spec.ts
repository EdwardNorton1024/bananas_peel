import { Test, TestingModule } from '@nestjs/testing';
import { collectionService } from './collection.service';

describe('CollectionService', () => {
  let service: collectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [collectionService],
    }).compile();

    service = module.get<collectionService>(collectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
