const EventEmitter = require('events');
const Logger = require('./logger');
const logger = new Logger();

//Listener
logger.on('messageLogged', (args) => {
    console.log('Listener called',args);
});

logger.log('message');