import uuidV4 from 'uuid/v4';
//import bcrypt from 'bcrypt'

let urlStart;
__DEV__ ? urlStart="http://127.0.0.1:3000" : urlStart="";

export function getUserState(id){
    return new Promise((resolve, reject) => {
        const url = urlStart+'/getUserState/'+id;
        fetch(url, {method: 'get'})
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success === false){
                    resolve("Failed");
                }else{
                    console.log("Resolving: "+responseJson.res);
                    resolve(responseJson.res);
                }
            })
            .catch((err) => {
                console.log(err);
                resolve("Failed")
            })
    })
}

export function signOut(id, roomId){
    return new Promise((resolve, reject) => {
        const url = urlStart+'/signOut/'+id+'/'+roomId;
        fetch(url, {method: 'get'})
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);
                if(responseJson.success === false){
                    console.log("Resolving False");
                    resolve(false);
                }else{
                    console.log("Resolving True");
                    resolve(true);
                }
            })
            .catch((error) => {
                console.error(error);
                resolve(false);
            });
    })
}

export function signIn(id, roomId){
    return new Promise((resolve, reject) => {
        const url = urlStart+'/signIn/'+id+'/'+roomId;
        fetch(url, {method: 'get'})
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);
                if(responseJson.success === "false"){
                    resolve(false);
                }else{
                    resolve(true);
                }

            })
            .catch((error) => {
                console.error(error);
                resolve(false);
            });
    })
}

export function handleLogIn(id, name){
  return new Promise((resolve, reject) => {
    const url = urlStart+"/handleSignIn/"+id+"/"+name;
    fetch(url, {method: 'get'})
      .then((response) => response.json())
      .then((responseJSON) => {
        if(responseJSON.success === "false"){
          reject(false);
        }else{
          resolve(responseJSON.results);
        }
      })
      .catch((err) => {
        reject(err)
      })
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