'use strict'

const Game = require('../models/game')
// const UserGame = require('../models/userGame')

// Fetches games from database when called
// responds with status code 200 and json of games if successful
module.exports.getGamesAll = (req, res, next) => {
  Game.getAllGames()
    .then(games => res.status(200).json({games}))
    .catch(error => next(error))
}

// module.exports.addAnimal = (req, res, next) => {
//   let animal = req.body
//   const zookeepers = animal.zookeepers
//   // Remove zookeepers property from animal object
//   delete animal.zookeepers

//   Animal.addOne(animal)
//     .then(animal => {
//       const id = animal.id
//       let pairs = []
//       zookeepers.forEach(keeper => {
//         pairs.push({animal_id: id, zookeeper_id: keeper.id})
//       })
//       AnimalZookeeper.addMany(pairs)
//         .then(response => res.status(201).json({animal}))
//         .catch(err => next(err))
//     })
//     .catch(err => next(err))
// }

// module.exports.deleteAnimal = (req, res, next) => {
//   const id = req.params.id
//   Animal.delete(id)
//     .then(animal => res.status(200).json({msg: 'successful deletion'}))
//     .catch(err => next(err))
// }

// module.exports.updateAnimal = (req,res,next) =>{
//   const animal = req.body
//   const {id} = req.params
//   console.log("id",id);
//   console.log("body",animal);
//   Animal.updateAnimal(id,animal)
//   .then(animal => res.status(200).json(animal))
//   .catch(err => next(err))
// }
