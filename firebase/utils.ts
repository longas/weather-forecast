import * as admin from "firebase-admin";

export function getFirestore() {
  // Check if the firebase app has been already initialized
  // this is needed for some serverless function enviroments
  // and in the dev mode due to hot-reloading.

  if (admin.apps.length === 0) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    } catch (e) {
      console.log(e);
      process.exit(0);
    }
  }

  return admin.firestore();
}
