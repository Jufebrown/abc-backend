
exports.up = function(knex, Promise) {
  // adds users table
  .createTableIfNotExists('users', (table)=> {
    table.increments()
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
  })
  // adds games table
  .createTableIfNotExists('games', (table)=> {
    table.increments()
    table.string('number_correct')
    table.string('number_asked')
    table.boolean('won')
  })
  // adds words table
  .createTableIfNotExists('words', (table)=> {
    table.increments()
    table.string('correct_word').notNullable()
  })
  // adds friends table
  .createTableIfNotExists('friends', (table)=> {
    table.increments()
    table.string('name').unique().notNullable()
    table.integer('answers_needed').unsigned().notNullable()
    table.integer('games_needed').unsigned()
  })
  // adds users_games table
  .createTableIfNotExists('users_games',(t)=>{
    t.increments()
    t.integer('users_id').unsigned().references('users.id')
    t.integer('games_id').unsigned().references('games.id')
  })
  // adds games_words table
  .createTableIfNotExists('games_words',(t)=>{
    t.increments()
    t.integer('games_id').unsigned().references('games.id')
    t.integer('words_id').unsigned().references('words.id')
  })
  // adds users_friends table
  .createTableIfNotExists('users_friends',(t)=>{
    t.increments()
    t.integer('users_id').unsigned().references('users.id')
    t.integer('friends_id').unsigned().references('friends.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('users_friends')
  .dropTableIfExists('games_words')
  .dropTableIfExists('users_games')
  .dropTableIfExists('friends')
  .dropTableIfExists('words')
  .dropTableIfExists('games')
  .dropTableIfExists('users')
};
