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
    border-bottom: 1px solid #284163;
    color: #153243;
    /* background-color: yellow; */

    .label {
      color: #284163;
      margin-left: 10px;
      font-size: 18px;
      font-family: Aleo;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: uppercase;
      letter-spacing: 1.8px;
    }
  }
  .value {
    font-family: "Fanwood Text";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 2px;
    color: #153243;
  }
  
  /* 添加灰色提示樣式 */
  .placeholder-text {
    color: #A9A9A9; /* 灰色文字 */
    font-style: italic;
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

      p {
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

h1 {
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
  position: relative; /* 作為定位參考點 */
  width: fit-content; /* 寬度適應內容 */
  margin: 0 auto; /* 水平居中 */
}

.stamp-container img {
  display: block;
}

.stepnumber {
  position: absolute;
  left: 50%;
  top: 40%;

  font-family: "Fanwood Text";
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
  bottom: -30px; /* 調整陰影位置 */
  left: 50%;
  transform: translateX(-50%);
  width: 70px; /* 設定陰影寬度 */
  height: 20px; /* 設定陰影高度 */
  background: rgba(0, 0, 0, 0.2); /* 淺灰色陰影 */
  border-radius: 50%; /* 讓陰影呈橢圓形 */
  filter: blur(4px); /* 模糊效果 */
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

  <h1 class="name">Member Center</h1>
  <div class="user-details">
    <div class="detail-item">
      <img :src="feather" alt="feather" />
      <span class="label">Name</span>
    </div>
    <span class="value">{{ userName }}</span>
    <!-- <div class="detail-item">
      <img :src="feather" alt="feather" />
      <span class="label">Phone Number</span>
    </div>
    <span class="value">0982644321</span> -->
    <div class="detail-item">
      <img :src="feather" alt="feather" />
      <span class="label">Date Of Birth</span>
    </div>
    <span :class="{ 'value': true, 'placeholder-text': isPlaceholderBirthday }">{{ displayBirthday }}</span>
    <div class="detail-item">
      <img :src="feather" alt="feather" />
      <span class="label">Email</span>
    </div>
    <span class="value">{{ userEmail }}</span>
  </div>

  <!-- 訂閱資訊區塊 -->
  <div class="subscription-box">
    <h3>Current Subscription</h3>
    <div class="subscription-details">
      <!-- Conditional rendering for subscription -->
      <template v-if="hasActiveSubscription">
        <p>{{ subscriptionPlanType }}</p>
        <p>Subscription Period: From {{ subscriptionStartDate }} to {{ subscriptionEndDate }}</p>
        <p>
          Next Renewal Date: {{ nextRenewalDate }}
          <span v-if="subscriptionCancelled" class="cancellation-notice">
            (Automatic renewal canceled)
          </span>
        </p>
        <div class="manage-link" @click="handleManageSubscription">
          <p style="font-size: 20px">Manage Subscription Plans</p>
          <div class="i">
            <div class="dark-arrow"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="no-subscription">
          You're not subscribed yet! Explore our subscription plans and find the one that suits you best. 
          Unlock exclusive content and begin your exciting reading journey today!
        </p>
        <div class="manage-link" @click="handleExploreSubscription">
          <p style="font-size: 20px">Explore Subscription Plans</p>
          <div class="i">
            <div class="dark-arrow"></div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- 點數顯示區塊 -->
  <div class="stamp-display">
    <h1>My Stamp Count</h1>
    <div class="stamp-container">
      <img :src="stamp" alt="stamp" />
      <div class="stepnumber">{{points}}</div>
    </div>
    <div class="page-link" @click="handleGoToMyRewardCard">
      <p style="font-size: 20px">Go To My Page</p>
      <div class="i">
        <div class="dark-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import stamp from "@/assets/img/membercenter/Frame 427319813.svg";
import feather from "@/assets/img/membercenter/feather.svg";
import { ref, onMounted, computed } from "vue";
import { db } from "../../firebase/firebaseConfig";
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  limit 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const router = useRouter();
const auth = getAuth();

// 存儲用戶資料
const userName = ref("");
const userBirthday = ref("");
const userEmail = ref("");
const userLoginMethod = ref(""); // 新增登入方式欄位

// 檢查是否為 Google 登入
const isGoogleLogin = computed(() => {
  return userLoginMethod.value === 'google';
});

// 檢查是否是提示文字
const isPlaceholderBirthday = computed(() => {
  return !userBirthday.value && isGoogleLogin.value;
});

// 處理顯示生日
const displayBirthday = computed(() => {
  // 如果資料庫中存在生日資料，則無論登入方式如何都顯示該資料
  if (userBirthday.value) {
    return userBirthday.value;
  }
  
  // 如果資料庫中沒有生日資料且是Google登入，顯示填寫提示
  if (isGoogleLogin.value) {
    return "Please go to Account Setting to fill in";
  }
  
  // 如果沒有生日資料且不是Google登入，顯示空字串
  return "";
});
const points = ref(0); // 新增用於存儲會員點數的變量

// 訂閱相關資料
const hasActiveSubscription = ref(false);
const subscriptionPlanType = ref('');
const subscriptionStartDate = ref("");
const subscriptionEndDate = ref("");
const nextRenewalDate = ref("");
// 添加訂閱取消狀態
const subscriptionCancelled = ref(false);

// 格式化日期函數
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// 計算結束日期的函數
const calculateEndDate = (startDate, planType) => {
  const start = new Date(startDate);
  const end = new Date(start);
  
  switch(planType) {
    case "Monthly Plan":
      end.setMonth(start.getMonth() + 1);
      end.setDate(start.getDate() - 1);
      break;
    case "Quarterly Plan":
      end.setMonth(start.getMonth() + 3);
      end.setDate(start.getDate() - 1);
      break;
    case "Annual Plan":
      end.setFullYear(start.getFullYear() + 1);
      end.setDate(start.getDate() - 1);
      break;
  }
  
  return end;
};

// 計算下次續約日期的函數
const calculateNextRenewalDate = (startDate, planType) => {
  const start = new Date(startDate);
  const nextRenewal = new Date(start);
  
  switch(planType) {
    case "Monthly Plan":
      nextRenewal.setMonth(start.getMonth() + 1);
      break;
    case "Quarterly Plan":
      nextRenewal.setMonth(start.getMonth() + 3);
      break;
    case "Annual Plan":
      nextRenewal.setFullYear(start.getFullYear() + 1);
      break;
  }
  
  return nextRenewal;
};

// 在組件加載時獲取用戶資料
onMounted(async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      // 檢查登入提供商
      if (user.providerData && user.providerData.length > 0) {
        const providerId = user.providerData[0]?.providerId;
        if (providerId === 'google.com') {
          userLoginMethod.value = 'google';
        } else if (providerId === 'facebook.com') {
          userLoginMethod.value = 'facebook';
        } else {
          userLoginMethod.value = 'email';
        }
      }

      // 獲取用戶基本資料
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        userName.value = userData.name || ""; 
        userBirthday.value = userData.birthday || ""; 
        userEmail.value = userData.email || ""; 
        
        // 如果資料庫中有登入方式資訊，優先使用資料庫中的
        if (userData.loginMethod) {
          userLoginMethod.value = userData.loginMethod;
        }
        points.value = userData.points || 0; // 設置用戶點數
      }

      // 查詢訂閱訂單
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef, 
        where("userId", "==", user.uid),
        where("status", "==", "pending"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const latestOrder = querySnapshot.docs[0].data();
        const startDate = new Date(latestOrder.startDate);
        const endDate = calculateEndDate(startDate, latestOrder.planType);
        const renewalDate = calculateNextRenewalDate(startDate, latestOrder.planType);

        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Renewal Date:', renewalDate);

        hasActiveSubscription.value = true;
        subscriptionPlanType.value = `${latestOrder.planType}`;
        
        subscriptionStartDate.value = formatDate(startDate);
        subscriptionEndDate.value = formatDate(endDate);
        nextRenewalDate.value = formatDate(renewalDate);
        
        // 檢查訂單是否已請求取消
        subscriptionCancelled.value = latestOrder.cancellationRequested || false;
      } else {
        hasActiveSubscription.value = false;
      }
      
      // 檢查本地存儲中是否有取消訂閱的標記
      if (localStorage.getItem('subscriptionCancelled') === 'true') {
        subscriptionCancelled.value = true;
        // 清除本地存儲，避免影響其他頁面
        localStorage.removeItem('subscriptionCancelled');
      }
      
    } catch (error) {
      console.error("Error fetching user and subscription data:", error);
      hasActiveSubscription.value = false;
    }
  }
});

const handleManageSubscription = () => {
  router.push("/MemberCenter/MyPlanSubscribed").then(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

const handleExploreSubscription = () => {
  router.push("/MemberCenter/MyPlanVisitor").then(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

const handleGoToMyRewardCard = () => {
  router.push("/MyCabin/MyRewardCard").then(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
</script>