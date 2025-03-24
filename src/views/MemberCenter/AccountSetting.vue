<style scoped>
@import "../../Assets/css/main.css";

/* =====右側內容區===== */
.inform-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.inform-header .title{
  font-family: "Aleo";
  font-size: 24px;
  font-weight: bold;
  color: #153243;

}

.form-container {
  width: 100%;
}

.name, .phone-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 24px;
}

.form-group {
  flex: 1; /* 讓每個表單群組平均分配空間 */
  width: 100%; /* 確保表單群組佔滿分配到的空間 */
  margin-bottom: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group label {
  display: block;
  font-size: 24px;
  color: #2C2E33;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  color: #999999;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  box-sizing: border-box;
}

.divider {
  border: none;
  border-bottom: 2px solid #153243;
  margin: 40px 0;
}

.social-section {
  padding: 0px;
}

.social-section .title {
  font-family: "Aleo";
  font-size: 24px;
  font-weight: bold;
  color: #153243;
  margin-bottom: 28px;
}

.social-description{
  font-family:"Fanwood Text";
  font-size: 24px;
  line-height: 1.6; 
}

.social-grid {
  display: flex;
  gap: 54px;
  padding: 0px;
  margin-top: 25px;
  justify-content: center;
}

.social-card {
  height: 350px;
  width: 260px;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 26px 0;
  text-align: center;
  border: 1px solid #153243;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.social-card-title{
  font-family:"Fanwood Text";
  font-size: 26px;
  line-height: 1.5;
}

.social-card button.btnKey-L {
  margin: 0 auto;   /* 水平置中 */
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-card .btnKey-L {
  margin: 0 auto;   /* 水平置中 */
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-status{
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon {
  width: 24px;
  height: 24px;
}

.status-text {
  margin-left: 20px;
  font-size: 16px;
  font-family: "Fanwood Text";
}

.status-text.unlinked {
  color: #888888;
}

.status-text.linked {
  color: #00873F;
}

.password-section {
  padding: 20px 0;
}

.password-section .title {
  font-family: "Aleo";
  font-size: 24px;
  font-weight: bold;
  color: #153243;
}

.password-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-family: "Fanwood Text", serif;
    font-size: 16px;
    background-color: #fff;

    &::placeholder {
      color: #999;
    }
  }

  .i {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dark-view {
    width: 18px;
    height: 18px;
  }
}

.required {
    color: #EEAD50;
    margin-left: 4px;
}

.input-wrapper .dark-view.closed {
  background-image: url(/src/Assets/img/membercenter/eyeClose.svg);
  width: 80%;
  height: 80%;
  background-size: contain;   /* 改用 contain 確保圖片完整顯示 */
  background-position: center;
  background-repeat: no-repeat;
}

/* 添加錯誤訊息樣式，與您現有的設計相匹配 */
.input-error {
  color: #EEAD50;
  font-size: 14px;
  margin-top: 4px;
  font-family: "Fanwood Text", serif;
}

/* 成功訊息樣式 */
.success-message {
  background-color: rgba(255, 233, 186, 0.1);
  border-left: 4px solid #EEAD50;
  color: #EEAD50;
  padding: 12px;
  margin-bottom: 16px;
  font-family: "Fanwood Text", serif;
  font-size: 16px;
}

/* 錯誤訊息樣式 */
.error-message {
  background-color: rgba(229, 57, 53, 0.1);
  border-left: 4px solid #E53935;
  color: #E53935;
  padding: 12px;
  margin-bottom: 16px;
  font-family: "Fanwood Text", serif;
  font-size: 16px;
}

/* 禁用按鈕樣式 */
.btnKey-L.dark:disabled {
  background-color: #999999;
  cursor: not-allowed;
}
</style>

<template>
          <div class="inform-header">
            <div class="title">PERSONAL INFORMATION</div>
            <div class="btnKey-L dark">
              <p>UPDATE</p>
              <div class="icon-L">
                <div class="white-cross">
                  <div class="cols">
                    <span></span>
                    <span></span>
                  </div>
                  <div class="rows">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <!-- 表單區塊 -->
          <div class="form-container">

          <div class="name">
            <div class="form-group">
              <label class="form-label">Name</label>
              <div class="input-wrapper">
                <input type="text" class="form-input" placeholder="Please enter your name">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Nickname</label>
              <div class="input-wrapper">
                <input type="text" class="form-input" placeholder="Please enter">
              </div>
            </div>
          </div>

          <div class="phone-date">
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <div class="input-wrapper">
                <input type="tel" class="form-input" placeholder="Please enter">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Date of Birth</label>
              <div class="input-wrapper">
                <input type="date" class="form-input" placeholder="Please enter">
              </div>
            </div>
          </div>


            <div class="form-group">
              <label class="form-label">Email</label>
              <div class="input-wrapper">
                <input type="email" class="form-input" placeholder="service@tibame.com">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Address</label>
              <div class="input-wrapper">
                <input type="text" class="form-input" placeholder="Please enter">
              </div>
            </div>
          </div>

          <hr class="divider">

          <!-- 社群登入區塊 -->
          <div class="social-section">
            <div class="title">LOGIN ACCOUNT</div>
            <p class="social-description">
              Linking your social account provides a faster and more convenient login experience, enables
              data synchronization, and ensures your personalized settings are always with you.
              If you no longer wish to link your social account, you can choose to unlink it at any time.
            </p>

            <div class="social-container">
              <div class="social-grid">
                <!-- Google -->
                <div class="social-card">
                  <img :src="google" height="120px" alt="google" />
                  <div class="social-card-title">Google Account</div>
                  <div class="social-status">
                    <img :src="graylight" height="16px" alt="graylight" />
                    <div class="status-text unlinked">Not Linked</div>
                  </div>
                  <button class="btnKey-L dark-border">
                    <p>LINK</p>
                    <div class="icon-L">
                      <div class="dark-cross">
                        <div class="cols">
                          <span></span>
                          <span></span>
                        </div>
                        <div class="rows">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <!-- Facebook -->
                <div class="social-card">
                  <img :src="facebook" height="120px" alt="google" />
                  <div class="social-card-title">Facebook Account</div>
                  <div class="social-status">
                    <img :src="greenlight" height="16px" alt="greenlight" />
                    <div class="status-text linked">Linked</div>
                  </div>
                  <div class="btnKey-L none">
                    <p>UNLINK</p>
                    <div class="icon-L">
                      <div class="gray-cross">
                        <div class="cols">
                          <span></span>
                          <span></span>
                        </div>
                        <div class="rows">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="divider">

          <!-- 密碼區塊 -->
          <div class="password-section">
          <div class="password-header">
            <div class="title">CHANGE PASSWORD</div>
            <button 
              class="btnKey-L dark" 
              @click="handlePasswordChange"
              :disabled="isLoading || !isFormValid"
            >
              <p>{{ isLoading ? 'PROCESSING...' : 'CHANGE' }}</p>
              <div class="icon-L">
                <div class="white-cross">
                  <div class="cols">
                    <span></span>
                    <span></span>
                  </div>
                  <div class="rows">
                    <span></span>
                  </div>
                </div>
              </div>
            </button>
          </div>

    <!-- 成功與錯誤訊息 -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div class="password-form">
      <div class="form-group">
        <label>Old Password <span class="required">*</span></label>
        <div class="input-wrapper">
          <input
            :type="showOldPassword ? 'text' : 'password'"
            placeholder="Please enter"
            class="form-input"
            v-model="oldPassword"
          />
          <div class="i" @click="showOldPassword = !showOldPassword">
            <div class="dark-view" :class="{ closed: showOldPassword }"></div>
          </div>
        </div>
        <div v-if="errors.oldPassword" class="input-error">
          {{ errors.oldPassword }}
        </div>
      </div>

      <div class="form-group">
        <label>New Password <span class="required">*</span></label>
        <div class="input-wrapper">
          <input
            :type="showNewPassword ? 'text' : 'password'"
            placeholder="Please enter"
            class="form-input"
            v-model="newPassword"
            @input="checkPasswordLength"
          />
          <div class="i" @click="showNewPassword = !showNewPassword">
            <div class="dark-view" :class="{ closed: showNewPassword }"></div>
          </div>
        </div>
        <div v-if="errors.newPassword" class="input-error">
          {{ errors.newPassword }}
        </div>
      </div>

      <div class="form-group">
        <label>Confirm Password <span class="required">*</span></label>
        <div class="input-wrapper">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Please enter"
            class="form-input"
            v-model="confirmPassword"
          />
          <div class="i" @click="showConfirmPassword = !showConfirmPassword">
            <div class="dark-view" :class="{ closed: showConfirmPassword }"></div>
          </div>
        </div>
        <div v-if="errors.confirmPassword" class="input-error">
          {{ errors.confirmPassword }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import google from "@/assets/img/membercenter/google.svg";
import facebook from "@/assets/img/membercenter/facebook.svg";
import graylight from "@/assets/img/membercenter/graylight.svg";
import greenlight from "@/assets/img/membercenter/greenlight.svg";

import { ref, reactive, computed, onMounted } from "vue";
import { auth } from "../../firebase/firebaseConfig";

import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged
} from "firebase/auth";

// 密碼欄位
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// 密碼可見性
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// 處理狀態
const isLoading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const currentUser = ref(null);

// 表單錯誤
const errors = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});

// 檢查密碼長度
const checkPasswordLength = () => {
  if (newPassword.value.trim() !== "" && newPassword.value.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  } else {
    errors.newPassword = "";
  }
};

// 檢查密碼是否匹配
const checkPasswordMatch = () => {
  if (confirmPassword.value.trim() !== "" && newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = "Passwords do not match";
  } else {
    errors.confirmPassword = "";
  }
};



// 驗證表單
const validateForm = () => {
  let isValid = true;
  
  // 重置錯誤訊息
  errors.oldPassword = "";
  errors.newPassword = "";
  errors.confirmPassword = "";
  errorMessage.value = "";
  
  // 驗證舊密碼
  if (!oldPassword.value.trim()) {
    errors.oldPassword = "Please enter your old password";
    isValid = false;
  }
  
  // 驗證新密碼
  if (!newPassword.value.trim()) {
    errors.newPassword = "Please enter a new password";
    isValid = false;
  } else if (newPassword.value.length < 6) {
    errors.newPassword = "Password must be at least 8 characters";
    isValid = false;
  }
  
  // 驗證確認密碼
  if (!confirmPassword.value.trim()) {
    errors.confirmPassword = "Please confirm your new password";
    isValid = false;
  } else if (newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }
  
  return isValid;
};

// 計算表單是否有效
const isFormValid = computed(() => {
  return (
    oldPassword.value.trim() !== "" &&
    newPassword.value.trim() !== "" &&
    confirmPassword.value.trim() !== "" &&
    newPassword.value === confirmPassword.value &&
    newPassword.value.length >= 6
  );
});

// 處理密碼變更
const handlePasswordChange = async () => {
  // 驗證表單
  if (!validateForm()) return;
  
  // 檢查是否有用戶登入
  if (!currentUser.value) {
    errorMessage.value = "You need to be logged in to change your password";
    return;
  }
  
  // 檢查登入方式
  const providerId = currentUser.value.providerData[0]?.providerId;
  if (providerId === 'google.com' || providerId === 'facebook.com') {
    errorMessage.value = `You are signed in with ${providerId.replace('.com', '')}. Please change your password through their service.`;
    return;
  }
  
  isLoading.value = true;
  successMessage.value = "";
  errorMessage.value = "";
  
  try {
    // 創建憑證
    const credential = EmailAuthProvider.credential(
      currentUser.value.email,
      oldPassword.value
    );
    
    // 重新驗證
    await reauthenticateWithCredential(currentUser.value, credential);
    
    // 更新密碼
    await updatePassword(currentUser.value, newPassword.value);
    
    // 成功訊息
    successMessage.value = "Your password has been updated successfully";
    
    // 清空表單
    oldPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    
  } catch (error) {
    console.error("Error changing password:", error.code, error.message);
    
    // 處理特定錯誤
    switch (error.code) {
      case "auth/wrong-password":
        errors.oldPassword = "The password is incorrect";
        break;
      case "auth/weak-password":
        errors.newPassword = "Password should be at least 6 characters";
        break;
      case "auth/requires-recent-login":
        errorMessage.value = "For security reasons, please log out and log back in before changing your password";
        break;
      case "auth/invalid-credential":
        errors.oldPassword = "The old password is incorrect";
        break;
      case "auth/too-many-requests":
        errorMessage.value = "Too many unsuccessful attempts. Please try again later.";
        break;
      case "auth/network-request-failed":
        errorMessage.value = "Network error. Please check your internet connection.";
        break;
      default:
        // 清理錯誤訊息，使其更友好
        let cleanErrorMessage = error.message || "An error occurred";
        // 移除 Firebase 前綴
        cleanErrorMessage = cleanErrorMessage.replace("Firebase: ", "");
        // 移除錯誤代碼
        cleanErrorMessage = cleanErrorMessage.replace(/\(auth\/.*\)/, "");
        
        errorMessage.value = cleanErrorMessage;
    }
  } finally {
    isLoading.value = false;
  }
};

// 監聽登入狀態
onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    
    // 如果用戶沒有登入，重置表單
    if (!user) {
      oldPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      successMessage.value = "";
      errorMessage.value = "You must be logged in to change your password";
    }
  });
  
  // 組件卸載時取消監聽
  return () => unsubscribe();
});
</script>