import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Role } from '../enums/role.enum.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';

const ROLES_KEY = 'roles';
const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async create(@Body() createProductDto: CreateProductDto, @Request() req: any) {
    return await this.productsService.create({
      ...createProductDto,
      createdBy: req.user.sub,
    });
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async findAll(@Request() req: any) {
    return await this.productsService.findAllByUser(req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async findOne(@Param('id') id: string, @Request() req: any) {
    const product = await this.productsService.findOne(+id);
    if (product.createdBy !== req.user.sub) {
      throw new ForbiddenException('This product was not created by the logged-in user');
    }
    return product;
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req: any) {
    const product = await this.productsService.findOne(+id);
    if (product.createdBy !== req.user.sub) {
      throw new ForbiddenException('You can only update your own products');
    }
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  async remove(@Param('id') id: string, @Request() req: any) {
    const product = await this.productsService.findOne(+id);
    if (product.createdBy !== req.user.sub) {
      throw new ForbiddenException('You can only delete your own products');
    }
    return await this.productsService.remove(+id);
  }
}
