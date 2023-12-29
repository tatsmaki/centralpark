import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.API_KEY,
  appId: import.meta.env.APP_ID,
  authDomain: "centralpark-dd0ba.firebaseapp.com",
  projectId: "centralpark-dd0ba",
  storageBucket: "centralpark-dd0ba.appspot.com",
  messagingSenderId: "239594000998",
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
