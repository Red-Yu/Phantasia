
<style scoped>
@import "../../Assets/css/main.css";

.Cancelmesage{
  font-family: 'Fanwood Text';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  flex-direction: column;
  color: #153243;
}

.notice-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.notice-intro {
  margin-bottom: 24px;
}

.notice-list {
  list-style: decimal;
  padding-left: 24px;
  margin-bottom: 24px;
}

.notice-list li {
  margin-bottom: 16px;
}

.notice-list h3 {
  display: inline;
  font-weight: bold;
}

.notice-list p {
  display: inline;
}

.notice-footer {
  margin-top: 32px;
}

.support-info {
  margin-bottom: 16px;
}

.support-info a {
  color: #153243;
  text-decoration: none;
}

.support-info a:hover {
  text-decoration: underline;
}

.closing {
  font-style: italic;
}

.chooseConfirm {
  font-size: 20px;
  font-family: "Fanwood Text", serif;
  color: #153243;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  padding: 10px;

}

.chooseConfirm:hover .icon-L .dark-cross .cols,
.chooseConfirm:hover .i .dark-cross .cols {
  display: flex;
  transform: translateX(4%);
}

.chooseConfirm:hover .icon-L .dark-cross .cols span:nth-child(2),
.chooseConfirm:hover .i .dark-cross .cols span:nth-child(2) {
  display: none;
}

.chooseReturn {
  font-size: 20px;
  font-family: "Fanwood Text", serif;
  color: #153243;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  padding: 10px;
}

.chooseReturn:hover .icon-L .dark-cross .cols,
.chooseReturn:hover .i .dark-cross .cols {
  display: flex;
  transform: translateX(4%);
}

.chooseReturn:hover .icon-L .dark-cross .cols span:nth-child(2),
.chooseReturn:hover .i .dark-cross .cols span:nth-child(2) {
  display: none;
}

.choose{
  padding: 20px;
  border-top: 1px solid #153243;
  margin-top: 50px;
}

.choose p{
  cursor: pointer;
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

.notification-content .message {
  font-family: 'Fanwood Text', serif;
  color: #153243;
  font-size: 20px;
  line-height: 1.2;

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

.highlight-date {
  color: #EEAD50;
}

</style>

<template>

       <!-- 右側內容區 -->
          <!-- 大標題 -->
          <AnimatedTitle 
            firstTitle="Subscription "
            middleText="Notice"
            secondTitle="Cancellation"
          />

          <div class="Cancelmesage">
            <h2 class="notice-title">Dear Member,</h2>
            <p class="notice-intro">
              Before you proceed with the cancellation of your subscription, please take note of the following:
            </p>
            <ul class="notice-list">
              <li>
                <h3>Subscription Validity:</h3>
                <p>Upon cancellation, your membership benefits will cease at the end of the current subscription cycle. Unused subscription time will not be refunded.</p>
              </li>
              <li>
                <h3>Service Alternatives:</h3>
                <p>Check if there are other subscription plans that better suit your needs. We offer monthly, quarterly, and annual plans.</p>
              </li>
            </ul>
            <div class="notice-footer">
              <p class="support-info">
                If you need further assistance, please contact our customer support team: 
                <a href="mailto:TibaMe@gmail.com">TibaMe@gmail.com</a>
              </p>
              
              <p class="closing">Thank you for your understanding and support.</p>
            </div>
          </div>
          <div class="choose">
            <div class="chooseConfirm" @click="handleChangeClick">
                <p>Confirm Cancellation</p>
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
                <p class="message">
                  Your subscription has been successfully canceled. Your membership benefits will continue until the end of the current subscription period: <span class="highlight-date">{{ subscriptionEndDate }}</span>.<br>
                  Thank you for your continued support. If you have any questions or need further assistance, please do not hesitate to contact our customer support team.
                </p>
              </div>
              </div>
            </div>

            <div class="chooseReturn" @click="handleReturnClick">
                <p>Return to Member Center</p>
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
          </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue'
// 引入 Firestore
import { getFirestore, doc, updateDoc, collection, query, where, orderBy, getDocs, limit, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const router = useRouter()
const auth = getAuth()
const db = getFirestore()

// 通知相關狀態
const showNotification = ref(false)
// 存儲訂閱結束日期
const subscriptionEndDate = ref('')

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

// 在組件掛載時獲取訂閱信息
onMounted(async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      // 查詢用戶的訂閱訂單
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
        
        // 設置訂閱結束日期
        subscriptionEndDate.value = formatDate(endDate);
      }
    }
  } catch (error) {
    console.error("Error fetching subscription data:", error);
  }
});

// 點擊確認取消按鈕
const handleChangeClick = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      // 查詢用戶的訂閱訂單
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
        const orderDoc = querySnapshot.docs[0];
        // 更新訂單狀態為 "cancelled"，但保留訂閱到期日期
        await updateDoc(doc(db, "orders", orderDoc.id), {
          cancellationRequested: true,
          cancellationDate: new Date().toISOString()
        });
        
        // 設置本地存儲，用於跨頁面傳遞取消狀態
        localStorage.setItem('subscriptionCancelled', 'true');
      }
    }
  } catch (error) {
    console.error("Error cancelling subscription:", error);
  }
  
  // 顯示通知
  showNotification.value = true;
}

// 點擊空白處關閉通知
const handleOverlayClick = (event) => {
  if (event.target.classList.contains('notification-overlay')) {
    showNotification.value = false;
    
    // 關閉對話框後跳轉到會員中心首頁
    router.push('/MemberCenter').then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 返回會員中心
const handleReturnClick = () => {
  router.push('/MemberCenter').then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}
</script>
