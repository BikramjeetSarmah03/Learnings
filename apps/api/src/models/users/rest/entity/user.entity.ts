import { User } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class UserEntity implements RestrictProperties<UserEntity, User> {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  name: string;
  @IsOptional()
  image: string;

  createdAt: Date;
  updatedAt: Date;
}
