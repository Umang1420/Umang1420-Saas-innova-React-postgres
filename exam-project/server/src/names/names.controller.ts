import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NamesService } from './names.service.js';
import { CreateNameDto } from './dto/create-name.dto.js';
import { UpdateNameDto } from './dto/update-name.dto.js';

@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNameDto: CreateNameDto) {
    return this.namesService.create(createNameDto);
  }

  @Get()
  findAll() {
    return this.namesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.namesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNameDto: UpdateNameDto,
  ) {
    return this.namesService.update(id, updateNameDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.namesService.remove(id);
  }
}
