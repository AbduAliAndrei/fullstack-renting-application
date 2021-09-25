import firebase from "firebase";

const firebaseLogin =
    async ({email, password}: {email: string, password: string})
        : Promise<{idToken: string, uid: string}> => {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const auth = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
      const uid = auth.user?.uid;
      const idToken = await auth.user?.getIdToken();
      if (!idToken || !uid) {
        throw new Error("IdToken or uid of user  is undefined");
      }
      return {idToken, uid};
    };


export default firebaseLogin;
