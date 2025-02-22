// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP98ISCKTvuhJZWlki-c8uwwAQgLtoTdA",
  authDomain: "phantasia-841b4.firebaseapp.com",
  databaseURL: "https://phantasia-841b4-default-rtdb.firebaseio.com",
  projectId: "phantasia-841b4",
  storageBucket: "phantasia-841b4.firebasestorage.app",
  messagingSenderId: "112868496467",
  appId: "1:112868496467:web:fa567acb6ca56cfc5d22a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const firebaseServices = {
  database,
  dbRef: ref, //ref 重新賦值為 dbRef
  push,
  onValue,
  remove,
};

export default firebaseServices;

//使用方法請參照以下.vue檔
//src>views>test>firebaseDatabaseTest.vue
//網址: http://localhost:5174/tid201/g1/firebaseToDo
