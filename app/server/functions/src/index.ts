// The Cloud Functions for Firebase SDK
// to create Cloud Functions and setup triggers.
import admin from "firebase-admin";
import serviceAccount from "./service-account.json";
import {ServiceAccount} from "firebase-admin/lib/credential";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const db = admin.firestore();

export default db;
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
