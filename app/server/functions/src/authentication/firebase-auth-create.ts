import admin from "firebase-admin";

export default async ({idToken, expire}:
{idToken: string, expire: number}): Promise<string> =>
  admin
      .auth()
      .createSessionCookie(idToken, {expiresIn: expire});
