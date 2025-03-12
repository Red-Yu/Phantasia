<template>
  
    <div class="modal-overlay" v-if="isVisible" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="bgc"></div>
        <!-- mainContent -->
          <div class="lightbox-content">
            <h1>Login</h1>

            <form @submit.prevent="login">
              <label for="email">E-Mail</label>
              <input 
                type="email" 
                v-model="email" 
                placeholder="Please enter your e-mail." 
                required 
              />

              <label for="password">Password</label>
              <input
                type="password"
                v-model="password"
                placeholder="Please enter your password."
                required
              />
              <div class="btn">
                <button type="submit" class="btnKey-L dark">Submit</button>
              </div>

              <p class="gotoSingup">Don't have an account? 
              <router-link to="/Signup">Sign up here.</router-link>
              </p>

              <div class="or">
                <p>OR</p>
              </div>

              <div class="outsideContect">
                  <a href="#">
                      <img src="../../Assets/img/membercenter/facebook.svg" alt="FB">
                  </a>
                  <a href="#">
                      <img src="../../Assets/img/membercenter/google.svg" alt="Google">
                  </a>
              </div>            
            </form>

            <p v-if="error">{{ error }}</p>
          </div>
      </div>
    </div>
</template>

<style scoped>
@import "../../Assets/css/main.css";
@import "../../Assets/css/loginSignup.css";
</style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

// 用於控制光箱顯示與隱藏
const isVisible = ref(true); 

// 關閉光箱
const closeModal = () => {
  isVisible.value = false; 
};
// 定義 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});



// // 監聽來自父組件的 props 變化，當父組件傳遞 isVisible = true 時顯示光箱
// const props = defineProps({
//   isVisible: Boolean,
// });

// watch(() => props.isVisible, (newValue) => {
//   isVisible.value = newValue; // 根據父組件傳遞的值來控制光箱顯示與否
// });

// 登入功能
const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // 登入成功後關閉光箱
    isVisible.value = false;
    alert('Login Successful!');
  } catch (err) {
    error.value = `Login failed: ${err.message}`;
  }
};
</script>