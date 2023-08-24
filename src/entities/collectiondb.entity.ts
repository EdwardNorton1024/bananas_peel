import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('collection')
export class Collection {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'collection_symbol' })
  collectionSymbol: string;

  @Column({ name: 'collection_name' })
  collectionName: string;

  @Column({ name: 'collection_desc' })
  collectionDesc: string;

  @Column({ name: 'total_supply', type: 'bigint' })
  totalSupply: number;

  @Column({ name: 'range_start', type: 'bigint' })
  rangeStart: number;

  @Column({ name: 'range_end', type: 'bigint' })
  rangeEnd: number;

  @Column({ name: 'cover_img', type: 'text' })
  coverImg: string;

  @Column({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;
}

@Entity('collection_token')
export class CollectionToken {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'collection_id', type: 'bigint' })
  collectionId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'inscription_id' })
  inscriptionId: string;

  @Column({ name: 'me_inscription_number', type: 'bigint' })
  meInscriptionNumber: number;

  @Column({ name: 'genesis_transaction_hash' })
  genesisTransactionHash: string;

  @Column({ name: 'genesis_block_hash' })
  genesisBlockHash: string;

  @Column({ name: 'genesis_block_time', type: 'timestamp without time zone' })
  genesisBlockTime: Date;

  @Column({ name: 'genesis_block_height', type: 'bigint' })
  genesisBlockHeight: number;

  @Column({ name: 'owner' })
  owner: string;

  @Column({ name: 'sat', type: 'bigint' })
  sat: number;

  @Column({ name: 'sat_rarity' })
  satRarity: string;

  @Column({ name: 'sat_block_height', type: 'bigint' })
  satBlockHeight: number;

  @Column({ name: 'sat_block_time', type: 'timestamp without time zone' })
  satBlockTime: Date;

  @Column({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;
}
