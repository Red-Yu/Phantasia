這是我的訂閱方案--有訂閱

<style scoped>
@import "../../Assets/css/main.css";

/* hesder */


.pricing-center {
  width: 100%;
  /* max-width: 800px; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-family: "Fanwood Text";
  color: #153243;
  white-space: nowrap;
  align-items: center;
  font-size: 28px;
}


.mainTitle {
  margin: 0px;
  display: block;
  max-width: 100%;
}

.plan {
  margin: 50px 0;
  display: block;
  max-width: 100%;
}

.name {
  font-size: 60px;
  color: #284163;
  font-family: "Aleo", serif;
  margin: 50px 0 30px 0;
}

.user-details {
  margin-bottom: 30px;

  font-family: "Fanwood Text";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2px;
  color: #153243;

  .detail-item {
    margin: 15px 0;
    border-bottom: 1px dotted #7a7a7a;

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
}

.cancel {
  font-size: 20px;
  font-family: "Fanwood Text", serif;
  color: #153243;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  cursor: pointer;
}

.btnKey-L {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  width: fit-content;
}

.cancel:hover .icon-L .dark-cross .cols,
.cancel:hover .i .dark-cross .cols {
  display: flex;
  transform: translateX(4%);
}

.cancel:hover .icon-L .dark-cross .cols span:nth-child(2),
.cancel:hover .i .dark-cross .cols span:nth-child(2) {
  display: none;
}

.pricing-cards {
  display: flex;
  justify-content: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.pricing-card {
  background-image: url("/src/Assets/img/membercenter/plancard.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 62px 24px;
  gap: 10px;
  margin: 0 auto;
  width: 280px;
  height: 367.12px;
  cursor: pointer; /* 添加指針樣式 */
  transition: all 0.3s ease; /* 添加過渡效果 */
}

.pricing-card:hover,
.pricing-card.selected {
  background-image: url("@/assets/img/membercenter/plancard-dark.svg");
  transform: translateY(-5px);
}

.pricing-card:hover .card-title,
.pricing-card:hover .price,
.pricing-card:hover .monthly-price,
.pricing-card.selected .card-title,
.pricing-card.selected .price,
.pricing-card.selected .monthly-price {
  color: #F9FAF9;
}

.check-icon {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 30px;
  width: 100%;
  height: 100%;
}

