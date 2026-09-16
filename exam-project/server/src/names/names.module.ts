import { Module } from '@nestjs/common';
import { NamesService } from './names.service.js';
import { NamesController } from './names.controller.js';

@Module({
  controllers: [NamesController],
  providers: [NamesService],
})
export class NamesModule {}
