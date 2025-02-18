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
}

.custom-table td:first-child {
  border-right: none;
}

.custom-table td:last-child {
  border-left: none; 
}

.custom-table th:first-child, 
.custom-table th:last-child {
  background-color: #153243; 
  color: white;
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
        :max="endDate"
      />

      <label>~</label>

      <input 
        type="date" 
        v-model="endDate"
        :min="startDate"
        :max="'endDate'"
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
        <tr v-for="(record, index) in purchaseRecords" :key="index">
          <td>{{ record.plan }}</td>
          <td>{{ record.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import search from "@/assets/img/membercenter/search.svg"
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue'

// 日期範圍
const startDate = ref('')
const endDate = ref('')

// 選單狀態
const menuStates = reactive({
  subscription: false,
  projects: false
})

// 假資料 - 可以替換成真實的API調用
const purchaseRecords = ref([
  {
    plan: 'Monthly Plan',
    date: '2024/08/06~2024/09/05'
  },
  {
    plan: 'Monthly Plan',
    date: '2024/08/06~2024/09/05'
  },
  {
    plan: 'Monthly Plan',
    date: '2024/08/06~2024/09/05'
  },
  {
    plan: 'Monthly Plan',
    date: '2024/08/06~2024/09/05'
  },
  {
    plan: 'Monthly Plan',
    date: '2024/08/06~2024/09/05'
  }
])

// 子選單相關方法
const toggleSubmenu = (menuId) => {
  menuStates[menuId] = !menuStates[menuId]
}

const getSubmenuStyle = (menuId) => {
  return {
    height: menuStates[menuId] ? '100px' : '0',
    overflow: 'hidden',
    transition: 'height 0.3s ease'
  }
}

// 搜尋功能
const searchDateRange = () => {
  // 實作搜尋邏輯
  console.log('Searching between', startDate.value, 'and', endDate.value)
}
</script>
