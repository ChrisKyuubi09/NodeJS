const Joi = require('joi');
const express = require('express');
const { parse } = require('ipaddr.js');
const app = express();
const gernes = require('./Routes/gernes.js');
const customers = require('./Routes/customer.js');
const movies = require('./Routes/movies.js');
const rentals = require('./Routes/rentals.js');
const mongoose = require('mongoose');
const user = require('./Routes/users.js');
const auth = require('./Routes/auths.js');

mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log('Connecterd to DB...'))
        .catch((err) => console.error('Could not connect'));

app.use(express.json());

app.use('/api/gernes',gernes);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',user);
app.use('/api/auth',auth);

//Raise the events
const port = process.env.PORT || 3000;
app.listen(port,() => {console.log(`Listening on port ${port}...`)});
