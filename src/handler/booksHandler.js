const books = require("../books");
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // 2. Validasi: readPage tidak boleh lebih besar dari pageCount

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const id = nanoid(); // ✅ memakai nanoid() default
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary,
    publisher, pageCount, readPage, finished,
    reading, insertedAt, updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.find((book) => book.id === id);

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  // Filter by name (non-case sensitive)
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by reading status
  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.reading === (reading === '1')
    );
  }

  // Filter by finished status
  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.finished === (finished === '1')
    );
  }

  const bookList = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books: bookList,
    },
  }).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: `Buku tidak ditemukan`
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

   // Validasi: properti name harus ada
  if(!name){
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if(readPage > pageCount){
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((book)=> book.id === bookId);
  if(index === -1){
    return h.response({
      status: 'fail',
      message: `Gagal memperbarui buku. Id tidak ditemukan`,
    }).code(404);
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
    finished,
  };

  return h.response({
    status:'success',
    message:'Buku Berhasil diperbarui'
  }).code(200);
};


const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book)=> book.id === bookId);
  if(index === -1){
    return h.response({
      status: 'fail',
      message: `Buku gagal dihapus. Id tidak ditemukan`,
    }).code(404);
  }

  books.splice(index, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
};
