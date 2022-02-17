const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('Joi');
const { Router } = require('express');
const {User,validate} = require('../models/users.js');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already exists");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);//10 rounds
    user.password = await bcrypt.hash(user.password,salt);

    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user, ['name','email']));
});

router.get('/', async (req,res) => {
    const user = await User.find().sort({name:1});
    res.send(user);
});

module.exports = router;