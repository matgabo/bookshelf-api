const ClientError = require('../../exceptions/ClientError');

class BooksHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postBookHandler = this.postBookHandler.bind(this);
    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.putBookByIdHandler = this.putBookByIdHandler.bind(this);
    this.deleteBookByIdHandler = this.deleteBookByIdHandler.bind(this);
  }

  postBookHandler(request, h) {
    try {
      this.validator.validateBookPayload(request.payload);
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
      } = request.payload;

      const bookId = this.service.addBook({
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
      });

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: `Gagal menambahkan buku. ${error.message}`,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Mohon maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  getBooksHandler(request) {
    const books = this.service.getBooks(request.query);
    return {
      status: 'success',
      data: {
        books,
      },
    };
  }

  getBookByIdHandler(request, h) {
    try {
      this.validator.validateBookPayload(request.payload);
      const { id } = request.params;
      const book = this.service.getBookById(id);
      return {
        status: 'success',
        data: {
          book,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Mohon maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  putBookByIdHandler(request, h) {
    try {
      this.validator.validateBookPayload(request.payload);
      const { id } = request.params;

      this.service.editBookById(id, request.payload);

      return {
        status: 'success',
        message: 'Buku berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: `Gagal memperbarui buku. ${error.message}`,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Mohon maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  deleteBookByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this.service.deleteBookById(id);
      return {
        status: 'success',
        message: 'Buku berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Mohon maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = BooksHandler;
