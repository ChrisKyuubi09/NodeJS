const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const gerneSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Gerne = new mongoose.model('Gerne',gerneSchema);

// const gernes = [
//     {id:1,gerne:'Action'},
//     {id:2,gerne:'Thriller'},
//     {id:3,gerne:'Comedy'},
//     {id:4,gerne:'Drama'},
//     {id:5,gerne:'Korean'}
// ];


//GET
router.get('/', async (req,res) => {
    const Gerne = new mongoose.model('Gerne',gerneSchema);
    const gernes = await Gerne.find()
                              .sort( {name:1} );
    res.send(gernes);
});

router.get(`/`,(req,res) => {
    //Lookup in gernes
    const gerne = gernes.find( g => g.id === parseInt(req.params.gerneId));
    //if not 404
    if(!gerne) return res.status(404).send(`${res.params.gerneId} was not found`);
    //send gerne
    res.send(gerne);
});

//POST
router.post('/',(req,res) => {
    //Read gerne from body
    const {error} = validation(req.body);
    //check if null
    if(error) return res.status(404).send(error.details[0].message);
    
    //
    let newGerne = new Gerne ({
        gerne: req.body.gerne
    });

    //gernes.push(newGerne);
    gerne = await gerne.save();

    res.send(newGerne);
});

//PUT
router.put(`/:id`,(req,res) => {
    const gerne = gernes.find( g=>g.id === parseInt(req.params.id));
    if(!gerne) return res.status(404).send('Not found');

    const {error} = validation(req.body);

    if(error) return res.status(400).send('Bad Request');

    gerne.gerne = req.body.gerne;
    res.send(gerne);
});

//DELETE
router.delete(`/:id`,(req,res) => {
    const gerne = gernes.find( g=>g.id === parseInt(req.params.id));

    if(!gerne) return res.status(404).send('Not found');

     const index = gernes.indexOf(gerne);
     gernes.splice(index,1);

     res.send(gerne);
});


//Validation Function
function validation(gerne){
    const schema = Joi.object({
        gerne: Joi.string().min(1).required()
    });

    const result = schema.validate(gerne);
    return result;
}

module.exports = router;
