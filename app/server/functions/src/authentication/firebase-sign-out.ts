import firebase from "firebase";

export default (): Promise<void> => firebase.auth().signOut();
