import firebase from "firebase";

const firebaseAuth =
    async ({email, password}: {email: string, password: string}):
        Promise<{idToken: string, uid: string}> => {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const auth = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
      const idToken = await auth.user?.getIdToken();
      const uid = auth.user?.uid;
      if (!idToken || !uid) {
        throw new Error("IdToken  is undefined");
      }

      return {idToken, uid};
    };


export default firebaseAuth;
