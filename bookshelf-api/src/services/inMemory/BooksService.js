const { nanoid } = require('nanoid');

class BooksService {
  constructor() {
    this.books = [];
  }

  addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    if (name === undefined) {
      throw new Error('Gagal menambahkan buku. Mohon isi nama buku');
    }

    if (readPage > pageCount) {
      throw new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    }

    this.books.push(newBook);

    const isSuccess = this.books.filter((book) => book.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Buku gagal ditambahkan');
    }
    return id;
  }

  getBooks({ name, reading, finished }) {
    let filteredBook = this.books;

    if (name !== undefined) {
      filteredBook = this.books.filter(
        (book) => book.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (reading !== undefined) {
      filteredBook = this.books.filter((book) => book.reading === (reading === '1'));
    }

    if (finished !== undefined) {
      filteredBook = this.books.filter((book) => book.finished === (finished === '1'));
    }

    return filteredBook.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  getBookById(id) {
    const book = this.books.filter((n) => n.id === id)[0];
    if (!book) {
      throw new Error('Buku tidak ditemukan');
    }
    return book;
  }

  editBookById(
    id,
    {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    },
  ) {
    if (name === undefined) {
      throw new Error('Gagal memperbarui buku. Mohon isi nama buku');
    }

    if (readPage > pageCount) {
      throw new Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
    }

    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui buku. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this.books[index] = {
      ...this.books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
  }

  deleteBookById(id) {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new Error('Buku gagal dihapus. Id tidak ditemukan');
    }

    this.books.splice(index, 1);
  }
}

module.exports = BooksService;
