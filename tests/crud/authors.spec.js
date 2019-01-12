const { expect } = require('chai');
const request = require('supertest');

const { app, init } = require('../../app');
const Author = require('../../models/author');

let firstAuthor;

describe('CRUD: Authors', () => {

  before(async () => {
    await init();
    await Author.deleteMany();
    await feedAuthors();
  });

  describe('POST /authors', () => {
    const author = {
      name: 'John Steinbeck',
      country: 'United States'
    };

    it('should create a new author', async () => {
      await request(app)
        .post('/api/authors')
        .send({ author })
        .expect(201)
        .then(async (res) => {
          const newAuthor = await Author.findById(res.body.author._id);
          expect(newAuthor instanceof Author).to.be.true;
        });
    });

    it('should not create an existing author', async () => {
      await request(app)
        .post('/api/authors')
        .send({ author })
        .expect(422)
        .then(async (res) => {
          const authors = await Author.find({ name: author.name });
          expect(authors.length).to.equal(1);
        });
    });

    it('should not create a new author with invalid inputs', async () => {
      await request(app)
        .post('/api/authors')
        .send({ name: '', country: '' })
        .expect(422)
        .then(async (res) => {
          const authors = await Author.find({ name: author.name });
          expect(authors.length).to.equal(1);
        });
    });

  });

  describe('GET /authors', () => {

    it('should get all authors', async () => {
      await request(app)
        .get('/api/authors')
        .expect(200)
        .then(async (res) => {
          const authors = await Author.find();
          expect(JSON.stringify(authors)).to.equal(JSON.stringify(res.body.authors));
        });
    });

  });

  describe('GET /authors/:id', () => {

    it('should get a user', async () => {
      await request(app)
        .get('/api/authors/' + firstAuthor._id)
        .expect(200)
        .then((res) => {
          expect(JSON.stringify(res.body.author)).to.equal(JSON.stringify(firstAuthor));
        });
    });

    it('should not get a nonexistent user', async () => {
      await request(app)
        .get('/api/authors/' + '5c37c35efba1fa14e811b542')
        .expect(422); // TODO: Should be 404
    });

  });

  describe('PATCH /authors/:id', () => {

    it('should update a user', async () => {
      const newName = 'Mark Twain';

      await request(app)
        .patch('/api/authors/' + firstAuthor._id)
        .send({ author: { name: newName } })
        .expect(200)
        .then(async (res) => {
          expect(res.body.author.name).to.equal(newName);

          const author = await Author.findById(firstAuthor._id);
          expect(author.name).to.equal(newName);
        });
    });

  });

  describe('DELETE /authors/:id', () => {

    it('should delete a user', async () => {
      const authors = await Author.find();

      await request(app)
        .delete('/api/authors/' + firstAuthor._id)
        .expect(200)
        .then(async () => {
          const author = await Author.findById(firstAuthor._id);
          expect(author).to.be.null;

          const authorsAfterDeleting = await Author.find();
          expect(authorsAfterDeleting.length).to.equal(authors.length - 1);
        });
    });

  });

});

// Private: Helpers

async function feedAuthors() {
  const author = new Author({ name: 'Ernest Hemingway', country: 'United States' });
  firstAuthor = await author.save();
}
