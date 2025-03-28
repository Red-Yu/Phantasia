<style>
@import "../../Assets/css/main.css";
@import "../../Assets/css/backStage.css";
</style>

<template>
  <nav class="bkTitle">
    <h2>後台會員管理</h2>
    <div class="searchFunction">
      <input
        class="search"
        name="search"
        type="text"
        placeholder="輸入會員帳號或姓名"
        v-model="searchQuery"
      />
      <div class="icon-M searchIcon">
        <div class="dark-search"></div>
      </div>
    </div>
  </nav>
  <table class="member">
    <thead>
      <tr>
        <th class="id">編號</th>
        <th class="mail">帳號</th>
        <th class="name">姓名</th>
        <th class="phone">生日</th>
        <th class="plan">訂閱方案</th>
        <th class="registrationDate">創立時間</th>
        <th class="more">檢視更多</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr>
        <td>1</td>
        <td>be22g4533fef255577ea@gmail.com</td>
        <td>Qing Hui, Wang</td>
        <td>0987654321</td>
        <td></td>
        <td>2025.03.03</td>
        <td>MORE</td>
      </tr>
      <tr>
        <td>2</td>
        <td>be22g4533fef255577ea@gmail.com</td>
        <td>Qing Hui, Wang</td>
        <td>0987654321</td>
        <td></td>
        <td>2025.03.03</td>
        <td>MORE</td>
      </tr>
      <tr>
        <td>3</td>
        <td>be22g4533fef255577ea@gmail.com</td>
        <td>Qing Hui, Wang</td>
        <td>0987654321</td>
        <td></td>
        <td>2025.03.03</td>
        <td>MORE</td>
      </tr>
    

      <!-- 使用 v-for 動態渲染每一行資料 -->
      <tr v-for="(user, index) in paginatedUsers" :key="user.id">
        <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.birthday }}</td>
        <td>{{ user.plan }}</td>
        <td>{{ user.registrationDate }}</td>
        <td><button @click="openLightbox(user)">MORE</button></td>
      </tr>
    </tbody>
  </table>
  <!-- MORE--Lightbox -->
  <!-- <div id="lightbox" class="lightbox" v-if="showLightbox">
      <div class="lightbox-content">
        <h2>會員詳細資料</h2>
        <p>姓名: {{ selectedMember.name }}</p>
        <p>註冊日期: {{ selectedMember.registrationDate }}</p>
        <p>電子郵件: {{ selectedMember.email }}</p>
        <p>電話: {{ selectedMember.phone }}</p>
        <p>地址: {{ selectedMember.address }}</p>
      </div>
    </div> -->

  <!-- 分頁 -->
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1"><<</button>
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }} /
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages">>></button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const users = ref([]); // 用來存儲多個用戶資料
const searchQuery = ref("");
const currentPage = ref(1); // 當前頁數
const itemsPerPage = 11; // 每頁顯示的資料筆數
// const selectedMember = ref(null); // 用來存儲選中的會員資料
// const showLightbox = ref(false); // 控制 Lightbox 的顯示與隱藏

// 計算總頁數
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

// 計算過濾後的所有會員資料
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return users.value.filter((user) => {
    return (
      user.email?.toLowerCase().includes(query) ||
      "" || // 確保 email 存在且不是 undefined/null
      user.name?.toLowerCase().includes(query) ||
      "" // 確保 name 存在且不是 undefined/null
    );
  });
});

// 計算當前頁顯示的資料 (基於過濾後的資料)
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(startIndex, startIndex + itemsPerPage);
});

// 在組件加載時獲取所有用戶資料
onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users")); // 獲取所有用戶資料
    querySnapshot.forEach((doc) => {
      users.value.push({
        id: doc.id,
        ...doc.data(), // 把用戶資料合併進來
      });
    });
  } catch (error) {
    console.log("Error getting users:", error);
  }
});

// 分頁控制函數
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};
</script>
