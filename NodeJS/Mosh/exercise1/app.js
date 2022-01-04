const EventEmitter = require('events');
const emitter = new EventEmitter();

//Listener
emitter.on('logging',(args) => {
    console.log('Logging ',args);
});

//Raise event
emitter.emit('logging',{id:1,username:'ChrisBuild',password:'123qwe'});