const root = 'http://jsonplaceholder.typicode.com/';

let uri = root + 'posts';

let formdata = new FormData();
formdata.append("id", 3);
formdata.append('title','This is my title');
formdata.append('year','This is the year');
formdata.append('runtime','This is the runtime');
formdata.append('genres','This is the category');
formdata.append('director','This is the director');
formdata.append('actors','This is the actors');
formdata.append('plot','This is the description');
formdata.append('posterUrl','This is the image');



let options = {
    method: 'POST',
    mode: 'cors',
    body: formdata
}
let req = new Request(uri, options);
fetch(req)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad HTTP!')
        }
    })
    .then( (j) =>{
        console.log(j);
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });

fetch("film.json").then(function(response){
    console.log(response);
    return response.json();
}).then(user => {
    console.log(user);
}).catch((error) => {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});



