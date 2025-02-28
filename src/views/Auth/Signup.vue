<template>
  <div>
    <h1>註冊</h1>

    <form @submit.prevent="signup">
      <input type="email" v-model="email" placeholder="Your email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button>註冊</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter("");

const signup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/success");
  } catch (why) {
    error.value = `註冊失敗: ${why.message}`;
  }
};
</script>

<style scoped>
h1 {
  color: rgb(11, 66, 184);
}
</style>
