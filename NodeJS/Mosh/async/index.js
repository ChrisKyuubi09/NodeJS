console.log('Before');
getUser(1, (user) => {
    console.log('UserInfo: ',user);
    ///getRepo
    getRepo(user.gitUser,(repo)=>{
        console.log('Repos: ',repo);
    });
});



console.log('After');

//Callback
function getUser(id,callback) {
    setTimeout( ()=>{
        console.log('Reading from database...');
        callback({ id:id,gitUser:'Chris'});
    },2000 );
};

function getRepo(username,callback) {
    setTimeout(()=>{
        console.log('Fetching Repos...');
        callback(['repo1','repo2','repo3']);
    },2000);
};