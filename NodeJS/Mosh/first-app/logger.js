const EventEmitter = require('events');


var url = 'http://mylogger';

class Logger extends EventEmitter{
    log(message){
        console.log(message);

        //Raise Event
        this.emit('messageLogged',{id: 1, url:'adasdasd'});
    }
}


module.exports = Logger;