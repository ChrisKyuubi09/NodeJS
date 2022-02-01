const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('Joi');
const {Gerne,validate} = require(`../models/gernes.js`);

//GET
router.get('/', async (req,res) => {
    //const Gerne = mongoose.model('Gerne',gerneSchema);
    const gernes = await Gerne.find()
                              .sort( {name:1} );
    res.send(gernes);
});

router.get(`/:id`,async (req,res) => {
    //const Gerne = mongoose.model('Gerne',gerneSchema);
    const gerne = await Gerne.findById(req.params.id);
    //if not 404
    if(!gerne) return res.status(404).send(`${res.params.gerneId} was not found`);
    //send gerne
    res.send(gerne);
});

//POST
router.post('/',async (req,res) => {
    //Read gerne from body
    const {error} = validate(req.body);
    //check if null
    if(error) return res.status(400).send(error.details[0].message);
    
    //
    let gerne = new Gerne ({
        name: req.body.name
    });

    //gernes.push(newGerne);
    gerne = await gerne.save();

    res.send(gerne);
});

//PUT
router.put(`/:id`,async (req,res) => {
    //const Gerne = mongoose.model('Gerne',gerneSchema);

    const {error} = validate(req.body);
    if(error) return res.status(400).send('Bad Request');

   
    const gerne = await Gerne.findByIdAndUpdate(req.params.id,{ name: req.body.name }, {new:true} );

    if(!gerne) return res.status(404).send('Not found');

    res.send(gerne);
});

//DELETE
router.delete(`/:id`,async (req,res) => {
    //const Gerne = mongoose.model('Gerne',gerneSchema);
    const gerne = await Gerne.findByIdAndRemove(req.params.id);

    if(!gerne) return res.status(404).send('Not found');

     res.send(gerne);
});

module.exports = router;