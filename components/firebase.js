// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_KxPexE7agu-CQCJtqwLdy3bQQI3LtL4",
  authDomain: "apollodb-213c1.firebaseapp.com",
  databaseURL: "https://apollodb-213c1-default-rtdb.firebaseio.com",
  projectId: "apollodb-213c1",
  storageBucket: "apollodb-213c1.appspot.com",
  messagingSenderId: "136448913400",
  appId: "1:136448913400:web:ffd6688513af93ae42300d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getDatabase(app);