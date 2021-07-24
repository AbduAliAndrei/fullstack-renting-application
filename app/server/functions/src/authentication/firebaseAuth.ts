import firebase from "firebase";

const firebaseAuth =
    async ({email, password}: {email: string, password: string}):
        Promise<string> => {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const auth = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
      const idToken = await auth.user?.getIdToken();
      if (!idToken) {
        throw new Error("IdToken  is undefined");
      }

      return idToken;
    };


export default firebaseAuth;
