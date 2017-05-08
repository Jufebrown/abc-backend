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
          res.body.should.have.key(['games','userAndTheirGames', 'register', 'login', 'user'])
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
        username: 'michael',
        password: 'johnson123'
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
        should.not.exist(error);
        chai.request(server)
        .get('/api/v1/auth/user')
        .set('authorization', 'Bearer ' + response.body.token)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
      });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/v1/auth/user')
      .end((err, res) => {
        should.exist(err);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });
  });

  // tests getting all games
  describe(`GET /api/v1/games`, function() {
    it(`should return all games`, function() {
      return chai.request(server)
        .get(`/api/v1/games`).then(res => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a.object
          res.body.should.have.key('games')
          res.body.games.should.be.a.array
          res.body.games[0].number_correct.should.equal('4')
        })
    })
  })

  // tests getting all games for logged in user
  describe(`GET /api/v1/games`, function() {
    it(`should return all games for user 1`, function() {
      return chai.request(server)
        .get(`/api/v1/auth/games?userId=1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a.object
          res.body.should.have.key(["admin", "created_at", "games", "id", "password", "username"])
          res.body.games.should.be.a.array
          res.body.games[0].number_correct.should.equal('4')
        })
    })
  })
})