.card-title {
  font-family: 'Aleo';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;
  /* identical to box height, or 45px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.022em;
  text-transform: capitalize;
  color: #153243;
}

.price {
  font-family: 'Aleo';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  /* identical to box height, or 42px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.022em;
  text-transform: uppercase;
  color: #153243;
}

.monthly-price {
  font-family: 'Aleo';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.022em;
  text-transform: capitalize;
  color: #153243;
}

/* 通知框 */
.notification-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.notification-card {
  background-image: url("/src/Assets/img/membercenter/cancle.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 80px 110px;
  position: relative;
  width: 600px;
  height: 400px;
  animation: slideIn 0.3s ease-out;
}

.notification-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.notification-content h2 {
  font-family: 'Aleo', serif;
  color: #153243;
  font-size: 24px;
  margin-bottom: 24px;
  line-height: 1;
  text-align: center;
}

.notification-content .dear {
  font-family: 'Fanwood Text', serif;
  color: #153243;
  font-size: 20px;
  margin-bottom: 10px;
}

.notification-content .message {
  font-family: 'Fanwood Text', serif;
  color: #153243;
  font-size: 20px;
  line-height: 1;
  margin-bottom: 12px;
}

.notification-content .thanks {
  font-family: 'Fanwood Text', serif;
  color: #153243;
  font-size: 20px;
}


@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>

<template>

        <!-- 右側內容區 -->
          <!-- 大標題 -->
          <AnimatedTitle 
            firstTitle="Current"
            middleText="your"
            secondTitle="Subscription"
          />

          <div class="user-details">
            <div class="detail-item">
              <img :src="feather" alt="feather" />
              <span class="label">PLAN</span>
            </div>
            <span class="value">{{ currentSubscription.planType }}</span>
            <div class="detail-item">
              <img :src="feather" alt="feather" />
              <span class="label">SUBSCRIPTION PERIOD</span>
            </div>
            <span class="value">From{{ currentSubscription.startDate }} to {{ currentSubscription.endDate }}</span>
            <div class="detail-item">
              <img :src="feather" alt="feather" />
              <span class="label">NEXT RENEWAL DATE</span>
            </div>
            <span class="value">
              {{ currentSubscription.nextRenewalDate }}
              <span v-if="subscriptionCancelled" class="cancellation-notice">
                (Automatic renewal canceled)
              </span>
            </span>
          </div>
          <div class="cancel" @click="handleCancelSubscription">
            <p>Cancel Subscription</p>
            <div class="i">
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
          </div>
          <div class="pricing-center">
            <div class="pricing-cards">
              <div 
                v-for="plan in plans" 
                :key="plan.title" 
                class="pricing-card"
                :class="{ 
                  'selected': selectedPlan === plan.title,
                  'hover-effect': selectedPlan === plan.title || isHovered === plan.title 
                }"
                @click="togglePlan(plan.title)"
                @mouseenter="isHovered = plan.title"
                @mouseleave="isHovered = null"
              >
                <!-- 勾勾圖示 -->
                <div class="check-icon" v-if="selectedPlan === plan.title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#FF9800"/>
                    <path d="M7 12L10 15L17 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <div class="card-content">
                  <h2 class="card-title">{{ plan.title }}</h2>
                  <div class="price">USD ${{ plan.price }}</div>
                  <div v-if="plan.monthly" class="monthly-price">
                    Equivalent To<br>${{ plan.monthly }} Per Month
                  </div>
                </div>
              </div>
            </div>

            <!-- 加入通知 Dialog -->
            <div 
              v-if="showNotification" 
              class="notification-overlay"
              @click="handleOverlayClick"
            >
              <div 
                class="notification-card"
                @click.stop  
              >
                <div class="notification-content">
                  <h2>SUBSCRIPTION PLAN<br/>CHANGE CONFIRMATION</h2>
                  <p class="dear">Dear Member,</p>
                  <p class="message">
                    We are pleased to inform you that your subscription plan has been successfully changed. Your new plan will take effect after the current plan expires.
                  </p>
                  <p class="thanks">Thank you for your continued support.</p>
 
                </div>
              </div>
            </div>

            <!-- 修改 change 按鈕，加入點擊事件 -->
            <div class="btnKey-L dark" @click="handleChangeClick">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue'
import feather from "@/assets/img/membercenter/feather.svg"
import { getFirestore, doc, getDoc, collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const router = useRouter();
const auth = getAuth();
const db = getFirestore();

// 添加訂閱取消狀態
const subscriptionCancelled = ref(false);

// 訂閱資訊狀態
const currentSubscription = ref({
  planType: 'Unknown',
  startDate: '',
  endDate: '',
  nextRenewalDate: ''
});

// 響應式數據
const selectedPlan = ref(null)
const isHovered = ref(null)
const showNotification = ref(false)

// 格式化日期函數
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
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

const plans = ref([
  {
    title: 'Monthly Plan',
    price: '12',
    monthly: null
  },
  {
    title: 'Quarterly Plan',
    price: '30',
    monthly: '10'
  },
  {
    title: 'Annual Plan',
    price: '100',
    monthly: '8.33'
  }
])

// 載入訂閱資訊
onMounted(async () => {
  try {
    // 檢查本地存儲中是否有取消訂閱的標記
    if (localStorage.getItem('subscriptionCancelled') === 'true') {
      subscriptionCancelled.value = true;
      // 清除本地存儲，避免影響其他頁面
      localStorage.removeItem('subscriptionCancelled');
    }
    
    const user = auth.currentUser;
    if (!user) {
      console.error('用戶未登入');
      return;
    }

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

      // 手動設置下次續約日期
      let nextRenewalDate;
      switch(latestOrder.planType) {
        case "Monthly Plan":
          nextRenewalDate = new Date(startDate);
          nextRenewalDate.setMonth(startDate.getMonth() + 1);
          break;
        case "Quarterly Plan":
          nextRenewalDate = new Date(startDate);
          nextRenewalDate.setMonth(startDate.getMonth() + 3);
          break;
        case "Annual Plan":
          // 明確設置為開始日期的下一年
          nextRenewalDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
          break;
      }

      currentSubscription.value = {
        planType: `${latestOrder.planType}`,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        nextRenewalDate: formatDate(nextRenewalDate)
      };

      selectedPlan.value = latestOrder.planType;
      
      // 檢查訂單是否已請求取消 - 移動到這裡
      subscriptionCancelled.value = latestOrder.cancellationRequested || subscriptionCancelled.value;
    }
  } catch (error) {
    console.error('獲取訂閱詳情錯誤:', error);
  }
});

// 處理取消訂閱的點擊事件
const handleCancelSubscription = () => {
  router.push('/MemberCenter/MyPlanCancel');
};

// 訂閱計劃相關方法
const togglePlan = (planTitle) => {
  if (selectedPlan.value === planTitle) {
    selectedPlan.value = null
  } else {
    selectedPlan.value = planTitle
  }
  emit('plan-selected', selectedPlan.value)
}

// 通知相關方法
const handleChangeClick = () => {
  if (selectedPlan.value) {
    showNotification.value = true
  }
}

const handleOverlayClick = (event) => {
  if (event.target.classList.contains('notification-overlay')) {
    showNotification.value = false
  }
}

// 定義 emit
const emit = defineEmits(['plan-selected'])
</script>