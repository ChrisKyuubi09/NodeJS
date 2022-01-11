const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const req = require('express/lib/request');
const logger = require('./logger.js');
const authenticator = require('./authenticator.js');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('../express-demo/routes/courses.js');
const hellos = require('./routes/hello.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/courses',courses);
app.use('/',hellos);

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


/////////////////////////////////////////////////////////////////////GET


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
    startupDebugger('Morgan enabled...');
}

//Database Work
dbDebugger('Connected to the database');

////////Config
console.log('Application Name:' + config.get('name'));
console.log('Application Name:' + config.get('mail.host'));
console.log('Application Name:' + config.get('mail.password'));