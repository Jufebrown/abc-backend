'use strict'

const Word = require('../models/word')

// checks to see if a word is in db (gets the word)
module.exports.getWord = ({params: {correct_word}}, res, next) => {
  Word.getSingleWord(correct_word)
  .then( (word) => {
    res.status(200).json(word)
  })
  .catch( (error) => {
    next(error)
  })
}

// adds a word to the db
module.exports.addWord = ({body}, res, next) => {
  Word.forge(body)
  .save()
  .then(() => res.status(201).json({"msg": "good"}))
  .catch((error) => {
    next(error)
  })
}
