const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1,name:'Node.JS'},
    {id:2,name:'Maths'},
    {id:3,name:'P.E'}
]
app.get('/',(req,res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses',(req,res) => {
    res.send(courses);
});

//api/courses/1
app.get('/api/courses/:id',(req,res) => {

   const course = courses.find(c => c.id === parseInt(req.params.id));

   if(!course) res.status(404).send('Course with given id not found');
   res.send(course);
});

//POST
app.post('/api/courses',(req,res) => {
    
    //joi schema
    const schema = Joi.object({
        name: Joi.string().min(3).required()
      });
     
      const result = schema.validate(req.body);
     
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
      }

    // if(!req.body.name || req.body.name.length < 3)
    // {
    //     //Send BAD REQUEST
    //     res.status(400).send('Bad request, name is required and > 3');
    //     return;
    // }

   const course = {
       id:courses.length + 1,
       name: req.body.name
   };
   courses.push(course);
   res.send(course);
});

//PORT environment variable
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}...`));