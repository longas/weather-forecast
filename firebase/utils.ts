import * as admin from "firebase-admin";

export function getFirestore() {
  // Check if the firebase app has been already initialized
  // this is needed for some serverless function enviroments
  // and in the dev mode due to hot-reloading.
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: "https://adidas-6179b.firebaseio.com",
    });
  }

  return admin.firestore();
}
