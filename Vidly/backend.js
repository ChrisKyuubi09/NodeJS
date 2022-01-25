const Joi = require('joi');
const express = require('express');
const { parse } = require('ipaddr.js');
const app = express();
const api = '/api/gernes/';

app.use(express.json());

const gernes = [
    {id:1,gerne:'Action'},
    {id:2,gerne:'Thriller'},
    {id:3,gerne:'Comedy'},
    {id:4,gerne:'Drama'},
    {id:5,gerne:'Korean'}
];


//GET
app.get(api,(req,res) => {
    res.send(gernes);
});

app.get(`${api}:gerneId`,(req,res) => {
    //Lookup in gernes
    const gerne = gernes.find( g => g.id === parseInt(req.params.gerneId));
    //if not 404
    if(!gerne) return res.status(404).send(`${res.params.gerneId} was not found`);
    //send gerne
    res.send(gerne);
});

//POST
app.post(api,(req,res) => {
    //Read gerne from body
    const {error} = validation(req.body);
    //check if null
    if(error) return res.status(404).send(error.details[0].message);
    
    //
    const newGerne = {
        id: gernes.length + 1,
        gerne: req.body.gerne
    };

    gernes.push(newGerne);

    res.send(newGerne);
});

//PUT
app.put(`${api}:id`,(req,res) => {
    const gerne = gernes.find( g=>g.id === parseInt(req.params.id));
    if(!gerne) return res.status(404).send('Not found');

    const {error} = validation(req.body);

    if(error) return res.status(400).send('Bad Request');

    gerne.gerne = req.body.gerne;
    res.send(gerne);
});

//DELETE
app.delete(`${api}:id`,(req,res) => {
    const gerne = gernes.find( g=>g.id === parseInt(req.params.id));

    if(!gerne) return res.status(404).send('Not found');

     const index = gernes.indexOf(gerne);
     gernes.splice(index,1);

     res.send(gerne);
});

//Raise the events
const port = process.env.PORT || 3000;
app.listen(port,() => {console.log(`Listening on port ${port}...`)});

//Validation Function
function validation(gerne){
    const schema = Joi.object({
        gerne: Joi.string().min(1).required()
    });

    const result = schema.validate(gerne);
    return result;
}
