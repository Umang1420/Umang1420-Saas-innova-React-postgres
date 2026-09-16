import { PartialType } from '@nestjs/mapped-types';
import { CreateNameDto } from './create-name.dto.js';

export class UpdateNameDto extends PartialType(CreateNameDto) {}
