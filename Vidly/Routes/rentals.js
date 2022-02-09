const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Rental,validate} = require('../models/rentals.js');
const {Movie} = require('../models/movies.js');
const {Customer} = require('../models/customer.js');
const res = require('express/lib/response');

router.get('/',async (req,res) => {
    const rentals = await Rental.find().sort({ name: 1 });
    res.send(rentals); 
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if(error) res.this.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req,body.customerId);
    if(!customer) return res.status(404).send(`${req.body.customerId} not found`);

    const movie = await Movie.findById(req,body.movieId);
    if(!movie) return res.status(404).send(`${req.body.movieId} not found`);

    if(movie.numberInStock === 0) return res.status(400).send('Movie is not available for rental');

    let rental = new Rental({
        customer:{
            _id:customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();
    res.send(rental);

});

module.exports = router;
