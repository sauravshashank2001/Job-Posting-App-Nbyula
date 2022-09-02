import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9lBUIRDaXyNzmF-eKYmxjiK9jCT_AnHc",
    authDomain: "findin-846ce.firebaseapp.com",
    projectId: "findin-846ce",
    storageBucket: "findin-846ce.appspot.com",
    messagingSenderId: "675107563562",
    appId: "1:675107563562:web:b0d925d4461d52fe703b53"
  };

  const firebase=app.initializeApp(firebaseConfig);
  const firestore=firebase.firestore();
  const auth=firebase.auth();

  export {firebase, firestore, app, auth}
