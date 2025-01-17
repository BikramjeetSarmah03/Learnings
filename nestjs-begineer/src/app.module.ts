import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
