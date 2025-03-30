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
    <div class="btnKey-L dark" @click="handleUpdate" :disabled="isUpdating">
      <p>{{ isUpdating ? 'UPDATING...' : 'UPDATE' }}</p>
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

  <!-- 顯示更新結果的訊息 -->
  <div v-if="updateMessage.show" :class="updateMessage.isError ? 'error-message' : 'success-message'">
    {{ updateMessage.text }}
  </div>
        
  <!-- 表單區塊 -->
  <div class="form-container">
    <div class="name">
      <div class="form-group">
        <label class="form-label">Name</label>
        <div class="input-wrapper">
          <input type="text" class="form-input" placeholder="Please enter your name" v-model="userInfo.name">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Nickname <span class="new-field">*</span></label>
        <div class="input-wrapper">
          <input type="text" class="form-input" placeholder="Please enter" v-model="userInfo.nickname">
        </div>
      </div>
    </div>

    <div class="phone-date">
      <div class="form-group">
        <label class="form-label">Phone Number <span class="new-field">*</span></label>
        <div class="input-wrapper">
          <input type="tel" class="form-input" placeholder="Please enter" v-model="userInfo.phoneNumber">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Date of Birth</label>
        <div class="input-wrapper">
          <input type="date" class="form-input" placeholder="Please enter" v-model="userInfo.birthday">
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-wrapper">
        <input type="email" class="form-input" placeholder="service@tibame.com" v-model="userInfo.email" :disabled="true">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Address <span class="new-field">*</span></label>
      <div class="input-wrapper">
        <input type="text" class="form-input" placeholder="Please enter" v-model="userInfo.address">
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
        :disabled="isLoading || !isFormValid || isGoogleLogin"
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
    
    <!-- Google 登入提示訊息 - 使用成功消息的顏色 -->
    <div v-if="isGoogleLogin" class="success-message">
      You are logged in with Google. Password change is not available for Google accounts.
    </div>

    <!-- 只有非 Google 登入用戶才顯示密碼表單 -->
    <div class="password-form" v-if="!isGoogleLogin">
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
import { db } from "../../firebase/firebaseConfig"; // 確保導入 Firestore
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged
} from "firebase/auth";

// 用戶資訊
const userInfo = reactive({
  name: "",
  nickname: "",
  phoneNumber: "",
  birthday: "",  // 默認為空
  email: "",
  address: "",
  loginMethod: "" // 新增登入方式欄位
});

// 用戶資料更新狀態
const isUpdating = ref(false);
const updateMessage = reactive({
  show: false,
  text: "",
  isError: false
});

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

// 檢查是否為 Google 登入用戶
const isGoogleLogin = computed(() => {
  // 檢查登入提供商
  if (currentUser.value && currentUser.value.providerData && currentUser.value.providerData.length > 0) {
    return currentUser.value.providerData[0]?.providerId === 'google.com';
  }
  
  // 從數據庫中檢查登入方式
  return userInfo.loginMethod === 'google';
});

// 從 Firestore 獲取用戶資料
const fetchUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // 填充用戶資訊
      userInfo.name = userData.name || "";
      userInfo.email = userData.email || "";
      userInfo.birthday = userData.birthday || "";  // 改為空字符串
      
      // 也載入其他可能的欄位，如果存在的話
      userInfo.nickname = userData.nickname || "";
      userInfo.phoneNumber = userData.phoneNumber || "";
      userInfo.address = userData.address || "";
      
      // 獲取登入方式
      userInfo.loginMethod = userData.loginMethod || "";
    } else {
      console.log("沒有找到用戶文檔!");
      userInfo.birthday = "";  // 改為空字符串
    }
  } catch (error) {
    console.error("獲取用戶資料時發生錯誤:", error);
    userInfo.birthday = "";  // 改為空字符串
  }
};

// 更新用戶資料
const handleUpdate = async () => {
  if (!currentUser.value) {
    updateMessage.show = true;
    updateMessage.text = "您需要登入才能更新資料";
    updateMessage.isError = true;
    return;
  }
  
  isUpdating.value = true;
  updateMessage.show = false;
  
  try {
    // 檢查用戶文檔是否存在，如果不存在則創建
    const userDocRef = doc(db, "users", currentUser.value.uid);
    const userSnap = await getDoc(userDocRef);
    
    // 要更新的資料
    const updateData = {
      name: userInfo.name,
      nickname: userInfo.nickname,
      phoneNumber: userInfo.phoneNumber,
      birthday: userInfo.birthday,  // 直接使用用戶輸入的值
      address: userInfo.address,
      // 記錄最後更新時間
      lastUpdated: new Date()
    };
    
    if (!userSnap.exists()) {
      // 如果用戶文檔不存在，則創建一個新文檔
      // 添加創建時間和電子郵件（如果有的話）
      updateData.createdAt = new Date();
      if (currentUser.value.email) {
        updateData.email = currentUser.value.email;
      }
      
      // 檢查並記錄登入方式
      if (currentUser.value.providerData && currentUser.value.providerData.length > 0) {
        const providerId = currentUser.value.providerData[0]?.providerId;
        if (providerId === 'google.com') {
          updateData.loginMethod = 'google';
        } else if (providerId === 'facebook.com') {
          updateData.loginMethod = 'facebook';
        } else {
          updateData.loginMethod = 'email';
        }
      }
      
      // 使用 setDoc 設置新文檔
      await setDoc(userDocRef, updateData);
      console.log("創建了新的用戶文檔");
    } else {
      // 如果文檔已存在，則更新它
      await updateDoc(userDocRef, updateData);
      console.log("更新了現有的用戶文檔");
    }
    
    // 顯示成功訊息
    updateMessage.show = true;
    updateMessage.text = "Your profile has been successfully updated.";
    updateMessage.isError = false;
    
    // 更新成功後重新獲取資料，確保顯示最新資料
    fetchUserData(currentUser.value.uid);
  } catch (error) {
    console.error("更新用戶資料時發生錯誤:", error);
    updateMessage.show = true;
    updateMessage.text = "更新資料時發生錯誤: " + error.message;
    updateMessage.isError = true;
  } finally {
    isUpdating.value = false;
  }
};

