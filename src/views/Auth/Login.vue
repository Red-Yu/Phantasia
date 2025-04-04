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
              class="logInToggleVisibility"
              @click="togglePasswordVisibility"
            >
              <div class="dark-view" :class="{ closed: showPassword }"></div>
            </div>
          </div>
          <!-- <p v-if="error" class="error-message">{{ error }}</p> -->
          <p
            :class="['error-message', { visible: errorMessage }]"
            v-text="errorMessage"
          ></p>

          <div class="btn">
            <button type="submit" class="btnKey-M dark">Submit</button>
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
            <a href="#" @click.prevent="showComingSoon">
              <img
                src="../../Assets/img/membercenter/facebook.svg"
                alt="FB"
                class="fb"
              />
            </a>
            <a
              href="#"
              @click.prevent="loginWithGoogle"
              class="google-login-btn google"
            >
              <img
                src="../../Assets/img/membercenter/google.svg"
                alt="Google"
              />
            </a>
          </div>
        </form>

        <!-- 彈出的Coming Soon訊息 -->
        <div v-if="isComingSoonVisible" class="coming-soon-message">
          Coming Soon...
        </div>
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

.coming-soon-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(21, 50, 67, 0.85);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.google-login-btn {
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: 1;
}

.google-login-btn:hover {
  transform: scale(1.05);
}

.google-login-btn:active {
  transform: scale(0.95);
}

.error-message {
  color: #e53935;
  margin-top: 10px;
  /* text-align: center; */
}
</style>

<script setup>
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import SuccessModal from "../Auth/LoginSuccess.vue";

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

// 定義狀態
const email = ref("");
const password = ref("");
const error = ref("");
const errorMessage = ref("");
const isSuccessModalVisible = ref(false);
const isComingSoonVisible = ref(false);

const showPassword = ref(false);

// 切換顯示密碼
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

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
  errorMessage.value = "";
};

// 顯示Coming Soon訊息
const showComingSoon = () => {
  isComingSoonVisible.value = true;
  // 2秒後自動隱藏
  setTimeout(() => {
    isComingSoonVisible.value = false;
  }, 2000);
};

// 處理登入成功的函數
const handleLoginSuccess = (user) => {
  // 顯示成功提示語光箱
  isSuccessModalVisible.value = true;

  // 設置定時器，2秒後開始淡出
  setTimeout(() => {
    const modal = document.querySelector(".success-modal");
    if (modal) {
      modal.classList.add("fade-out");
      setTimeout(() => {
        isSuccessModalVisible.value = false;
      }, 1000); // 配合CSS過渡時間
    }
  }, 2000); // 2秒後開始淡出

  // 清空表單數據
  email.value = "";
  password.value = "";
  error.value = "";
  errorMessage.value = "";

  // 切換到登入選單
  emit("close");

  // 發出登入成功事件
  emit("login-success");

  // 播放影片
  if (props.startVideoElement) {
    props.startVideoElement.play();
  }
};

// 宏育修改，確保抓取時間一致
const registrationDate = new Date();
const year = registrationDate.getFullYear();
const month = (registrationDate.getMonth() + 1).toString().padStart(2, "0"); // 確保月份是兩位數
const day = registrationDate.getDate().toString().padStart(2, "0"); // 確保日期是兩位數
const formattedDate = `${year}-${month}-${day}`; // 格式化為 YYYY-MM-DD
// =======

// 寫入用戶資料到數據庫
const saveUserToDatabase = async (user) => {
  try {
    const { email, uid, displayName } = user;

    // 檢查用戶是否已存在於資料庫
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      // 用戶不存在，創建新用戶資料
      await setDoc(userDocRef, {
        email: email,
        name: displayName || "未設置名稱",
        birthday: "", // 預設空值
        // 宏育修改，確保抓取時間一致
        registrationDate: formattedDate, // 使用格式化日期字符串
        // =======
        // registrationDate: serverTimestamp(), // 使用服務器時間戳
      });
      console.log("新用戶已創建：", email);
    } else {
      // 用戶已存在，更新登入資訊
      await setDoc(
        userDocRef,
        {
          email: email,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      ); // 使用merge確保只更新指定欄位
      console.log("用戶已存在，登入信息已更新：", email);
    }
  } catch (dbError) {
    console.error("保存用戶數據時出錯：", dbError);
    // 我們不想因為數據庫錯誤而中斷登入流程，所以只記錄錯誤
  }
};

// 郵箱密碼登入功能
const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    // 保存用戶資料到數據庫
    await saveUserToDatabase(user);

    // 處理登入成功
    handleLoginSuccess(user);
  } catch (err) {
    errorMessage.value = `Incorrect email or password.`;
  }
};

// Google登入功能
const loginWithGoogle = async () => {
  try {
    console.log("開始Google登入程序");
    const provider = new GoogleAuthProvider();
    // 添加登入範圍，獲取用戶的個人資料信息
    provider.addScope("profile");
    provider.addScope("email");
    // 設置登入參數
    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 移除用戶頭像 URL (不影響資料庫，只影響當前會話)
    try {
      await updateProfile(user, {
        photoURL: null,
      });
      console.log("已移除用戶頭像顯示");
    } catch (profileError) {
      console.error("無法更新用戶檔案:", profileError);
    }

    // 保存用戶資料到數據庫
    await saveUserToDatabase(user);

    // 處理登入成功
    handleLoginSuccess(user);
  } catch (err) {
    // 處理錯誤
    errorMessage.value = `Google login failed: ${err.message}`;
    console.error("Google登入錯誤:", err);
  }
};
</script>
