const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
// Creating server
const app = express();
const port = process.env.PORT || 5000;

// Initialize Middleware
app.use(cors());
app.use(express.json());

// Connect Mongodb Database System
const uri = process.env.ATLAS_URI;

mongoose.connect( uri ||'mongodb://localhost:27017/mern-stack-tracker', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

// Api Routes enpoint
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './client/build/index.html'));
});

if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname + './client/build')));
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});