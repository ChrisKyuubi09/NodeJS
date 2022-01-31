const express = require('express');
const router = express.Router();
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

//GET
router.get('/',async (req,res) => {
    const customers = await Customer.find().sort( {name: 1} );

    res.send(customers);
});

//GET id
router.get('/:id',async(req,res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send(`${res.params.gerneId} was not found`);

    res.send(customer);

});

//Post
router.post('/',async (req,res) => {
    //User input validation
    const {error} = validation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer ({ name:req.body.name ,  isGold: req.body.isGold ,  phone: req.body.phone });

    customer = await customer.save();

    res.send(customer);
});

//Put
router.put('/:id',async (req,res) => {
    const {error} = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
                                                                        name: req.body.name,
                                                                        isGold: req.body.isGold,
                                                                        phone: req.body.phone
                                                                    },{ new: true });
    if(!customer) return res.status(404).send('Not found');
    res.send(customer);

});

//Delete
router.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer) res.status(404).send('Not found');

    res.send(customer);

});

function validation (customer){
    const schema = Joi.object ({
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.number().min(8),
        isGold: Joi.required()
    });

    const result = schema.validate(customer);

    return result;
}

module.exports = router;