<style>
@import "../../Assets/css/main.css";
@import "../../Assets/css/backStage.css";
</style>

<template>
  <nav class="bkTitle">
    <h2>後台商品管理</h2>

    <!-- <button class="add">
      <div class="btnKey-M dark">
        <p>新增</p>
        <div class="icon-M addIcon">
          <div class="white-plus"></div>
        </div>
      </div>
    </button> -->

    <div class="searchFunction">
      <input
        class="search"
        name="search"
        type="text"
        placeholder="輸入書名或作者"
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
        <th class="productTitle">書名</th>
        <th class="type">作者</th>
        <th class="state">年齡層</th>
        <th class="renewDate">上傳時間</th>
        <th class="more edit">刪除</th>
      </tr>
    </thead>
    <tbody>
      <!-- 使用 v-for 動態渲染每一行資料 -->
      <tr v-for="(book, index) in paginatedBooks" :key="book.id">
        <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.ageGroup }}</td>
        <td>{{ book.dateAdded }}</td>
        <td class="deleteButton">
          <button
            class="btnKey-M dark"
            @click="deleteBook(book.id, book.imageUrl)"
          >
            刪除
          </button>
        </td>
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
import { db, storage } from "../../firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

const books = ref([]); // 用來存儲多個商品資料
const searchQuery = ref(""); // 搜尋關鍵字
const currentPage = ref(1); // 當前頁數
const itemsPerPage = 10; // 每頁顯示的資料筆數

// 計算總頁數
const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / itemsPerPage)
);

// 計算過濾後的所有商品資料
const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return books.value.filter((book) => {
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query)
    );
  });
});

// 計算當前頁顯示的資料 (基於過濾後的資料)
const paginatedBooks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredBooks.value.slice(startIndex, startIndex + itemsPerPage);
});

// 在組件加載時獲取所有商品資料
onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "books")); // 獲取所有商品資料
    querySnapshot.forEach((doc) => {
      books.value.push({
        id: doc.id,
        ...doc.data(), // 把商品資料合併進來
      });
    });
  } catch (error) {
    console.log("Error getting books:", error);
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

// 刪除商品
const deleteBook = async (bookId, imageUrl) => {
  alert("公開測試版不提供商品刪除功能！");
  // try {
  //   // 1. 刪除 Firestore 中的資料
  //   const bookDocRef = doc(db, "books", bookId);
  //   await deleteDoc(bookDocRef);
  //   console.log("Firestore 資料已刪除");

  //   // 2. 如果有圖片 URL，則刪除 Storage 中的圖片
  //   if (imageUrl) {
  //     const imageRef = storageRef(storage, imageUrl); // 使用圖片的相對路徑建立 Storage 引用
  //     await deleteObject(imageRef);
  //     console.log("Storage 中的圖片已刪除");
  //   } else {
  //     console.log("沒有圖片，跳過圖片刪除");
  //   }

  //   // 3. 更新頁面上的資料
  //   books.value = books.value.filter((book) => book.id !== bookId);
  //   alert("刪除成功！");
  // } catch (error) {
  //   console.error("刪除操作失敗：", error);
  //   alert("刪除失敗！");
  // }
};
</script>
