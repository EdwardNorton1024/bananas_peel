import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Collection, CollectionToken } from './collectiondb.entity';

@Injectable()
export class CollectionDBService {
  constructor(
    @Inject('COLLECTION_REPOSITORY')
    private CollectionRepository: Repository<Collection>,
    @Inject('COLLECTION_TOKEN_REPOSITORY')
    private CollectionTokenRepository: Repository<CollectionToken>,
  ) {}
  async findAll(): Promise<Collection[]> {
    return await this.CollectionRepository.find();
  }

  async findAddressToken(address: string): Promise<CollectionToken[]> {
    return await this.CollectionTokenRepository.find({
      where: { owner: address },
    });
  }
  // async findAll(): Promise<TwitterAccount[]> {
  //   return await this.twitterAccountRepository.find({
  //     where: { enabled: true },
  //   });
  // }

  // async findById(id: number): Promise<TwitterAccount> {
  //   return await this.twitterAccountRepository.findOne({
  //     where: { id, enabled: true },
  //   });
  // }

  // async login(id: number, status: TwitterAccountStatus): Promise<void> {
  //   await this.twitterAccountRepository.update(id, {
  //     status,
  //     lastLogin: new Date(),
  //   });
  // }

  // async ban(id: number): Promise<void> {
  //   await this.twitterAccountRepository.update(id, {
  //     status: TwitterAccountStatus.BANNED,
  //   });
  // }

  // async increaseRequestCount(id: number): Promise<void> {
  //   await this.twitterAccountRepository.increment({ id }, 'requestCount', 1);
  // }

  // async updateAuthorization(id: number, headers, cookies: string) {
  //   await this.twitterAccountRepository.update(id, {
  //     cookies,
  //     headers,
  //     status: TwitterAccountStatus.ACTIVE,
  //   });
  // }
}
