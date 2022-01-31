const express = require('express');
const router = express.Router();
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

// const gernes = [
//     {id:1,gerne:'Action'},
//     {id:2,gerne:'Thriller'},
//     {id:3,gerne:'Comedy'},
//     {id:4,gerne:'Drama'},
//     {id:5,gerne:'Korean'}
// ];


//GET
router.get('/', async (req,res) => {
    const Gerne = mongoose.model('Gerne',gerneSchema);
    const gernes = await Gerne.find()
                              .sort( {name:1} );
    res.send(gernes);
});

router.get(`/:id`,async (req,res) => {
    const Gerne = mongoose.model('Gerne',gerneSchema);
    const gerne = await Gerne.findById(req.params.id);
    //if not 404
    if(!gerne) return res.status(404).send(`${res.params.gerneId} was not found`);
    //send gerne
    res.send(gerne);
});

//POST
router.post('/',async (req,res) => {
    //Read gerne from body
    const {error} = validation(req.body);
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
    const Gerne = mongoose.model('Gerne',gerneSchema);

    const {error} = validation(req.body);
    if(error) return res.status(400).send('Bad Request');

   
    const gerne = await Gerne.findByIdAndUpdate(req.params.id,{ name: req.body.name }, {new:true} );

    if(!gerne) return res.status(404).send('Not found');

    res.send(gerne);
});

//DELETE
router.delete(`/:id`,async (req,res) => {
    const Gerne = mongoose.model('Gerne',gerneSchema);
    const gerne = await Gerne.findByIdAndRemove(req.params.id);

    if(!gerne) return res.status(404).send('Not found');

     res.send(gerne);
});


//Validation Function
function validation(name){
    const schema = Joi.object({
        name: Joi.string().min(1).required()
    });

    const result = schema.validate(name);
    return result;
}

module.exports = router;
