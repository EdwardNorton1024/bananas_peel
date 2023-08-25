import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dbConfig = configService.get('database');

      const dataSource = new DataSource({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        logging: true,
        entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
      });
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