// 檢查密碼長度
const checkPasswordLength = () => {
  if (newPassword.value.trim() !== "" && newPassword.value.length < 6) {
    errors.newPassword = "Your password must be at least 6 characters.";
  } else {
    errors.newPassword = "";
  }
};

// 檢查密碼是否匹配
const checkPasswordMatch = () => {
  if (confirmPassword.value.trim() !== "" && newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = "密碼不匹配";
  } else {
    errors.confirmPassword = "";
  }
};

// 驗證表單
const validateForm = () => {
  // 如果是 Google 登入，不進行驗證
  if (isGoogleLogin.value) {
    return false;
  }
  
  let isValid = true;
  
  // 重置錯誤訊息
  errors.oldPassword = "";
  errors.newPassword = "";
  errors.confirmPassword = "";
  errorMessage.value = "";
  
  // 驗證舊密碼
  if (!oldPassword.value.trim()) {
    errors.oldPassword = "請輸入您的舊密碼";
    isValid = false;
  }
  
  // 驗證新密碼
  if (!newPassword.value.trim()) {
    errors.newPassword = "請輸入新密碼";
    isValid = false;
  } else if (newPassword.value.length < 6) {
    errors.newPassword = "密碼必須至少有6個字符";
    isValid = false;
  }
  
  // 驗證確認密碼
  if (!confirmPassword.value.trim()) {
    errors.confirmPassword = "請確認您的新密碼";
    isValid = false;
  } else if (newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = "密碼不匹配";
    isValid = false;
  }
  
  return isValid;
};

// 計算表單是否有效
const isFormValid = computed(() => {
  // 如果是 Google 登入，表單永遠無效
  if (isGoogleLogin.value) {
    return false;
  }
  
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
  // 如果是 Google 登入，不允許變更密碼
  if (isGoogleLogin.value) {
    errorMessage.value = "您是通過 Google 登入的。密碼變更功能不適用於 Google 帳戶。";
    return;
  }
  
  // 驗證表單
  if (!validateForm()) return;
  
  // 檢查是否有用戶登入
  if (!currentUser.value) {
    errorMessage.value = "您需要登入才能更改密碼";
    return;
  }
  
  // 檢查登入方式
  const providerId = currentUser.value.providerData[0]?.providerId;
  if (providerId === 'google.com' || providerId === 'facebook.com') {
    errorMessage.value = `您是通過${providerId.replace('.com', '')}登入的。請通過該服務更改您的密碼。`;
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
    successMessage.value = "Your password has been successfully updated.";
    
    // 清空表單
    oldPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    
  } catch (error) {
    console.error("更改密碼時發生錯誤:", error.code, error.message);
    
    // 處理特定錯誤
    switch (error.code) {
      case "auth/wrong-password":
        errors.oldPassword = "密碼不正確";
        break;
      case "auth/weak-password":
        errors.newPassword = "密碼應至少有6個字符";
        break;
      case "auth/requires-recent-login":
        errorMessage.value = "出於安全原因，請退出並重新登入，然後再更改密碼";
        break;
      case "auth/invalid-credential":
        errors.oldPassword = "舊密碼不正確";
        break;
      case "auth/too-many-requests":
        errorMessage.value = "太多失敗的嘗試。請稍後再試。";
        break;
      case "auth/network-request-failed":
        errorMessage.value = "網絡錯誤。請檢查您的網絡連接。";
        break;
      default:
        // 清理錯誤訊息，使其更友好
        let cleanErrorMessage = error.message || "發生錯誤";
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

// 監聽登入狀態並獲取用戶資料
onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    
    // 如果用戶登入了，獲取他們的數據
    if (user) {
      fetchUserData(user.uid);
      console.log("用戶已登入，正在獲取數據...");
      
      // 如果用戶是通過電子郵件登入的，自動填入電子郵件地址
      if (user.email) {
        userInfo.email = user.email;
      }
    } else {
      // 如果用戶沒有登入，重置表單
      oldPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      successMessage.value = "";
      errorMessage.value = "您必須登入才能更改密碼";
      
      // 重置用戶資訊
      Object.keys(userInfo).forEach(key => {
        userInfo[key] = "";
      });
      
      console.log("用戶未登入，已重置表單");
    }
  });
  
  // 組件卸載時取消監聽
  return () => unsubscribe();
});
</script>