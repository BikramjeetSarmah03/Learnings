import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Book } from '~/FakeDatabase';

import { BookService } from './app.service';

@Controller('book')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getSingleBooks(@Param('id') id: string): Book | undefined {
    const bookId = +id;
    return this.bookService.getBookById(bookId);
  }

  @Post()
  addBook(@Body() book: Partial<Book>): Book | undefined {
    const bookData = book;

    if (!book.author || !book.title || !book.publicationYear) return undefined;

    return this.bookService.createBook(bookData);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() book: Partial<Book>,
  ): Book | undefined {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): Book[] | undefined {
    const bookId = +id;
    return this.bookService.deleteBook(bookId);
  }
}
