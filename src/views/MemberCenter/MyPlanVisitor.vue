<template>
  <!-- 右側內容區 -->
  <div class="content-center">
    <p class="maintitle">Subscribe Now to Unlock the Full Story!</p>
    <p class="detail">
      Subscribe to unlock the full story! Join now to enjoy every detail
      and the thrilling ending—you're just one step away!
    </p>

    <img :src="step" alt="step" />
  </div>
  <div class="subscription-section">
    <h2 class="title">SUBSCRIPTION PLAN</h2>
    <div class="content-center">
      
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
      </div>
    </div>
    <div class="payment-section">
      <h2 class="title">PAYMENT METHOD</h2>
      <div class="payment-options">
        <!-- LINE PAY -->
        <div class="payment-option">
          <div 
            :class="selectedPayment === 'LINE' ? 'btnKey-L dark' : 'btnKey-L dark-border'"
            @click="togglePayment('LINE')"
          >
            <div class="icon-L">
              <div :class="selectedPayment === 'LINE' ? 'white-cross' : 'dark-cross'">
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
          <span class="payment-title">LINE PAY</span>
        </div>
        <!-- JKOPAY -->
        <div class="payment-option">
          <div 
            :class="selectedPayment === 'JKO' ? 'btnKey-L dark' : 'btnKey-L dark-border'"
            @click="togglePayment('JKO')"
          >
            <div class="icon-L">
              <div :class="selectedPayment === 'JKO' ? 'white-cross' : 'dark-cross'">
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
          <span class="payment-title">JKOPAY</span>
        </div>
      </div>
      <div class="credit-card-section">
        <div class="payment-option">
          <div 
            :class="selectedPayment === 'CREDIT' ? 'btnKey-L dark' : 'btnKey-L dark-border'"
            @click="togglePayment('CREDIT')"
          >
            <div class="icon-L">
              <div :class="selectedPayment === 'CREDIT' ? 'white-cross' : 'dark-cross'">
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
          <span class="payment-title"
            >Credit card/debit card payment</span
          >
        </div>
      </div>
    </div>
    <div class="button-container">
      <div class="btnKey-L light" @click="handleJoinNow">
      <p>JOIN NOW</p>
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
  </div>

  <!-- 自定義提示框 -->
  <SubscriptionAlert
    :show="alertConfig.show"
    :title="alertConfig.title"
    :message="alertConfig.message"
    @close="closeAlert"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import step from "@/assets/img/membercenter/step.svg"
import axios from 'axios'
// 引入 Firestore 相關函數
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SubscriptionAlert from '@/components/SubscriptionAlert.vue'

const router = useRouter();

// 自定義提示框相關狀態
const alertConfig = ref({
  show: false,
  title: '提示',
  message: ''
});

// 顯示自定義提示框
const showAlert = (message, title = '提示') => {
  alertConfig.value.message = message;
  alertConfig.value.title = title;
  alertConfig.value.show = true;
};

// 關閉自定義提示框
const closeAlert = () => {
  alertConfig.value.show = false;
};

// 處理支付按鈕點擊
const handleJoinNow = async () => {
  // 檢查是否選擇了訂閱計劃和支付方式
  if (!selectedPlan.value || !selectedPayment.value) {
    showAlert('Please select a subscription plan and payment method.', 'Hint');
    // 滾動到訂閱計劃區域讓用戶選擇
    document.querySelector('.subscription-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
    return;
  }
  
  try {
    // 取得當前登入用戶
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      showAlert('請先登入', '登入提示');
      router.push('/login');
      return;
    }
    
    // 處理支付
    const planDetails = plans.value.find(p => p.title === selectedPlan.value);
    
    // 生成唯一訂單 ID (使用時間戳)
    const timestamp = new Date().getTime();
    const orderId = `order_${timestamp}`;
    
    // 計算開始日期
    const startDate = new Date();
    
    // 使用您提供的函數計算結束日期
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
    
    // 計算結束日期
    const endDate = calculateEndDate(startDate, selectedPlan.value);
    
    // 儲存訂單到 Firebase
    const db = getFirestore();
    await setDoc(doc(db, "orders", orderId), {
      orderId,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      planType: selectedPlan.value,
      amount: planDetails.price,
      paymentMethod: selectedPayment.value,
      status: 'pending', // 初始狀態為待支付
      merchantTradeNo: `P${timestamp}`, // 記錄綠界使用的交易編號
      createdAt: new Date().toISOString(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString() // 根據您的計算邏輯添加結束日期
    });
    
    // 將訂單 ID 存到 localStorage，以便在支付後使用
    localStorage.setItem('currentOrderId', orderId);
    
    // 呼叫後端 API 創建支付表單，傳遞訂單 ID
    const response = await axios.post('/api/ecpay/create-payment', {
      planType: selectedPlan.value,
      amount: planDetails.price,
      paymentMethod: selectedPayment.value,
      orderId: orderId // 傳遞訂單 ID 到後端
    });
    
    // 將 ECPay HTML 表單加入到頁面並自動提交
    const formContainer = document.createElement('div');
    formContainer.innerHTML = response.data.htmlForm;
    document.body.appendChild(formContainer);
    
    // 自動提交表單
    document.querySelector('form[action*="ecpay"]').submit();
  } catch (error) {
    console.error('支付處理錯誤:', error);
    showAlert('支付處理發生錯誤，請稍後再試', '錯誤');
  }
};

// 訂閱計劃相關
const selectedPlan = ref(null);
const isHovered = ref(null);

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
]);

