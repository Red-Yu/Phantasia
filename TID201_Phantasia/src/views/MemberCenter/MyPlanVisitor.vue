這是我的訂閱方案--沒有訂閱

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



</style>

<template>

        <!-- 右側內容區 -->

          <div class="content-center">
            <p class="maintitle">Subscribe Now to Unlock the Full Story!</p>
            <p class="detail">
              Subscribe to unlock the full story! Join now to enjoy every detail
              and the thrilling ending—you're just one step away!
            </p>
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
                <div class="card-logos" v-show="showCreditCardForm">
                  <img src="@/assets/img/membercenter/cardlogo.svg" alt="Mastercard" />
                </div>

                <div class="credit-card-form" v-show="showCreditCardForm">
                  <div class="form-group">
                    <label>Credit Card Number <span class="required">*</span></label>
                    <div class="input-wrapper">
                      <input
                        :type="showCardnumber ? 'text' : 'password'"
                        v-model="cardNumber"
                         @input="formatCardNumber"
                        placeholder="0000 0000 0000 0000"
                        class="form-input"
                        maxlength="19"
                      />
                      <div class="i" @click="showCardnumber = !showCardnumber">
                          <div class="dark-view" :class="{ closed: showCardnumber }"></div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Validity Period <span class="required">*</span></label>
                    <div class="input-wrapper">
                      <input 
                        :type="showCarddate ? 'text' : 'password'"
                        v-model="validityDate"
                         @input="formatValidityDate"
                        placeholder="MM/YY" 
                        class="form-input" 
                        maxlength="5"
                      />
                      <div class="i" @click="showCarddate = !showCarddate">
                          <div class="dark-view" :class="{ closed: showCarddate }"></div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>CVC <span class="required">*</span></label>
                    <div class="input-wrapper">
                      <input
                        :type="showCardcvc ? 'text' : 'password'"
                        v-model="cvcNumber"
                        @input="formatCVC"
                        placeholder="000"
                        maxlength="3"
                        class="form-input"
                      />
                      <div class="i" @click="showCardcvc = !showCardcvc">
                          <div class="dark-view" :class="{ closed: showCardcvc }"></div>
                      </div>
                    </div>
                  </div>

                  <p class="disclaimer">
                    Please note that this platform will not charge you any
                    platform transaction fees, but the credit card you use when
                    placing an order may charge you relevant fees. Please refer to
                    its relevant service policies and regulations, and report to
                    your chosen transaction service provider Get more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import step from "@/assets/img/membercenter/step.svg"

const router = useRouter();

// 處理 JOIN NOW 按鈕點擊
const handleJoinNow = () => {
  router.push('/MemberCenter/SubscriptionStatus');
};

// 訂閱計劃相關
const selectedPlan = ref(null)
const isHovered = ref(null)

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

const togglePlan = (planTitle) => {
  if (selectedPlan.value === planTitle) {
    selectedPlan.value = null
  } else {
    selectedPlan.value = planTitle
  }
  emit('plan-selected', selectedPlan.value)
}

// 支付方式相關
const selectedPayment = ref(null)
const togglePayment = (paymentType) => {
  if (selectedPayment.value === paymentType) {
    selectedPayment.value = null
  } else {
    selectedPayment.value = paymentType
  }
}

// 信用卡表單相關
const showCardnumber = ref(true)
const showCarddate = ref(false)
const showCardcvc = ref(false)

const cardNumber = ref('')
const validityDate = ref('')
const cvcNumber = ref('')

const formatCardNumber = (event) => {
  let value = event.target.value
  value = value.replace(/[^\d\s]/g, '')
  value = value.replace(/\s+/g, ' ')
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  
  if (value.length > 19) {
    value = value.slice(0, 19)
  }
  
  cardNumber.value = value
}

const formatValidityDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  
  if (value.length >= 2) {
    const month = value.slice(0, 2)
    if (parseInt(month) > 12) {
      value = '12' + value.slice(2)
    }
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  
  value = value.slice(0, 5)
  validityDate.value = value
}

const formatCVC = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  value = value.slice(0, 3)
  cvcNumber.value = value
}

// 計算屬性
const showCreditCardForm = computed(() => selectedPayment.value === 'CREDIT')

// 定義 emit
const emit = defineEmits(['plan-selected'])
</script>