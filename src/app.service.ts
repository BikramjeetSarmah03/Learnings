import { Injectable } from '@nestjs/common';

import { Book, books } from '~/FakeDatabase';

@Injectable()
export class BookService {
  getAllBooks(): Book[] {
    return books;
  }

  getBookById(id: number): Book | undefined {
    return books.find((b) => b.id === id);
  }

  createBook(book: Partial<Book>): Book {
    const newId = books[books.length - 1].id + 1;

    const newBook = {
      id: newId,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0,
    };

    books.push(newBook);

    return newBook;
  }

  updateBook(id: number, updateBookFields: Partial<Book>): Book {
    const currentBook = books.find((book) => book.id === id);

    const updatedBook = {
      id: id,
      title: updateBookFields.title ?? currentBook.title,
      author: updateBookFields.author ?? currentBook.author,
      publicationYear:
        updateBookFields.publicationYear ?? currentBook.publicationYear,
    };

    books[id - 1] = updatedBook;

    return updatedBook;
  }

  deleteBook(id: number): Book[] | undefined {
    return books.splice(id - 1, 1);
  }
}
