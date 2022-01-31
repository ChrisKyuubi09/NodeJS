const Joi = require('joi');
const express = require('express');
const { parse } = require('ipaddr.js');
const app = express();
const gernes = require('./Routes/gernes.js');
const customers = require('./Routes/customer.js')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log('Connecterd to DB...'))
        .catch((err) => console.error('Could not connect'));

app.use(express.json());

app.use('/api/gernes',gernes);
app.use('/api/customers',customers);

//Raise the events
const port = process.env.PORT || 3000;
app.listen(port,() => {console.log(`Listening on port ${port}...`)});
