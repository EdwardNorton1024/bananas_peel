import { DataSource } from 'typeorm';
import { Collection, CollectionToken } from './collectiondb.entity';

export const collectionDBProviders = [
  {
    provide: 'COLLECTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Collection),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COLLECTION_TOKEN_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CollectionToken),
    inject: ['DATA_SOURCE'],
  },
];
