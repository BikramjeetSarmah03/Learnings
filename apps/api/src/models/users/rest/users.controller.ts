import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUser } from './dtos/create.dto';
import { UserQueryDto } from './dtos/query.dto';
import { UpdateUser } from './dtos/update.dto';
import { UserEntity } from './entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  create(@Body() createUserDto: CreateUser) {
    return this.prisma.user.create({ data: createUserDto });
  }

  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: UserQueryDto) {
    return this.prisma.user.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUser) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
