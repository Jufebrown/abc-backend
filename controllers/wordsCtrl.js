'use strict'

const Word = require('../models/word')

module.exports.getWord = ({params: {correct_word}}, res, next) => {
  Word.getSingleWord(correct_word)
  .then( (word) => {
    res.status(200).json(word)
  })
  .catch( (error) => {
    next(error)
  })
}

module.exports.addWord = ({body}, res, next) => {
  Word.forge(body)
  .save()
  .then(() => res.status(201).json({"msg": "good"}))
  .catch((error) => {
    next(error)
  })
}
