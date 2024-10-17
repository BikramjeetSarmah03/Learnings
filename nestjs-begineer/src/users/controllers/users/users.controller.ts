import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from 'src/users/dto/createuser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // query params
  @Get('/')
  queryParam(@Query('user') userId: string) {
    return this.userService.fetchUsers();
  }

  // get
  @Get()
  getUsers() {
    return { msg: 'users' };
  }

  // params
  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    return { msg: `ID: ${userId}` };
  }

  // nested params
  @Get('/:id/:postId')
  getUserByIdPost(
    @Param('id', ParseIntPipe) userId: number,
    @Param('postId') postId: string,
  ) {
    return {
      msg: `ID: ${userId}   POSTID: ${postId}`,
    };
  }

  // normal express way
  @Post()
  createUser(@Req() request: Request) {
    return { msg: 'Post', body: request.body };
  }

  //   proper way with dto
  @Post('/proper')
  @UsePipes(new ValidationPipe())
  createUserProper(@Body() userData: CreateUserDto) {
    return { msg: 'Post', body: userData };
  }
}
