`use strict`

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app')
const { knex } = require('../db/database')
chai.use(chaiHttp)


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
          res.body.should.have.key(['games'])
        })
    })
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
    it(`should return all games`, function() {
      return chai.request(server)
        .get(`/api/v1/users/games?userID=1`).then(res => {
          res.should.have.status(200)
          // res.should.be.json
          // res.body.should.be.a.object
          // res.body.should.have.key('games')
          // res.body.games.should.be.a.array
          // res.body.games[0].number_correct.should.equal('4')
        })
    })
  })
})
