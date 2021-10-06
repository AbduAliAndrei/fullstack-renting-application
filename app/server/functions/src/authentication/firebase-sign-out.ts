import firebase from "firebase";


const firebaseSignOut = (): Promise<boolean> =>
  firebase.auth().signOut().then(() => {
    return true;
  }).catch((error) => {
    console.log(error);
    throw new Error(`Sign out error: ${error}`);
  });


export default firebaseSignOut;
