
exports.up = function(knex, Promise) {
  return knex.schema
  // adds users table
  .createTable('users', (t)=> {
    t.increments()
    t.string('username').unique().notNullable()
    t.string('password').notNullable()
    t.boolean('admin').notNullable().defaultTo(false);
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  // adds games table
  .createTable('games', (t)=> {
    t.increments()
    t.string('number_correct')
    t.string('number_asked')
    t.boolean('won')
  })
  // adds words table
  .createTable('words', (t)=> {
    t.increments()
    t.string('correct_word').notNullable()
  })
  // adds friends table
  .createTable('friends', (t)=> {
    t.increments()
    t.string('name').unique().notNullable()
    t.integer('answers_needed').unsigned().notNullable()
    t.integer('games_needed').unsigned()
  })
  // adds users_games table
  .createTable('users_games',(t)=>{
    t.increments()
    t.integer('user_id').unsigned().references('users.id')
    t.integer('game_id').unsigned().references('games.id')
  })
  // adds games_words table
  .createTable('games_words',(t)=>{
    t.increments()
    t.integer('game_id').unsigned().references('games.id')
    t.integer('word_id').unsigned().references('words.id')
  })
  // adds users_friends table
  .createTable('users_friends',(t)=>{
    t.increments()
    t.integer('user_id').unsigned().references('users.id')
    t.integer('friend_id').unsigned().references('friends.id')
  })
};

// for rollback
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
