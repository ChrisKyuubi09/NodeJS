const mongoose = require('mongoose');
const Joi = require('Joi');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength:5,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        minlength:3,
        required:true
    }
});

const User = mongoose.model('Users',userSchema);

function validation(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const result = schema.validate(user);
    return result;
}

exports.User = User;
exports.validate = validation
