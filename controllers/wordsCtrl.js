'use strict'

const Word = require('../models/word')

module.exports.getWord = ({params: {correct_word}}, res, next) => {
  Word.getSingleWord(correct_word)
  .then( (word) => {
    res.status(200).json(word)
  })
  .catch( (error) => {
    next(error);
  });
};
