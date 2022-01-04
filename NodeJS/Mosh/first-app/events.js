const EventEmitter = require('events');
const emitter = new EventEmitter();

//Listener 
emitter.on('messageLogged',(args) => {
    console.log('Listen to event',args);
});

//Raise Event
emitter.emit('messageLogged',{id:1,url:'http://www.mosh.com'});