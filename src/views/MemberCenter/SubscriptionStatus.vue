<template>
  <div class="right-content">
    <AnimatedTitle 
      firstTitle="Subscription"
      middleText="is"
      secondTitle="Successful"
    />
  
    <section class="Successfulmessage">
      <div class="details-list">
        <p>Thank you for subscribing! We are delighted to provide you with enhanced services. Below are some important details; please read them carefully:</p>
        <p>Subscription Period: Your subscription will start on <span class="dynamic-value">{{ formattedStartDate }}</span>, and end on <span class="dynamic-value">{{ formattedEndDate }}</span>.</p>
        <p>Subscription Plan: <span class="dynamic-value">{{ subscriptionDetails.planType }}</span></p>
        <p>Auto-Renewal: To ensure uninterrupted access to our services, your subscription will automatically renew upon expiration. 
        Please keep your payment information up to date.</p>
        <p>Change or Cancel Subscription: To modify your subscription plan or cancel your subscription, please go to "Member Center" ➡ "Subscription Plan" and follow the instructions.</p>
        <p>If you have any questions or need assistance, please feel free to contact our customer support team.</p>
        <p>Thank you again for subscribing, and we wish you a pleasant experience!</p>
      </div>
    </section>

    <div class="btnKey-L dark" @click="handleStartReading">
      <p>START READING</p>
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
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const route = useRoute();
const router = useRouter();

// 初始化訂閱詳情
const subscriptionDetails = ref({
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  planType: 'Monthly Plan'
});

// 格式化日期為易讀格式
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 計算格式化後的日期
const formattedStartDate = computed(() => formatDate(subscriptionDetails.value.startDate));
const formattedEndDate = computed(() => formatDate(subscriptionDetails.value.endDate));

// 處理開始閱讀按鈕點擊
const handleStartReading = () => {
  router.push('/Products'); // 導航到閱讀頁面，請根據實際路由調整
};


// 計算訂閱結束日期
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
    default:
      end.setMonth(start.getMonth() + 1);
      end.setDate(start.getDate() - 1);
  }
  
  return end.toISOString();
};

onMounted(async () => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.log('用戶未登入');
      return;
    }
    
    // 從 URL 獲取訂單 ID
    const orderId = route.query.orderId || localStorage.getItem('currentOrderId');
    
    if (orderId) {
      // 從 Firebase 讀取訂單資訊
      const db = getFirestore();
      const orderDoc = doc(db, "orders", orderId);
      const snapshot = await getDoc(orderDoc);
            
      if (snapshot.exists()) {
        const orderData = snapshot.data();
        
        // 如果訂單沒有結束日期，則計算一個
        const endDate = orderData.endDate || calculateEndDate(orderData.startDate, orderData.planType);
        
        // 設置訂閱詳情
        subscriptionDetails.value = {
          startDate: orderData.startDate,
          endDate: endDate,
          planType: orderData.planType
        };
      } else {
        console.log('找不到訂單資訊');
        
        // 嘗試從用戶資料獲取訂閱資訊
        const userSubRef = dbRef(db, `users/${currentUser.uid}/subscription`);
        const userSubSnapshot = await get(userSubRef);
        
        if (userSubSnapshot.exists()) {
          const subData = userSubSnapshot.data().subscription;
          if (subData) {
            subscriptionDetails.value = {
              startDate: subData.startDate,
              endDate: subData.endDate,
              planType: subData.planType
          };
        }
        }
      }
    } else {
      console.log('沒有訂單 ID，使用默認日期');
      // 如果沒有訂單ID，使用當前日期作為訂閱開始日期，並根據預設計劃計算結束日期
      const now = new Date().toISOString();
      subscriptionDetails.value = {
        startDate: now,
        endDate: calculateEndDate(now, 'Monthly Plan'),
        planType: 'Monthly Plan'
      };
    }
  } catch (error) {
    console.error('獲取訂閱詳情錯誤:', error);
  }
});
</script>

<style scoped>
@import "../../Assets/css/main.css";

.right-content {
  border: none;
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.Successfulmessage{
  width: 100% auto;
  font-family: 'Fanwood Text';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  align-items: center;
  color: #153243;
  margin-bottom: 50px;
}

.Successfulmessage .details-list {
  text-align: left;    /* 文字靠左 */
}

.Successfulmessage .details-list p .dynamic-value {
  color: #EEAD50; 

}
</style>