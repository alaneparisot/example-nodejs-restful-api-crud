const { expect } = require('chai');
const request = require('supertest');

const { app, init } = require('../../app');
const Book = require('../../models/book');
const Author = require('../../models/author');

const bookEndpoint = '/api/books';

let firstBook;

describe('CRUD: Books', () => {

  before(async () => {
    await init();
    await Author.deleteMany();
    await Book.deleteMany();
    await feedBooks();
  });

  describe('POST /books', () => {
    const book = {
      title: 'The Old Man and the Sea',
      year: 1952
    };

    let author;

    before(async () => {
      const newAuthor = new Author({
        name: 'Ernest Hemingway',
        country: 'United States'
      });

      author = await newAuthor.save();
      book.author = author.id;
    });

    it('should create a new book and update author', async () => {
      await request(app)
        .post(bookEndpoint)
        .send({ book })
        .expect(201)
        .then(async () => {
          const newBook = await Book.findOne(book);
          expect(newBook instanceof Book).to.be.true;

          const updatedAuthor = await Author.findById(author.id);
          expect(updatedAuthor.books[0].toString()).to.equal(newBook.id);
        });
    });

    it('should not create an existing book', async () => {
      await request(app)
        .post(bookEndpoint)
        .send({ book })
        .expect(422)
        .then(async () => {
          const books = await Book.find({ title: book.title });
          expect(books.length).to.equal(1);
        });
    });

    it('should not create a new book with invalid inputs', async () => {
      await request(app)
        .post(bookEndpoint)
        .send({ title: '' })
        .expect(422)
        .then(async () => {
          const books = await Book.find({ title: book.title });
          expect(books.length).to.equal(1);
        });
    });

  });

  describe('GET /books', () => {

    it('should get all books', async () => {
      await request(app)
        .get(bookEndpoint)
        .expect(200)
        .then(async (res) => {
          const books = await Book.find();
          expect(JSON.stringify(books)).to.equal(JSON.stringify(res.body.books));
        });
    });

  });

  describe('GET /books/:id', () => {

    it('should get a book', async () => {
      await request(app)
        .get(`${bookEndpoint}/${firstBook.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.book._id).to.equal(firstBook.id);
        });
    });

    it('should not get a nonexitent book', async () => {
      await request(app)
        .get(`${bookEndpoint}/5c3b920c49df574be03fc5cf`)
        .expect(422); // TODO: Should be 404
    });

  });

  describe('PATCH /books/:id', () => {

    it('should update a book', async () => {
      const newTitle = 'Of Mice and Men';

      await request(app)
        .patch(`${bookEndpoint}/${firstBook.id}`)
        .send({ book: { title: newTitle } })
        .expect(200)
        .then(async (res) => {
          expect(res.body.book.title).to.equal(newTitle);

          const book = await Book.findById(firstBook.id);
          expect(book.title).to.equal(newTitle);
        });
    });

  });

  describe('DELETE /books/:id', () => {

    it('should delete a book and update author', async () => {
      const books = await Book.find();

      await request(app)
        .delete(`${bookEndpoint}/${firstBook.id}`)
        .expect(200)
        .then(async () => {
          const book = await Book.findById(firstBook.id);
          expect(book).to.be.null;

          const booksAfterDeleting = await Book.find();
          expect(booksAfterDeleting.length).to.equal(books.length - 1);

          const author = await Author.findById(firstBook.author);
          expect(author.books.length).to.equal(0);
        });
    });

  });

});

// Private

async function feedBooks() {
  const newAuthor = new Author({
    name: 'John Steinbeck',
    country: 'United States'
  });

  const author = await newAuthor.save();

  const newBook = new Book({
    title: 'The Grapes of Wrath',
    year: 1939,
    author: author.id
  });

  firstBook = await newBook.save();
}