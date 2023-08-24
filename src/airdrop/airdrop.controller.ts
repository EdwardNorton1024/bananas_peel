import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AirdropService } from './airdrop.service';
import { CreateAirdropDto } from './dto/create-airdrop.dto';
import { UpdateAirdropDto } from './dto/update-airdrop.dto';

@Controller('airdrop')
export class AirdropController {
  constructor(private readonly airdropService: AirdropService) {}

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.airdropService.findOne(address);
  }
}
