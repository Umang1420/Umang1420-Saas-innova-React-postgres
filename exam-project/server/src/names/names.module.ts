import { Module } from '@nestjs/common';
import { NamesService } from './names.service.js';
import { NamesController } from './names.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from './entities/name.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Name])],
  controllers: [NamesController],
  providers: [NamesService],
})
export class NamesModule {}
