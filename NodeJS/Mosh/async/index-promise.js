console.log('Before');
getUser(1)
    .then(user => getRepos(user.gitUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits',commits))
    .catch(err => console.log('Error1:',err));

///Async/Await approach
async function displayCommits() {
    try{
        const user = await getUser(1);
        const repo = await getRepos(user.gitUsername);
        const commit = await getCommits(repo[0]);
        console.log(commit);
    }
    catch(err)
    {
        console.log('Error2: ',err.nessage);
    }
    
};

displayCommits();


console.log('After');

function getUser(id) {
    return new Promise( (resolve,reject) => {
        setTimeout( ()=> {
            console.log('Reading database...');
            resolve({id:id,gitUsername:'Chris'});
        },2000);
    });
};

function getRepos(username) {
    return new Promise( (resolve,reject) => {
        setTimeout(()=>{
            console.log('Fetching Repos...');
            resolve(['rep1','rep2','rep3']);
        },200);
    });
}

function getCommits(repo) {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log('Calling API...');
            resolve(['commits1']);
        },2000);
    });
}