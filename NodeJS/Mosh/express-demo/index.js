const config = require('config');
const Joi = require('joi');
const express = require('express');
const req = require('express/lib/request');
const logger = require('./logger.js');
const authenticator = require('./authenticator.js');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//middleware from module
app.use(logger);
app.use(authenticator);
//custom middleware
// app.use(function(req,res,next) {
//     console.log('Logging....');
//     next();
// });

//custom middleware
// app.use(function(req,res,next) {
//     console.log('Authenticating...');
//     next();
// });

//Third party middleware
app.use(helmet());
app.use(morgan('tiny'));

const courses = [
    {id:1,name:'Node.JS'},
    {id:2,name:'Maths'},
    {id:3,name:'P.E'}
];

/////////////////////////////////////////////////////////////////////GET
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

/////////////////////////////////////////////////////////////////////POST
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

/////////////////////////////////////////////////////////////////////PUT

app.put('/api/courses/:id',(req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course){
         res.status(404).send('Not found');
         return;
    }

    //Normal way    
    //const result = validateCourse(req.boby);

    //Object Distructuring => Distructure Joi that returns 2 things Message, Error and we need only the Error
    const { error } = validateCourse(req.body);
     
      if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
      }

      course.name = req.body.name;
      res.send(course);
});

///////////////////////////////////////////////////////////////////DELETE
app.delete('/api/courses/:id',(req,res) => {
    const course = courses.find( c=> c.id === parseInt(req.params.id) );
    if(!course) {
        res.status(404).send('The course was not found in array');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

//PORT environment variable
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}...`));

//Validation function

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
      });
     
      const result = schema.validate(course);
      return result;
}

///Env
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

////////Config
console.log('Application Name:' + config.get('name'));
console.log('Application Name:' + config.get('mail.host'));
console.log('Application Name:' + config.get('mail.password'));