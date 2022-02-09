const mongoose = require('mongoose');
const Joi = require('Joi');

const rentalSchema = mongoose.Schema({
    custoner: {
        type: new mongoose.Schema({
            name:{
                type:String,
                required: true,
                minlength: 5
            },
            isGold:{
                type: Boolean,
                default: true
            },
            phone:{
                type: String,
                required: true,
                minlength: 8
            }
        }),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title: {
                type:String,
                required:true,
                minlength: 5,
                trim: true
            },
            dailyRentalRate: {
                type: String,
                required:true,
                min:0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min:0
    }
});

const Rental = mongoose.model('Rental',rentalSchema);

function validation(rental)
{
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    const result = schema.validate(rental);

    return result;
}



exports.Rental = Rental;
exports.validate = validation;