const togglePlan = (planTitle) => {
  if (selectedPlan.value === planTitle) {
    selectedPlan.value = null;
  } else {
    selectedPlan.value = planTitle;
  }
  emit('plan-selected', selectedPlan.value);
};

// 支付方式相關
const selectedPayment = ref(null);
const togglePayment = (paymentType) => {
  if (selectedPayment.value === paymentType) {
    selectedPayment.value = null;
  } else {
    selectedPayment.value = paymentType;
  }
};

// 信用卡表單相關
const showCardnumber = ref(true);
const showCarddate = ref(false);
const showCardcvc = ref(false);

const cardNumber = ref('');
const validityDate = ref('');
const cvcNumber = ref('');

const formatCardNumber = (event) => {
  let value = event.target.value;
  value = value.replace(/[^\d\s]/g, '');
  value = value.replace(/\s+/g, ' ');
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  if (value.length > 19) {
    value = value.slice(0, 19);
  }
  
  cardNumber.value = value;
};

const formatValidityDate = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  
  if (value.length >= 2) {
    const month = value.slice(0, 2);
    if (parseInt(month) > 12) {
      value = '12' + value.slice(2);
    }
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  
  value = value.slice(0, 5);
  validityDate.value = value;
};

const formatCVC = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  value = value.slice(0, 3);
  cvcNumber.value = value;
};

// 計算屬性
const showCreditCardForm = computed(() => selectedPayment.value === 'CREDIT');

// 檢查用戶是否已登入
onMounted(() => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    console.log('用戶未登入，建議先登入');
  }
});

// 定義 emit
const emit = defineEmits(['plan-selected']);
</script>

<style scoped>
@import "../../Assets/css/main.css";


.content-center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-family: "Aleo";
  color: #153243;
  white-space: nowrap;
  align-items: center;
  font-size: 24px;
  margin: 36px 0;
}

.maintitle {
  color: #eead50;
  font-size: 24px;
  font-family: "Aleo", serif;
  margin-bottom: 50px;
  text-decoration: underline;
  text-transform: uppercase;
}

.detail {
  font-family: "Fanwood Text", serif;
  font-size: 20px;
  color: #153243;
  margin-bottom: 25px;
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

.plan {
  margin: 14px 0;
  display: block;
  max-width: 100%;
}

.btnKey-L {
  margin: 50px 38px;
  display: flex;
  justify-content: center;
  width: fit-content;
}

.payment-options {
  display: flex;
  /* flex-direction: column; */
  gap: 20px;
}

.payment-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid #153243;
}

.payment-title {
  font-family: "Aleo", serif;
  font-size: 24px;
  color: #153243;
}

.credit-card-section {
  margin-top: 20px;
}
.credit-card-form {
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-family: "Fanwood Text", serif;
    color: #153243;
    font-size: 20px;

    .required {
      color: #EEAD50;
      margin-left: 4px;
    }
  }
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
    width: 16px;
    height: 16px;
  }
}
.card-logos {
  margin: 50px 0;
  padding: 24px;
}

.disclaimer {
  margin: 30px 0 50px 0;
  font-family: "Fanwood Text", serif;
  font-size: 14px;
  line-height: 1.6;
  color: #153243;
  padding: 0 12px;
}

.input-wrapper .dark-view.closed {
  background-image: url(/src/Assets/img/membercenter/eyeClose.svg);
  width: 80%;
  height: 80%;
  background-size: contain;   /* 改用 contain 確保圖片完整顯示 */
  background-position: center;
  background-repeat: no-repeat;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 25px 0;
}
</style>