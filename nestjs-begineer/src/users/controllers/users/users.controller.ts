import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from 'src/users/dto/createuser.dto';

@Controller('users')
export class UsersController {
  // query params
  @Get('/')
  queryParam(@Query('user') userId: string) {
    console.log(`called: ${userId}`);
    return { msg: `ID: ${userId}` };
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
    @Param('id') userId: string,
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
  createUserProper(@Body() userData: CreateUserDto) {
    return { msg: 'Post', body: userData };
  }
}
