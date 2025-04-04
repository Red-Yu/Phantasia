<template>
  <!-- <div class="modal-overlay" > -->
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content signUp" @click.stop>
      <div class="bgc"></div>
      <!-- mainContent -->
      <div class="lightbox-content">
        <h1>Sign Up</h1>

        <form @submit.prevent="signup">
          <label for="email">E-Mail</label>
          <input
            type="email"
            v-model="email"
            placeholder="Please enter your e-mail."
            class="form-input"
            required
          />

          <label for="password">Password</label>
          <div class="input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Please enter your password."
              class="form-input"
              required
            />
            <div
              class="signUpToggleVisibility"
              @click="togglePasswordVisibility"
            >
              <div class="dark-view" :class="{ closed: showPassword }"></div>
            </div>
          </div>
          <label for="confirmPassword">Confirm Password</label>
          <div class="input-wrapper">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Please enter your password again."
              class="form-input"
            />
            <div
              class="signUpConfimToggleVisibility"
              @click="toggleConfirmPasswordVisibility"
            >
              <div
                class="dark-view"
                :class="{ closed: showConfirmPassword }"
              ></div>
            </div>
          </div>

          <label for="username">Name</label>
          <input
            type="text"
            v-model="name"
            placeholder="Please enter your name."
            class="form-input"
            required
          />

          <label for="birthday">Birthday</label>
          <input
            type="date"
            v-model="birthday"
            placeholder="Please enter your birthday."
            class="form-input"
            required
          />

          <p
            :class="['error-message', { visible: errorMessage }]"
            v-text="errorMessage"
          ></p>

          <!-- <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> -->

          <div class="btn">
            <button type="submit" class="btnKey-M dark">Submit</button>
          </div>

          <!-- <p>By clicking "Submit", you agree to our <a href="#">Terms of service</a> and our <a href="#">Privacy Policy</a>.</p>

              <div class="or">
                <p>OR</p>
              </div> -->

          <p class="gotoLogin">
            Already have an account?
            <a class="signup" href="#" @click.prevent="openLogin"
              >Click here to log in.</a
            >
          </p>
        </form>

        <!-- <p v-if="error">{{ error }}</p> -->
      </div>
    </div>
  </div>
  <SuccessModal
    v-if="isSuccessModalVisible"
    class="success-modal"
    :isVisible="isSuccessModalVisible"
    @close="isSuccessModalVisible = false"
  />
</template>

<style scoped>
@import "../../Assets/css/main.css";
@import "../../Assets/css/loginSignup.css";
</style>

<script setup>
import { ref } from "vue";
import { db, auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import SuccessModal from "../Auth/signupSuccess.vue";

const name = ref("");
const birthday = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const isSuccessModalVisible = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 切換顯示密碼
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// const signup = async () => {
//   try {
//     await createUserWithEmailAndPassword(auth, email.value, password.value);
//     router.push("/success");
//   } catch (why) {
//     error.value = `註冊失敗: ${why.message}`;
//   }
// };

// 處理提交表單的函數
const signup = async () => {
  if (password.value !== confirmPassword.value) {
    // 密碼不匹配時顯示錯誤消息
    errorMessage.value = "Password does not match.";
    return; // 如果密碼不匹配，則停止進行註冊
  }

  try {
    // 使用 Firebase Authentication 創建用戶帳號
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    // 獲取當前註冊時間並格式化為 YYYY-MM-DD
    const registrationDate = new Date();
    const year = registrationDate.getFullYear();
    const month = (registrationDate.getMonth() + 1).toString().padStart(2, "0"); // 確保月份是兩位數
    const day = registrationDate.getDate().toString().padStart(2, "0"); // 確保日期是兩位數
    const formattedDate = `${year}-${month}-${day}`; // 格式化為 YYYY-MM-DD

    // 使用返回的 uid 儲存額外的用戶資料到 Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name.value,
      birthday: birthday.value,
      email: email.value,
      registrationDate: formattedDate,
      // 你可以在這裡儲存更多的資料
    });

    // 註冊成功後顯示提示
    // alert("Registration Successful!");
    isSuccessModalVisible.value = true;
    console.log("isSuccessModalVisible:", isSuccessModalVisible.value);

    //
    // 設置定時器，關閉成功彈窗
    setTimeout(() => {
      const modal = document.querySelector(".success-modal");
      if (modal) {
        modal.classList.add("fade-out");
        setTimeout(() => {
          isSuccessModalVisible.value = false;
        }, 1000);
      }
    }, 2000);

    // 設置定時器，3秒後切換到登入選單
    setTimeout(() => {
      // 清空表單數據
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      errorMessage.value = "";
      name.value = "";
      birthday.value = "";

      // 切換到登入選單
      emit("openLogin");
    }, 1000);
  } catch (error) {
    // 處理 Firebase 錯誤
    errorMessage.value = `Error: ${error.message}`;
  }
};

// 定義 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

// 定義 emit 事件
const emit = defineEmits(["close", "openLogin"]);

// 切換回登入彈窗
const openLogin = () => {
  emit("openLogin");

  // 清空表單數據
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  errorMessage.value = "";
  name.value = "";
  birthday.value = "";
};

// 關閉彈窗的方法
const closeModal = () => {
  emit("close");

  // 清空表單數據
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  errorMessage.value = "";
  name.value = "";
  birthday.value = "";
};

// // 用於控制光箱顯示與隱藏
// const isVisible = ref(true);

// // 關閉光箱
// const closeModal = () => {
//   isVisible.value = false;
// };
// // 定義 props
// const props = defineProps({
//   isVisible: {
//     type: Boolean,
//     required: true,
//   },
// });
</script>
