`use strict`

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app')
const { knex } = require('../db/database')
const localAuth = require('../auth/local');
chai.use(chaiHttp)

// tests for user auth
describe('auth : local', () => {
  describe('encodeToken()', () => {
    it('should return a token', (done) => {
      const results = localAuth.encodeToken({id: 2})
      should.exist(results)
      results.should.be.a('string')
      done()
    })
  })

  describe('decodeToken()', () => {
    it('should return a payload', (done) => {
      const token = localAuth.encodeToken({id: 2})
      should.exist(token)
      token.should.be.a('string')
      localAuth.decodeToken(token, (err, res) => {
        should.not.exist(err)
        res.sub.should.equal(2)
        done()
      })
    })
  })
})

// tests for routes
describe('abc routes', ()=>{
  // does a rollback on test db and then migration and seed before each test run so we know what is in db
  beforeEach(() =>{
    return knex.migrate.rollback()
      .then (()=>{
        return knex.migrate.latest()
      })
      .then (()=>{
        return knex.seed.run()
      })
  });

  // test for getting the api root
  describe('get root route', ()=>{
    it('should have all routes',() =>{
      return chai.request(server)
        .get('/api/v1/')
        .then((res) => {
          res.should.have.status(200)
          res.should.be.json
          res.should.be.a.object
          res.body.should.have.key(['getAllgames','getGamesForLoggedInUser', 'register', 'login', 'getLoggedInUser', 'getFriendsForLoggedInUser', 'getWordsForSpecifiedGame', 'getWord', 'addWord', 'addGame'])
        })
    })
  });

  // tests register route
  describe('POST /auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/register')
      .send({
        username: 'geronimo',
        password: 'password'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.include.keys('status', 'token');
        res.body.status.should.eql('success');
        done();
      });
    });
  });

  // tests login route
  describe('POST /auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.include.keys('status', 'token');
        res.body.status.should.eql('success');
        should.exist(res.body.token);
        done();
      });
    });
    it('should not login an unregistered user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'sid',
        password: 'viscous'
      })
      .end((err, res) => {
        should.exist(err);
        res.status.should.eql(500);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        done();
      });
    });
  });

  // tests user endpoint
  describe('GET /auth/user', () => {
    it('should return a success', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get('/api/v1/auth/user')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.status.should.eql('success')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests get all games
  describe('GET /games', () => {
    it('should return all game if a user is logged in', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get('/api/v1/games')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.games.should.be.a.array
          res.body.games[0].number_correct.should.be.eql('4')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests getting all games for logged in user
  describe('GET /api/v1/user/games', () => {
    it('should return all games specifically for logged in user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get(`/api/v1/user/games`)
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.body.games.should.be.a.array
          res.body.games[0].number_correct.should.equal('4')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests user friends
  describe('GET /user/friends', () => {
    it('should return a all friends unlocked by logged in user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get('/api/v1/user/friends')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.friends[0].name.should.eql('Ant')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests route for getting words used in games
  describe('GET /games/words', () => {
    it('should return a all words used in a specified game', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get('/api/v1/games/words?gameId=1')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.words[0].correct_word.should.eql('ant')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests route for getting single word
  describe('GET /word/:<correct_word>', () => {
    it('should return a single word if a user is logged in', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .get('/api/v1/word/ant')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.correct_word.should.eql('ant')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests route for adding word to words table
  describe('POST /word/:<correct_word>', () => {
    it('should add a word if a user is logged in', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .post('/api/v1/words/new')
        .send({correct_word: 'husky'})
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(201)
          chai.request(server)
          .get('/api/v1/word/husky')
          .set('authorization', 'Bearer ' + response.body.token)
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.eql(200)
            res.type.should.eql('application/json')
            res.body.correct_word.should.eql('husky')
            // console.log('word just added:', res.body.correct_word)
            done()
          })
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

  // tests route for adding a game to games table and users_games table
  describe('GET /games/new', () => {
    it('should add a game to the game table and the users_games table', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'jufe',
        password: 'password'
      })
      .end((error, response) => {
        should.not.exist(error)
        chai.request(server)
        .post('/api/v1/games/new')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(201)
          // res.type.should.eql('application/json')
          done()
        })
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        res.body.status.should.eql('Please log in')
        done()
      })
    })
  })

})
