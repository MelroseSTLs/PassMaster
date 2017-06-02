import uuidV4 from 'uuid/v4';
//import bcrypt from 'bcrypt'

let urlStart;
__DEV__ ? urlStart="http://127.0.0.1:8082" : urlStart="";

export function test2(){
  const url = urlStart+"/test";
  fetch(url, {method: 'get'})
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function signOut(id, roomId){
  return new Promise((reject, resolve) => {
    const url = urlStart+'/signOut/'+id+'/'+roomId;
    fetch(url, {method: 'get'})
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        resolve(responseJson);

      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  })
}

export function signIn(id, roomId){
  return new Promise((reject, resolve) => {
    const url = urlStart+'/signIn/'+id+'/'+roomId;
    fetch(url, {method: 'get'})
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        resolve(responseJson);

      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  })
}

export function checkPass(id){
  return new Promise((reject, resolve) => {
    const url = urlStart+'/checkPass/:id';
    fetch(url, {method: 'get'})
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        resolve(responseJson);

      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  })
}

/*export function insertUser(name, pass){
 const uuid = uuidV4();

 bcrypt.genSalt(10, function(err, salt) {
 if (err)
 throw err;

 bcrypt.hash(pass, salt, function(err, hash) {
 if(err) throw err;
 fetch('http://127.0.0.1:8082/addUser/'+name+'/'+hash+'/'+uuid)
 });
 });
 }

 export function checkPass(name, pass){

 }*/