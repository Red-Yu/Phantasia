<template>
   <!-- <div class="modal-overlay" > -->
    <div class="modal-overlay" v-if="isVisible" @click="closeModal">
   
      <div class="modal-content" @click.stop>
        <div class="bgc"></div>
          <!-- mainContent -->
          <div class="lightbox-content">

            <h1>Sign Up</h1>

            <form @submit.prevent="signup">
              <label for="username">Name</label>
              <input type="text" v-model="name"  placeholder="Please enter your name." required>

              <label for="email">E-Mail</label>
              <input type="email" v-model="email" placeholder="Please enter your e-mail." required />
              
              <label for="password">Password</label>
              <input
                type="password"
                v-model="password"
                placeholder="Password should be at least 6 characters."
                required
              />

              <label for="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="Please enter your password again.">

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

              <div class="btn">
                <button type="submit" class="btnKey-L dark">Submit</button>
              </div>

              <!-- <p>By clicking "Submit", you agree to our <a href="#">Terms of service</a> and our <a href="#">Privacy Policy</a>.</p>

              <div class="or">
                <p>OR</p>
              </div> -->

              <p class="gotoLogin">Already have an account? 
              <router-link to="/login">Click here to log in.</router-link>
              </p>
              

            </form>


            <!-- <p v-if="error">{{ error }}</p> -->
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
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const confirmPassword = ref('');
// const error = ref("");
const router = useRouter("");

const errorMessage = ref('');

// const signup = async () => {
//   try {
//     await createUserWithEmailAndPassword(auth, email.value, password.value);
//     router.push("/success");
//   } catch (why) {
//     error.value = `註冊失敗: ${why.message}`;
//   }
// };

// 處理提交表單的函數
const signup = async ()  => {
  if (password.value !== confirmPassword.value) {
    // 密碼不匹配時顯示錯誤消息
    errorMessage.value = 'Password does not match.';
    return; // 如果密碼不匹配，則停止進行註冊
  } 

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    // 註冊成功後顯示提示
    alert('Registration Successful!');
    
    // 清空表單
    // email.value = '';
    // password.value = '';
    // confirmPassword.value = '';
    
    // 跳轉到登入頁面
    router.push('/login');  

  } catch (error) {
    // 處理 Firebase 錯誤
    errorMessage.value = `Error: ${error.message}`;
  }  
};

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
</script>


