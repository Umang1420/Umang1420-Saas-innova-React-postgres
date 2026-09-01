import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto.js';

@Injectable()
export class CatsService {
  private cats: CreateCatDto[] = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
    return createCatDto;
  }

  findAll() {
    return this.cats;
  }
}
