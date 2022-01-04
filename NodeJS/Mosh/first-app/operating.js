const os = require('os');

var totalMemory = os.totalmem();
var freemem = os.freemem();

console.log('Total Memory: ' + os.totalmem);

///ES7

console.log(`Free Memory is  ${freemem}`);