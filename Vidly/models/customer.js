const mongoose = require('mongoose');
const Joi = require('Joi');

const customerSchema = new mongoose.Schema( {
    name: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number,
        minlength: 8
    }
});

const Customer = mongoose.model('Customer',customerSchema);

function validation (customer){
    const schema = Joi.object ({
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.number().min(8),
        isGold: Joi.required()
    });

    const result = schema.validate(customer);

    return result;
}

exports.Customer = Customer;
exports.validate = validation;