<style>
@import "../../Assets/css/main.css";
</style>

<template>
  <div class="Draft">
    <nav class="topBar">
      <div class="tabGroup">
        <!--  -->
        <div class="PublishTab">
          <div class="btnLink dark">
            <p>Publish</p>
            <div class="icon-M">
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
        <!--  -->
        <div class="UnlistedTab">
          <div class="btnLink dark">
            <p>Unlisted</p>
            <div class="icon-M">
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
      </div>
      <!--  -->
      <div class="searchFunction">
        <input
          class="fileSearch"
          id="search"
          name="search"
          type="text"
          placeholder="Search"
          v-model="searchQuery"
        />
        <div class="icon-M">
          <div class="dark-search"></div>
        </div>
      </div>
    </nav>
    <div class="notion">
      <h3>Published Works Management Guide</h3>
      <p>
        This section is for viewing information about published works and performing
        unpublishing actions only. To modify a work, please return to the creator's page.
      </p>
      <div class="memberCenterLink">
        <div class="btnLink dark">
          <span>MemberCenter</span>
          <div class="arrowIcon"></div>
        </div>
      </div>
    </div>
    <div class="file-manager">
      <!-- 檔案列表 -->
      <div class="titleBar">
        <h3 class="file-name">Project Name</h3>
        <h3 class="file-time" @click="toggleSort">
          Date
          <div
            class="arrow"
            :class="{ desc: sortOrder === 'desc', asc: sortOrder === 'asc' }"
          ></div>
        </h3>
        <h3 class="more-button">Info</h3>
      </div>
      <div :class="['file-list', DraftViewMode]">
        <FileItem
          v-for="file in DraftFiles"
          :key="file.id"
          :file="file"
          :mode="DraftViewMode"
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
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig'; // 請確保路徑正確
import { useFileStore } from "@/stores/FileStore"; // 引入 Pinia store

// ===========================
// FileManager
// ===========================
// 一開始的檢視模式
const DraftViewMode = ref("link");

// DraftViewMode 檔案排列順序-按時間 :
const sortOrder = ref("desc"); // 預設為降序
const toggleSort = () => {
  // 判斷目前是升序或降序
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
  DraftFiles.value.sort((a, b) => {
    // 從 DraftFiles.value 陣列中取出兩個元素 a 和 b 進行比較[ 執行sort() ]
    const timeA = new Date(a.time).getTime(); // 先把時間資料換成毫秒數,方便後面比較排序
    const timeB = new Date(b.time).getTime();
    // 根據 sortOrder.value 決定排序方式：
    return sortOrder.value === "asc" ? timeA - timeB : timeB - timeA;
  });
};
// ===========================
// 檔案收尋功能
// ===========================
const searchQuery = ref(""); // 存放使用者輸入的搜尋關鍵字

// 計算屬性：根據 searchQuery 過濾 files 陣列
const DraftFiles = computed(() => {
  if (!searchQuery.value) {
    return files.value; // 如果沒有搜尋關鍵字，顯示所有檔案
  }
  return files.value.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// ==============================
// 檔案資訊
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
    const booksCollectionRef = collection(db, "books");
    const querySnapshot = await getDocs(
      query(booksCollectionRef, where("userId", "==", userId)) // 篩選條件：只顯示該用戶的書籍
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
        name: data.filesTile,
        size: data.size || 0, // 假設書籍大小為數字，若無則設置為 0
        type: data.type || "application/pdf", // 書籍類型，預設為 PDF
        time: data.dateAdded || "Unknown", // 書籍加入時間，若無則顯示為 "Unknown"
        url: data.imagePath || "", // 書籍封面圖片 URL
        link: doc.id // 為每本書添加一個跳轉的連結
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
