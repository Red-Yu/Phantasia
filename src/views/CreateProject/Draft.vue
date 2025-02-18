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
        <h3 class="file-time">
          Date
          <div class="arrow"></div>
        </h3>
        <h3 class="more-button">Info</h3>
      </div>
      <div :class="['file-list', DraftViewMode]">
        <FileItem
          v-for="DraftFile in DraftFiles"
          :key="DraftFile.id"
          :file="DraftFile"
          :mode="DraftViewMode"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FileItem from "../../components/FileItem.vue";
const DraftViewMode = ref("link");

// 檔案資訊
const DraftFiles = ref([
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
</script>
