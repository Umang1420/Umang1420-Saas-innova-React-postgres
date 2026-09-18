import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto.js';
import { UpdateNameDto } from './dto/update-name.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './entities/name.entity.js';
import { Repository } from 'typeorm';


@Injectable()
export class NamesService {
private readonly names: Name[] = [];
 constructor(
    @InjectRepository(Name)
    private nameRepository: Repository<Name>,
  ) {}

  async create(createNameDto: CreateNameDto) {
    this.validateRequiredFields(createNameDto);
    const product = this.nameRepository.create(createNameDto);
    return await this.nameRepository.save(product);
  }

  async findAll(){
    return await this.nameRepository.find();
  }

  async findOne(id: number) {
    const name = await this.nameRepository.findOne({ where : { id } });
    if (!name) {
      throw new NotFoundException(`Name with id ${id} not found`);
    }
    return name;
  }

  async update(id: number, updateNameDto: UpdateNameDto) {
    this.validateRequiredFields(updateNameDto);

    const name = await this.findOne(id);
    Object.assign(name, updateNameDto);
    return  await this.nameRepository.save(name);
  }

  private validateRequiredFields(
    nameDto: Partial<Name>,
  ): asserts nameDto is Pick<Name, 'name' | 'email' | 'course'> {
    for (const field of ['name', 'email', 'course'] as const) {
      const value = nameDto[field];
      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new BadRequestException(`${field} is required`);
      }
    }
  }

  async remove(id: number) {
    const name = await this.findOne(id);
    return await this.nameRepository.remove(name);
  }
}
