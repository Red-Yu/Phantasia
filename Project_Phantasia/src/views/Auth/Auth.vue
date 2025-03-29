<template>
  <div>
    <div v-if="user">
      <p>Welcome, Peter</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login with Google</button>
      <button @click="register">Register with Email</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth } from "../../firebase/firebaseConfig";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const user = ref(null);

// Login with Google
const login = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth.provider);
  } catch (error) {
    console.log(`Message: ${error.message}`);
  }
};

// Register with Email
const register = async () => {
  let email = prompt(`Enter your email: `);
  let password = prompt(`Enter your password: `);

  await createUserWithEmailAndPassword(email, password);
};

// Logout
const logout = async () => {
  await signOut(auth);
};

// 監聽登入狀態
onMounted(() => {
  onAuthStateChanged(auth, (currrentUser) => {
    user.value = currrentUser;
  });
});
</script>
