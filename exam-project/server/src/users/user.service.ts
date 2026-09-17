import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/user.entity.js'; 
import { Name } from '../names/entities/name.entity.js'; 
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Name)
    private readonly productRepository: Repository<Name>,
  ) {}

  async findOne(username: string): Promise<Users | null> {
    return this.userRepository.findOne({ 
      where: { username: username }
    });
  }
  
  async findAll() {
    return await this.userRepository.find();
  }

  async createUserWithProducts(userData: Partial<Users>, productIds: number[]): Promise<Users> {
    const foundProducts = [];
    for (const id of productIds) {
      const prod = await this.productRepository.findOneBy({ id });
      if (prod) {
        foundProducts.push(prod);
      }
    }

    if (!userData.passwordHash) {
      throw new Error('Password is required');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userData.passwordHash, saltOrRounds);

    const newUser = new Users();
    newUser.username = userData.username ?? "";
    newUser.passwordHash = hash;
    newUser.names = foundProducts;

    return await this.userRepository.save(newUser);
  }


async findById(id: number): Promise<Users | null> {
  return await this.userRepository.findOne({ where: { id } });
}


async updateUser(user: Users): Promise<Users> {
  return await this.userRepository.save(user);
}
  
  async findUserProducts(userId: number): Promise<Name[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId }, 
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.names; 
  }
}
