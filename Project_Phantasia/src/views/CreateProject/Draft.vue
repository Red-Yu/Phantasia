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
          v-for="File in DraftFiles"
          :key="File.id"
          :file="File"
          :mode="DraftViewMode"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FileItem from "../../components/FileItem.vue";
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
