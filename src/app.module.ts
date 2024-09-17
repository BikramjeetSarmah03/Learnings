import { Module } from '@nestjs/common';

import { BooksController } from './app.controller';
import { BookService } from './app.service';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BookService],
})
export class AppModule {}
