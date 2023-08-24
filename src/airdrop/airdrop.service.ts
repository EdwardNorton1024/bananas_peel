import { Injectable, Inject } from '@nestjs/common';
import { CollectionDBService } from 'src/entities/collectiondb.service';
@Injectable()
export class AirdropService {
  @Inject()
  private readonly collectionDBService: CollectionDBService;

  async findOne(address: string) {
    const inscriptions = await this.collectionDBService.findAddressToken(
      address,
    );

    let level = 0;
    const airdrop: [number, number, number, number] = [0, 0, 0, 0];
    const normalInscriptions = [];
    const blueChipInscriptions = [];

    inscriptions.forEach((inscription) => {
      if (!!(inscription as any).isBlueChip)
        blueChipInscriptions.push(inscription);
      else normalInscriptions.push(inscription);
    });

    if (inscriptions.length !== 0) {
      const scoreA = normalInscriptions.length;
      const scoreB = blueChipInscriptions.length;
      const greenLevelBaseScore = [1, 2, 5, 10];
      const yellowLevelBaseScore = [0, 0, 0, 0];
      const redLevelBaseScore = [0, 1, 2, 5];
      const purpleLevelBaseScore = [0, 0, 1, 5];

      level++;
      if (blueChipInscriptions.length > 0) level++;
      if (blueChipInscriptions.length > 2) level++;

      airdrop[0] = scoreA + greenLevelBaseScore[level];
      airdrop[1] = yellowLevelBaseScore[level];
      airdrop[2] = scoreB + redLevelBaseScore[level];
      airdrop[3] = purpleLevelBaseScore[level];
    }

    return {
      address,
      level,
      normalInscriptions,
      blueChipInscriptions,
      count: inscriptions.length,
      airdrop,
    };
  }
}
