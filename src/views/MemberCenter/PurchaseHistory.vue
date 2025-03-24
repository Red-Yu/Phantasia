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
.new-wrapper {
  display: flex;
  justify-content: flex-end; 
  margin-right: 5px;
}

/* 時間選擇 */
.date-range-selector {
  font-family: "Fanwood Text", serif;
  font-size: 28px;
  display: flex;
  justify-content: flex-end;
 
  right: 0;
  flex-direction: row;
  margin-bottom: 30px;

}

.date-range-selector img{
  height: 45px;
}


.date-range-selector label {
  color: #153243;
  font-weight: bold;
  padding: 8px;
}



.date-range-selector select {
  padding: 8px;
  font-size: 14px;
  border: none;
  background-color: transparent; 
  width: 200px;
}

.search-icon {
  padding: 8px;
  height: 30px;
  cursor: pointer;
  margin-right: 5px;
}

input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;  /* 移除所有邊框 */
  padding: 8px;
  border-radius: 4px;
  font-family: "Fanwood Text", serif;
  font-size: 16px;
  color: #153243;
  background: transparent;

}

input[type="date"]:focus {
  outline: none;
  border-color: #153243;
}

/* 表格外圍容器，負責顯示藍色外框與控制間距 */
.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px; 
  border: 3.5px solid #153243; 
  
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


<template>
  <!-- 右側內容區 -->
  <!-- 大標題 -->
  <AnimatedTitle 
    firstTitle="History"
    middleText="of"
    secondTitle="Purchase"
  />

  <div class="little-wrapper">
    <!-- 時間範圍選擇區 -->
    <div class="date-range-selector">
      <label for="date-range">DATE RANGE</label>
      <input 
        type="date" 
        v-model="startDate"
        :min="'2024-01-01'"
        :max="new Date().toISOString().split('T')[0]"
      />

      <label>~</label>

      <input 
        type="date" 
        v-model="endDate"
        :min="startDate"
        :max="new Date().toISOString().split('T')[0]"
      />

      <img 
        :src="search" 
        class="search-icon"
        @click="searchDateRange"
      />
    </div>
  </div>

  <div class="table-container">
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
import { ref, onMounted } from 'vue'
import search from "@/assets/img/membercenter/search.svg"
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue'
import { getFirestore, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

// 日期範圍
const startDate = ref('')
const endDate = ref('')

// 訂單記錄
const purchaseRecords = ref([])

// 格式化日期函數
const formatDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} ~ ${end.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`;
};

// 載入歷史訂單
const loadPurchaseHistory = async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef, 
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    
    purchaseRecords.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const startDate = new Date(data.startDate);
      const endDate = calculateEndDate(startDate, data.planType);
      
      return {
        plan: `${data.planType}`,
        date: formatDate(startDate, endDate)
      };
    });
  } catch (error) {
    console.error("Error fetching purchase history:", error);
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

// 搜尋功能
const searchDateRange = async () => {
  const user = auth.currentUser;
  if (!user || !startDate.value || !endDate.value) return;

  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef, 
      where("userId", "==", user.uid),
      where("startDate", ">=", startDate.value),
      where("startDate", "<=", endDate.value),
      orderBy("startDate", "desc")
    );

    const querySnapshot = await getDocs(q);
    
    purchaseRecords.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const start = new Date(data.startDate);
      const end = calculateEndDate(start, data.planType);
      
      return {
        plan: `${data.planType} Plan`,
        date: formatDate(start, end)
      };
    });
  } catch (error) {
    console.error("Error searching purchase history:", error);
  }
};

// 組件掛載時載入歷史訂單
onMounted(loadPurchaseHistory);
</script>
