const fs = require('fs');

//Synchronous
// const files = fs.readdirSync('./');
// console.log(files);

//Asynchronous
fs.readdir('./', function(err,files){
    if(err) console.log('Error',err.message);
    else console.log('Files',files);
});

console.log('I should be the last one');