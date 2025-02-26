<style>
@import "../../Assets/css/main.css";
</style>

<template>
  <div class="CreateProject">
    <nav class="topBar">
      <div class="searchFunction">
        <input
          class="fileSearch"
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
    <nav class="recent-file">
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
          v-for="recentFile in recentFiles"
          :key="recentFile.id"
          :file="recentFile"
          :mode="RecentViewMode"
        />
      </div>
    </nav>
    <div class="file-manager">
      <!-- 檔案列表 -->
      <div class="titleBar">
        <h3 class="file-name">Project Name</h3>
        <h3 class="file-time">
          Last Access
          <div class="arrow"></div>
        </h3>
      </div>
      <div :class="['file-list', viewMode]">
        <FileItem
          v-for="file in files"
          :key="file.id"
          :file="file"
          :mode="viewMode"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

// 檔案資訊
const recentFiles = ref([
  {
    id: 1,
    name: "報告.pdf",
    size: 120,
    type: "application/pdf",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 2,
    name: "圖片.pdf",
    size: 420,
    type: "application/pdf",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 3,
    name: "文件.docx",
    size: 80,
    type: "application/docx",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 4,
    name: "音樂.mp3",
    size: 3200,
    type: "audio/mp3",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
]);

const files = ref([
  {
    id: 1,
    name: "報告.pdf",
    size: 120,
    type: "application/pdf",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 2,
    name: "圖片.pdf",
    size: 420,
    type: "application/pdf",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 3,
    name: "文件.docx",
    size: 80,
    type: "application/docx",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 4,
    name: "音樂.mp3",
    size: 3200,
    type: "audio/mp3",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 5,
    name: "報告.pdf",
    size: 120,
    type: "application/pdf",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 6,
    name: "圖片.pdf",
    size: 420,
    type: "application/pdf",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
  {
    id: 7,
    name: "文件.docx",
    size: 80,
    type: "application/docx",
    time: "Jan 11, 2025 7:08 AM",
    url: "",
  },
]);
</script>
