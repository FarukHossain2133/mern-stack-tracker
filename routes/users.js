const express = require('express');

const router = express.Router();
const User = require('../models/userModel');

router.get('/', (req, res) => {
    User.find()
        .then( users => res.json(users))
        .catch(err => res.status(400).json('error:' + err))
});

router.post('/add', (req, res) => {
    const username = req.body.username;

    const newUser = new User({username: username});

    newUser.save()
        .then((user) => res.json(user))
        .catch(err => res.status(400).json('error:' + err))
});

module.exports = router;



