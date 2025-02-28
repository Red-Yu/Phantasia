<template>
  <div>
    <h1>登入</h1>

    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Your email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button>登入</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/");
  } catch (why) {
    error.value = `登入失敗: ${why.message}`;
  }
};
</script>

<style scoped>
h1 {
  color: darkgoldenrod;
}
</style>
