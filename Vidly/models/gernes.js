const mongoose = require('mongoose');
const Joi = require('Joi');

const gerneSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Gerne = mongoose.model('Gerne',gerneSchema);

//Validation Function
function validation(name){
    const schema = Joi.object({
        name: Joi.string().min(1).required()
    });

    const result = schema.validate(name);
    return result;
}

exports.Gerne = Gerne;
exports.validate = validation;