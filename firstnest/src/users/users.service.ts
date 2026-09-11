import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.js'; 
import { Products } from '../products/entities/product.entity.js'; 
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async findOne(username: string): Promise<Users | null> {
    return this.userRepository.findOne({ 
      where: { userEmail: username },
      relations: { product: true } 
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

    if (!userData.password) {
      throw new Error('Password is required');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userData.password, saltOrRounds);

    const newUser = new Users();
    newUser.userEmail = userData.userEmail ?? "";
    newUser.password = hash;
    newUser.refreshToken = userData.refreshToken ?? "";
    newUser.product = foundProducts;

    return await this.userRepository.save(newUser);
  }


async findById(id: number): Promise<Users | null> {
  return await this.userRepository.findOne({ where: { id } });
}


async updateUser(user: Users): Promise<Users> {
  return await this.userRepository.save(user);
}
  
  async findUserProducts(userId: number): Promise<Products[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { product: true }, 
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.product; 
  }
}
