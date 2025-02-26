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
              <div class="btnKey-L dark">
                <p>CHANGE</p>
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

            <div class="password-form">
                <div class="form-group">
                    <label>Old Password <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <input
                            :type="showOldPassword ? 'text' : 'password'"
                            placeholder="Please enter"
                            class="form-input"
                        />
                        <div class="i" @click="showOldPassword = !showOldPassword">
                          <div class="dark-view" :class="{ closed: showOldPassword }"></div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>New Password <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <input
                            :type="showNewPassword ? 'text' : 'password'"
                            placeholder="Please enter"
                            class="form-input"
                        />
                        <div class="i" @click="showNewPassword = !showNewPassword">
                            <div class="dark-view" :class="{ closed: showNewPassword }"></div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Confirm Password <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <input
                            :type="showConfirmPassword ? 'text' : 'password'"
                            placeholder="Please enter"
                            class="form-input"
                        />

                        <div class="i" @click="showConfirmPassword = !showConfirmPassword">
                            <div class="dark-view" :class="{ closed: showConfirmPassword }"></div>
                        </div>
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

import { ref } from "vue";

const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
</script>