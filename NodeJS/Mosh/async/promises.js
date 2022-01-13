const p = new Promise((resolve,reject) =>{
   //Make an async operation
   //
   setTimeout( ()=> {
    //resolve(1);
    reject(new Error('message'));
   },2000);
    


});

p.then(result => console.log(result)).catch(err => console.log('Error: ',err));
