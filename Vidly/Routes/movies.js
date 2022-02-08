const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('Joi');
const {Movie,validate} = require('../models/movies.js');
const {Gerne} = require('../models/gernes.js');
const { Router } = require('express');

router.get('/', async(req,res) => {
    const movies = await Movie.find().sort({name:1});

    res.send(movies);
});

router.get('/:id', async(req,res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send(`${res.params.gerneId} was not found`);
    res.send(movie);
});

router.post('/', async(req,res) => {
    
    //validate movie
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //find gerne
    const gerne = await Gerne.findById(req.body.gerneId);
    if(!gerne) return res.status(400).send('Invalid Gerne');

    let movie = new Movie({
        title: req.body.title,
        gerne: {
            _id: gerne._id,
            name: gerne.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
});

router.put('/:id', async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send('Invalid id');
    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true});
    
    if(!updateMovie) return res.status(404).send(`${req.params.id} was not found`);
    res.send(updateMovie);
});

router.delete('/:id', async (req,res) => {
    const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
    if(!deleteMovie) return res.status(404).send(`${req.params.id} was not found`);

    res.send(deleteMovie);
});

module.exports = router;