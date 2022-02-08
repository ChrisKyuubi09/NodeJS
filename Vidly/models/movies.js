const Joi = require('Joi');
const mongoose = require('mongoose');
const {gerneSchema} = require('./gernes.js');

const moviesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    gerne: {
        type: gerneSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
    }
});

const Movie = mongoose.model('Movie',moviesSchema);

function validation(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        gerneId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    const result = schema.validate(movie);
    return result;
}

exports.Movie = Movie;
exports.validate = validation;