const express = require('express');

const router = express.Router();
const Exercise = require('../models/exerciseModels');

/******
    Desc: GET All exercises
    Method: get
    route: exercises/
    security: public
*******/
router.get('/', (req, res) => {
    Exercise.find()
        .then( exercises => res.json(exercises))
        .catch(err => res.status(400).json('error:' + err))
});

/******
    Desc: Post An exercise
    Method: post
    route: exercises/add
    security: public
*******/
router.post('/add', (req, res) => {
    console.log('Hitted add exercise post req')
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    }); 

    newExercise.save()
        .then((exercise) => res.json(exercise))
        .catch(err => res.status(400).json('error:' + err))
});

/******
    Desc: GET An exercise
    Method: get
    route: exercises/:id
    security: public
*******/
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err))
});

/******
    Desc: Delete An exercise
    Method: delete
    route: exercises/:id
    security: public
*******/
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error:' + err))
});

/******
    Desc: Update An exercise
    Method: post
    route: exercises/update/:id
    security: public
*******/
router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then((exercise) => res.json(exercise))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => res.status(400).json('Error:' + err))
})



module.exports = router;



