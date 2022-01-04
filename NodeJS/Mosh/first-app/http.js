const http = require('http');
const { json } = require('stream/consumers');
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('Hello from node');
        res.end();

        if(req.url === '/api/courses')
        {
            res.write(JSON.stringify([1,2,3]));
            res.end();
        }
    }
});


server.listen(3000);

console.log('Listening on port 3000...');