const mongoose = require('mongoose');
const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const config = require('config');

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
    },
    isAdmin:{
        type:Boolean
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, config.get('jwtSecret') );
    return token;
};

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
