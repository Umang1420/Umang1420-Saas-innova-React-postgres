import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto.js';
import { UpdateNameDto } from './dto/update-name.dto.js';

export interface Name {
  id: number;
  name: string;
  email: string;
  course: string;
}

@Injectable()
export class NamesService {
  private readonly names: Name[] = [];

  create(createNameDto: CreateNameDto): Name {
    this.validateRequiredFields(createNameDto);

    const name: Name = {
      id: this.names.length === 0 ? 1 : Math.max(...this.names.map((item) => item.id)) + 1,
      name: createNameDto.name,
      email: createNameDto.email,
      course: createNameDto.course,
    };

    this.names.push(name);
    return name;
  }

  findAll(): Name[] {
    return this.names;
  }

  findOne(id: number): Name {
    const name = this.names.find((item) => item.id === id);
    if (!name) {
      throw new NotFoundException(`Name with id ${id} not found`);
    }

    return name;
  }

  update(id: number, updateNameDto: UpdateNameDto): Name {
    this.validateRequiredFields(updateNameDto);

    const name = this.findOne(id);
    Object.assign(name, updateNameDto);
    return name;
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

  remove(id: number): Name {
    const nameIndex = this.names.findIndex((item) => item.id === id);
    if (nameIndex === -1) {
      throw new NotFoundException(`Name with id ${id} not found`);
    }
    

    const removedName = this.names.splice(nameIndex, 1)[0]!;
    return removedName;
  }
}
