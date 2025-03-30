<template>
  <!-- 右側內容區 -->
  <!-- 大標題 -->
  <AnimatedTitle 
    firstTitle="History"
    middleText="of"
    secondTitle="Purchase"
  />

  <div class="little-wrapper">
    <!-- 月份篩選選擇區 -->
    <div class="date-range-selector">
      <label for="month-filter">Start Month</label>
      <select id="month-filter" v-model="selectedMonth">
        <option value="">All Months</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <img 
        :src="search" 
        class="search-icon"
        @click="filterByMonth"
      />
    </div>
  </div>

  <!-- 加載指示器 -->
  <div v-if="isLoading" class="loading-container">
    <p>Loading purchase history...</p>
  </div>

  <div v-else class="table-container">
    <!-- 表格 -->
    <table class="custom-table">
      <thead>
        <tr>
          <th>Plan</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="purchaseRecords.length === 0">
          <td colspan="2" class="text-center">No purchase history found</td>
        </tr>
        <tr v-else v-for="(record, index) in purchaseRecords" :key="index">
          <td>{{ record.plan }}</td>
          <td>{{ record.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import search from "@/assets/img/membercenter/search.svg"
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

// 選擇的月份
const selectedMonth = ref('');

// 訂單記錄
const purchaseRecords = ref([]);
// 所有訂單記錄（未篩選）
const allPurchaseRecords = ref([]);
// 加載狀態
const isLoading = ref(true);

// 格式化日期函數
const formatDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} ~ ${end.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`;
};

// 載入歷史訂單
const loadPurchaseHistory = async (user) => {
  if (!user) return;
  
  isLoading.value = true;
  
  try {
    console.log("嘗試載入用戶訂單:", user.uid);
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef, 
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    console.log(`查詢結果: 找到 ${querySnapshot.docs.length} 條記錄`);
    
    allPurchaseRecords.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const startDate = new Date(data.startDate);
      const endDate = calculateEndDate(startDate, data.planType);
      
      return {
        planType: data.planType,
        plan: `${data.planType}`,
        date: formatDate(startDate, endDate),
        rawStartDate: startDate,
        month: startDate.getMonth() + 1, // JavaScript月份從0開始，所以+1
        year: startDate.getFullYear()
      };
    });
    
    // 在JavaScript中手動對結果進行排序 - 按日期降序排列
    allPurchaseRecords.value.sort((a, b) => b.rawStartDate - a.rawStartDate);
    
    // 初始顯示全部訂單
    purchaseRecords.value = [...allPurchaseRecords.value];
  } catch (error) {
    console.error("獲取購買記錄時出錯:", error);
  } finally {
    isLoading.value = false;
  }
};

// 計算結束日期的函數
const calculateEndDate = (startDate, planType) => {
  const end = new Date(startDate);
  
  switch(planType) {
    case "Monthly Plan":
      end.setMonth(startDate.getMonth() + 1);
      end.setDate(startDate.getDate() - 1);
      break;
    case "Quarterly Plan":
      end.setMonth(startDate.getMonth() + 3);
      end.setDate(startDate.getDate() - 1);
      break;
    case "Annual Plan":
      end.setFullYear(startDate.getFullYear() + 1);
      end.setDate(startDate.getDate() - 1);
      break;
  }
  
  return end;
};

// 按月份篩選
const filterByMonth = () => {
  if (!selectedMonth.value) {
    // 如果沒有選擇月份，顯示全部
    purchaseRecords.value = [...allPurchaseRecords.value];
  } else {
    // 篩選指定月份
    const month = parseInt(selectedMonth.value);
    purchaseRecords.value = allPurchaseRecords.value.filter(
      record => record.month === month
    );
  }
};

// 用於清理監聽器的變數
let authUnsubscribe = null;

// 組件掛載時設置身份驗證監聽器
onMounted(() => {
  console.log("組件已掛載，設置身份驗證監聽器");
  // 監聽身份驗證狀態變化
  authUnsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("用戶已登入:", user.uid);
      loadPurchaseHistory(user);
    } else {
      console.log("用戶未登入");
      purchaseRecords.value = [];
      allPurchaseRecords.value = [];
      isLoading.value = false;
    }
  });
});

// 組件卸載時，取消訂閱身份驗證監聽器
onUnmounted(() => {
  if (authUnsubscribe) {
    authUnsubscribe();
  }
});
</script>

<style scoped>
@import "../../Assets/css/main.css";

/* 新增子選單相關樣式 */
.submenu {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
  background-color: #f9faf9;
}

.submenu .btnTab .text {
  font-size: 20px; /* 設定字體大小 */
}

/* 時間選擇的外容器 */
.little-wrapper {
  display: flex;
  justify-content: flex-end; 
  margin-right: 5px;
  margin-top: 20px; /* 加上頂部間距 */
  margin-bottom: 20px; /* 加上底部間距 */
}

/* 月份選擇 */
.date-range-selector {
  font-family: "Fanwood Text", serif;
  font-size: 28px;
  display: flex;
  justify-content: flex-end;
  right: 0;
  flex-direction: row;
  align-items: center;
}

.date-range-selector img{
  height: 45px;
}

.date-range-selector label {
  color: #153243;
  padding: 8px;
}

.date-range-selector select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #153243;
  border-radius: 4px;
  background-color: transparent; 
  width: 200px;
  color: #153243;
  height: 40px;
  margin-left: 10px;
  font-family: "Fanwood Text", serif;
}

.search-icon {
  padding: 8px;
  height: 30px;
  cursor: pointer;
  margin-right: 5px;
}

/* 表格外圍容器，負責顯示藍色外框與控制間距 */
.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px; 
  border: 3.5px solid #153243; 
}

/* 加載指示器樣式 */
.loading-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-family: "Fanwood Text", serif;
  font-size: 24px;
  color: #153243;
}

/*表格*/
.custom-table {
  font-family: "Fanwood Text", serif;
  font-size: 28px;
  width: 100%;
  border-collapse: collapse;
  margin-top: 2px; 
  border: 2px solid #153243; 
}

.custom-table th, .custom-table td {
  border-top: 1px solid #153243; 
  padding: 10px;
  text-align: left; 
  color: #153243;
  width: 300px; 
}

.custom-table td:first-child {
  border-right: none;
}

.custom-table td:last-child {
  border-left: none;
  text-align: left;
  padding-right: 70px; /* 與表頭保持相同的右側間距 */
}

.custom-table th:first-child {
  background-color: #153243; 
  color: white;
}

.custom-table th:last-child {
  background-color: #153243;
  color: white;
  text-align: left;
}

.custom-table tr{
  height: 65px;
}


</style>