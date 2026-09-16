import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto.js';
import { UpdateNameDto } from './dto/update-name.dto.js';

export interface Name {
  id: number;
  name: string;
}

@Injectable()
export class NamesService {
  private readonly names: Name[] = [];

  create(createNameDto: CreateNameDto): Name {
    const name: Name = {
      id: this.names.length === 0 ? 1 : Math.max(...this.names.map((item) => item.id)) + 1,
      name: createNameDto.name,
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
    const name = this.findOne(id);
    Object.assign(name, updateNameDto);
    return name;
  }

  remove(id: number): Name {
    const nameIndex = this.names.findIndex((item) => item.id === id);
    if (nameIndex === -1) {
      throw new NotFoundException(`Name with id ${id} not found`);
    }

    const [removedName] = this.names.splice(nameIndex, 1);
    return removedName;
  }
}
