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

          <p class="gotoSingup">
            Don't have an account?
            <a class="signup" href="#" @click.prevent="openSignup"
              >Sign up here.</a
            >
          </p>

          <div class="or">
            <p>OR</p>
          </div>

          <div class="outsideContect">
            <a href="#">
              <img src="../../Assets/img/membercenter/facebook.svg" alt="FB" />
            </a>
            <a href="#">
              <img
                src="../../Assets/img/membercenter/google.svg"
                alt="Google"
              />
            </a>
          </div>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

// 用於控制光箱顯示與隱藏
// const isVisible = ref(true);

// 定義 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },

  startVideoElement: {
    type: Object, // 父組件傳遞的是影片元素的引用
    required: true,
  },
});

// 定義 emit 事件
const emit = defineEmits(["close", "openSignup", "login-success"]);

const email = ref("");
const password = ref("");
const error = ref("");

// 關閉彈窗
const closeModal = () => {
  emit("close");

  // 清空表單數據
  email.value = "";
  password.value = "";
  error.value = "";
};

// 切換到註冊彈窗
const openSignup = () => {
  emit("openSignup"); // 父組件中的 openSignup 會被觸發
  // 清空表單數據
  email.value = "";
  password.value = "";
  error.value = "";
};

// 登入功能
const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Login Successful!");

    // 清空表單數據
    email.value = "";
    password.value = "";
    error.value = "";

    // 切換到登入選單
    emit("close");

    // 發出登入成功事件
    emit("login-success"); // 父組件將接收到這個事件，並將 isStart 設為 false

    // 播放影片
    if (props.startVideoElement) {
      props.startVideoElement.play(); // 在登入成功後播放影片
    }
  } catch (err) {
    error.value = `Login failed: ${err.message}`;
  }
};
</script>
