const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('Joi');
const { Router } = require('express');
const {User} = require('../models/users.js');
const _ = require('lodash')
const bcrypt = require('bcrypt');

router.post('/',async(req,res) => {
    const {error} = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");

    res.send(true);
});

router.get('/', async (req,res) => {
    const user = await User.find().sort({name:1});
    res.send(user);
});

function validation(auth){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const result = schema.validate(auth);
    return result;
}

module.exports = router;