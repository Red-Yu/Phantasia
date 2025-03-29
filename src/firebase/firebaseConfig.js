// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 監聽所有使用者的 auth 狀態變化
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("使用者已登入:", user.email);
    
    // 方法1: 嘗試更新使用者的 profile，將頭像設為 null
    try {
      await updateProfile(user, {
        photoURL: null
      });
      console.log("已移除使用者頭像顯示");
    } catch (error) {
      console.error("無法更新使用者的頭像:", error);
    }
    
    // 方法2: 覆蓋 photoURL 屬性 (更徹底的方法)
    try {
      Object.defineProperty(user, 'photoURL', {
        get: function() {
          return null;
        },
        configurable: true
      });
      console.log("已覆蓋 photoURL 屬性");
    } catch (error) {
      console.error("無法覆蓋 photoURL 屬性:", error);
    }
  }
});

const firebaseServices = {
  database,
  dbRef: ref, //ref 重新賦值為 dbRef
  push,
  onValue,
  remove,
};

console.log("Firebase Initialized:", app);

export default firebaseServices;
export { auth, db, storage };

//使用方法請參照以下.vue檔
//src>views>test>firebaseDatabaseTest.vue
//網址: http://localhost:5174/tid201/g1/firebaseToDo