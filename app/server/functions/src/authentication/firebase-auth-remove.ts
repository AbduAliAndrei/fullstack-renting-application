import admin from "firebase-admin";

export default async ({uid}: {uid: string}): Promise<void> => {
  return admin
      .auth()
      .deleteUser(uid);
};
