<style>
@import "../../../Assets/css/main.css";
</style>

<template>
  <div class="Create">
    <!-- 左邊-Function  -->
    <div class="CreateMenu Function" :class="{ close: isLeftClose }">
      <div class="stickyBar">
        <div class="FunctionBar">
          <div class="CheckBox">
            <CheckBox></CheckBox>
          </div>
          <span class="Toggle" @click="toggleFunction" />
        </div>
        <div class="bookInfoBox">
          <h1 class="title">Project Name 0101001010010100101001010</h1>
          <h3 class="subTitle">Drafts</h3>
        </div>
      </div>
      <div class="MenuContent">
        <CreateMenuContent />
      </div>
    </div>
    <!-- 主要內容區域 -->
    <div class="main-content">
      <CreateCanvas />
    </div>
    <!-- 右側-PageView -->
    <div class="CreateMenu PageView" :class="{ close: isRightClose }">
      <div class="topBar">
        <span class="Toggle" @click="togglePageView" />
      </div>
      <div class="MenuContent">
        <div class="modelView" v-for="(template, i) in templateStore.templates" :key="i">
          <div class="modelContent">
            <!-- 顯示縮小版的 template -->

            <div class="canvasPreview" :style="getPreviewStyle()">
              <component :is="template" />
              <button
                class="remove-btn"
                @click="removeTemplate(i)"
                :style="{ transform: 'scale(3.5)' }"
              >
                ×
              </button>
            </div>
          </div>
          <p>{{ i + 1 }}</p>
          <!-- 顯示遞增的編號 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTemplateStore } from "@/stores/template";

import CheckBox from "../../../components/Input/CheckBox.vue";
import CreateMenuContent from "./CreateMenuContent.vue";
import CreateCanvas from "./CreateCanvas.vue";

// 使用 Pinia store
const templateStore = useTemplateStore();

// 用於縮放預覽樣式的函數
function getPreviewStyle() {
  return {
    transform: `scale(0.25)`, // 這裡調整縮放比例
    transformOrigin: "top left", // 縮放基準點，從左上角開始縮放
  };
}

// 刪除模板的函數
function removeTemplate(i) {
  templateStore.removeTemplate(i); // 通過 Pinia store 刪除對應的 template
}

// 左側邊欄的收縮狀態
const isLeftClose = ref(false);

// 右側邊欄的收縮狀態
const isRightClose = ref(false);

// 切換左側邊欄的收縮狀態
const toggleFunction = () => {
  isLeftClose.value = !isLeftClose.value;
};

// 切換右側邊欄的收縮狀態
const togglePageView = () => {
  isRightClose.value = !isRightClose.value;
};
</script>
