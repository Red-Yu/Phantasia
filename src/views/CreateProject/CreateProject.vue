<style>
@import "../../Assets/css/main.css";
</style>

<template>
  <div class="CreateProject">
    <nav class="topBar">
      <div class="searchFunction">
        <input
          class="fileSearch"
          v-model="searchQuery"
          id="search"
          name="search"
          type="text"
          placeholder="Search"
        />
        <div class="icon-M">
          <div class="dark-search"></div>
        </div>
      </div>
      <button class="CreateNewProject" @click="openModal">
        <div class="btnKey-M dark">
          <p>New Project</p>
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
      </button>
    </nav>
    <!-- Props: CreateNewProject -->
    <CreateNewProject :isVisible="isModalVisible" modalId="CreateNewProject" @close="closeModal" />

    <!-- FileManager -->
    <nav class="recent-file" v-if="!searchQuery">
      <div class="modeFunction">
        <h3 class="title">Recent</h3>

        <!-- 切換檢視模式按鈕 -->
        <div class="view-mode-buttons">
          <button
            @click="viewMode = 'grid'"
            :class="{ active: viewMode === 'grid' }"
          >
            <img
              src="../../Assets/img/icon/dark_grid.png"
              class="button-icon"
            />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="{ active: viewMode === 'list' }"
          >
            <img
              src="../../Assets/img/icon/dark_list.png"
              class="button-icon"
            />
          </button>
        </div>
      </div>
      <div :class="['Recent-file-list', RecentViewMode]">
        <FileItem
          v-for="file in recentFiles"
          :key="file.id"
          :file="file"
          :mode="RecentViewMode"
          @click="openFile(file)"
        />
      </div>
    </nav>
    <div class="file-manager">
      <!-- 檔案列表 -->
      <div class="titleBar">
        <h3 class="file-name">Project Name</h3>
        <h3 class="file-time" @click="toggleSort">
          Last Access
          <div
            class="arrow"
            :class="{ desc: sortOrder === 'desc', asc: sortOrder === 'asc' }"
          ></div>
        </h3>
      </div>
      <div :class="['file-list', viewMode]">
        <FileItem
          v-for="file in filteredFiles"
          :key="file.id"
          :file="file"
          :mode="viewMode"
          @click="openFile(file)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, computed , onMounted } from "vue";
import { useRouter } from "vue-router";
import FileItem from "../../components/FileItem.vue";
import CreateNewProject from "./FullScreenModal/CreateNewProject.vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig'; // 請確保路徑正確
import { useFileStore } from "@/stores/FileStore"; // 引入 Pinia store

// ===========================
// CreateNewProject
// ===========================
// components 初始狀態
const isModalVisible = ref(false);

// 打開彈窗的方法
const openModal = () => {
  isModalVisible.value = true;
};

// 關閉彈窗的方法
const closeModal = () => {
  isModalVisible.value = false;
};

// ===========================
// FileManager
// ===========================
// 一開始的檢視模式
const RecentViewMode = ref("grid");
const viewMode = ref("list");

const recentFiles = computed(() => files.value.slice(0, 4)); // RecentViewMode 只顯示四個檔案

// viewMode 檔案排列順序-按時間 : file-manager > titleBar > file-time
const sortOrder = ref("desc"); // 預設為降序
const toggleSort = () => {
  // 判斷目前是升序或降序
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
  /* PS.拆開會是這樣
  {  let currentOrder = sortOrder.value;    // 判斷 currentOrder 是否為 "desc"

     if (currentOrder === "desc") {
     sortOrder.value = "asc";               // 如果是 "desc"，則變成 "asc"
     } else {
     sortOrder.value = "desc";              // 否則變成 "desc"
     }
     sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
  }
  */
  files.value.sort((a, b) => {
    // 從 files.value 陣列中取出兩個元素 a 和 b 進行比較[ 執行sort() ]
    const timeA = new Date(a.time).getTime(); // 先把時間資料換成毫秒數,方便後面比較排序
    const timeB = new Date(b.time).getTime();
    // 根據 sortOrder.value 決定排序方式：
    return sortOrder.value === "asc" ? timeA - timeB : timeB - timeA;
  });
  /* PS.拆開會是這樣
  files.value.sort((a, b) => {
    // 把時間的資料換成毫秒數,方便後面比較排序
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();

    if (sortOrder.value === "asc") {
        // 升序：舊的時間放前面
        return timeA - timeB;
    } else {
        // 降序：新的時間放前面
        return timeB - timeA;
    }
});
  */
};

// ===========================
// 檔案收尋功能
// ===========================
const searchQuery = ref(""); // 存放使用者輸入的搜尋關鍵字

// 計算屬性：根據 searchQuery 過濾 files 陣列
const filteredFiles = computed(() => {
  if (!searchQuery.value) {
    return files.value; // 如果沒有輸入關鍵字，顯示所有檔案
  }
  return files.value.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
// ==============================
// 檔案資訊
// 從 firebase 抓資料填入
// ==============================
const files = ref([]); // 存儲從 Firestore 獲取的書籍資料

// 從 Firestore 獲取書籍資料
const fetchFirestoreData = async () => {
  try {
    const db = getFirestore();
    const currentUser = auth.currentUser; // 獲取當前已登錄用戶
    if (!currentUser) {
      console.error("No user is logged in");
      return;
    }

    const userId = currentUser.uid; // 當前用戶的 userId
    
    // 基於當前用戶的 userId 篩選書籍資料
    const DraftsCollectionRef = collection(db, "Drafts");
    const querySnapshot = await getDocs(
      query(DraftsCollectionRef, where("userId", "==", userId)) // 篩選條件：只顯示該用戶的書籍
    );
    
    if (querySnapshot.empty) {
      console.log("No books found for the current user");
      files.value = []; // 如果該用戶沒有書籍，設置為空陣列
      return;
    }

    // 將每本書的資料映射為與 `files` 類似的結構
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      files.value.push({
        id: doc.id, // Firebase-generated ID
        name: data.title,
        size: data.size || 0, // 假設書籍大小為數字，若無則設置為 0
        type: data.type || "application/pdf", // 書籍類型，預設為 PDF
        time: data.saveDate || "Unknown", // 書籍加入時間，若無則顯示為 "Unknown"
        url: data.boardImageUrl || "", // 書籍封面圖片 URL
      });
    });
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
};

// ==============================
// 點選檔案進入舊檔案
// 從 firebase 抓資料填入
// ==============================
const router = useRouter();
const fileStore = useFileStore();

function openFile(file) {
  fileStore.setSelectedFile(file); // 儲存選中的檔案資料
  router.push('/create');
}

// 在組件加載時獲取資料
onMounted(() => {
  fetchFirestoreData(); // 獲取 Firestore 中的書籍資料
});


</script>
