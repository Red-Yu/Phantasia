<!-- <div>這是會員中心</div>
<div>因為有無訂閱只有內容不一樣，用條件判斷決定顯示的內容</div> -->
<!-- src/views/MemberCenter.vue -->

<style scoped>
@import "../../Assets/css/main.css";

.name {
  font-size: 60px;
  color: #284163;
  font-family: "Aleo", serif;
  margin: 0 0 30px 0;
}

.user-details {
  margin-bottom: 30px;
  font-family: "Fanwood Text", serif;
  font-size: 20px;

  .detail-item {
    margin: 15px 0;
    border-bottom: 1px dotted #7a7a7a;
    color: #153243;

    .label {
      color: #999999;
      margin-left: 10px;
    }
  }
}

.subscription-box {
  background-color: #dee2e6;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;

  h3 {
    color: #153243;
    margin-bottom: 15px;
    font-family: "Fanwood Text", serif;
  }

  .subscription-details {
    font-family: "Fanwood Text", serif;

    p {
      margin-bottom: 8px;
    }

    .manage-link {
      color: #153243;
      text-decoration: none;
      display: block;
      text-align: right;
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 10px;

      p{
      margin-bottom: 0px;
      cursor: pointer;
      }
    }
  }
}

.stamp-count {
  text-align: center;
  margin-top: 30px;
}

.page-link {
  color: #153243;
  text-align: right;
  display: block;
  margin-top: 15px;
  font-family: "Fanwood Text", serif;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  cursor: pointer;
}

h1{
  font-family: "Aleo";
  font-size: 24px;
  font-weight: bold;
  color: #153243;
  margin-bottom: 20px;
}

.stamp-display {
  margin-top: 30px;
}

.stamp-container {
  position: relative;  /* 作為定位參考點 */
  width: fit-content;  /* 寬度適應內容 */
  margin: 0 auto;     /* 水平居中 */
}

.stamp-container img {
  display: block;
}

.stepnumber {
  position: absolute;
  left: 50%;
  top: 40%;
  
  font-family: 'Fanwood Text';
  font-style: normal;
  font-weight: 400;
  font-size: 96px;
  line-height: 126px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1em;
  color: #153243;
  animation: float 3s ease-in-out infinite; /* 添加動畫 */
}

.stepnumber::after {
  content: "";
  position: absolute;
  bottom: -30px;  /* 調整陰影位置 */
  left: 50%;
  transform: translateX(-50%);
  width: 70px;  /* 設定陰影寬度 */
  height: 20px;  /* 設定陰影高度 */
  background: rgba(0, 0, 0, 0.2);  /* 淺灰色陰影 */
  border-radius: 50%;  /* 讓陰影呈橢圓形 */
  filter: blur(4px);  /* 模糊效果 */
}


@keyframes float {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

</style>

<template>

        <!-- 左側選單 -->
        <!-- 右側內容區 -->

          <h1 class="name">Harry Potter</h1>
          <div class="user-details">
            <div class="detail-item">
              <img :src="feather" alt="feather" />
              <span class="label">Phone Number</span>
            </div>
            <span class="value">0982644321</span>
            <div class="detail-item">
              <img :src="feather" alt="feather" />
              <span class="label">Date Of Birth</span>
            </div>
            <span class="value">1999/09/09</span>
            <div class="detail-item">
              <img :src="feather" alt="feather" />
              <span class="label">Email</span>
            </div>
            <span class="value">Service@Tibame.com</span>
          </div>

          <!-- 訂閱資訊區塊 -->
          <div class="subscription-box">
            <h3>Current Subscription</h3>
            <div class="subscription-details">
              <p>Annual Subscription Plan</p>
              <p>Subscription Period: From July 22, 2024 to June 21, 2025</p>
              <p>Next Renewal Date: June 22, 2025</p>
              <div class="manage-link"  @click="handleManageSubscription">
                <p style="font-size: 20px">Manage Subscription Plans</p>
                <div class="i">
                  <div class="dark-arrow"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="stamp-display">
            <h1>My Stamp Count</h1>
            <div class="stamp-container">
              <img :src="stamp" alt="stamp" />
              <div class="stepnumber">99</div>
            </div>
            <div class="page-link">
              <p style="font-size: 20px">Go To My Page</p>
              <div class="i">
                <div class="dark-arrow"></div>
              </div>
            </div>
          </div>
 
</template>

<script setup>
import { useRouter } from 'vue-router';
import stamp from "@/assets/img/membercenter/Frame 427319813.svg";
import feather from "@/assets/img/membercenter/feather.svg";

const router = useRouter();

const handleManageSubscription = () => {
  router.push('/MemberCenter/MyPlanSubscribed').then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 使用平滑滾動
    })
  })
};

</script>
