// this file configures knex and bookshelf
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');


// registry plugin resolves circular dependencies
bookshelf.plugin('registry');
// cascade delete automatically deletes related entries from join tables
bookshelf.plugin(cascadeDelete);

module.exports = {knex, bookshelf}
