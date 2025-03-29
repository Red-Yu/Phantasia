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
    <CreateNewProject :isVisible="isModalVisible" @close="closeModal" />

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
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FileItem from "../../components/FileItem.vue";
import CreateNewProject from "./FullScreenModal/CreateNewProject.vue";

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
// ==============================
const files = ref([
  {
    id: 1,
    name: "The Last Guardian",
    size: 120,
    type: "application/pdf",
    time: "Jan 11, 2025 1:08 AM",
    url: "",
  },
  {
    id: 2,
    name: "A Tale of Two Worlds",
    size: 420,
    type: "application/pdf",
    time: "Jan 11, 2025 2:08 AM",
    url: "",
  },
  {
    id: 3,
    name: "The Midnight Mystery",
    size: 80,
    type: "application/docx",
    time: "Jan 11, 2025 3:08 AM",
    url: "",
  },
  {
    id: 4,
    name: "Secrets Beneath the Sea",
    size: 3200,
    type: "audio/mp3",
    time: "Jan 11, 2025 4:08 AM",
    url: "",
  },
  {
    id: 5,
    name: "Beyond the Horizon",
    size: 120,
    type: "application/pdf",
    time: "Jan 11, 2025 5:08 AM",
    url: "",
  },
  {
    id: 6,
    name: "The Cursed Amulet",
    size: 420,
    type: "application/pdf",
    time: "Jan 11, 2025 6:08 AM",
    url: "",
  },
  {
    id: 7,
    name: "Shadows in the Fog",
    size: 80,
    type: "application/docx",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 8,
    name: "The Enchanted Forest",
    size: 120,
    type: "application/pdf",
    time: "Jan 11, 2025 1:08 AM",
    url: "",
  },
  {
    id: 9,
    name: "Lost in Time",
    size: 420,
    type: "application/pdf",
    time: "Jan 11, 2025 2:08 AM",
    url: "",
  },
  {
    id: 10,
    name: "Whispers of the Wind",
    size: 80,
    type: "application/docx",
    time: "Jan 11, 2025 3:08 AM",
    url: "",
  },
  {
    id: 11,
    name: "The Hidden Key",
    size: 3200,
    type: "audio/mp3",
    time: "Jan 11, 2025 4:08 AM",
    url: "",
  },
]);
</script>
