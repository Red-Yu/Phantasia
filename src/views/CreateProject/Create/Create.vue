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
          <h1 class="title">Project Name 01010</h1>
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
        <div class="modelView">
          <div class="modelContent"></div>
          <p>1</p>
        </div>
        <div class="modelView">
          <div class="modelContent"></div>
          <p>2</p>
        </div>
        <div class="modelView">
          <div class="modelContent"></div>
          <p>3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CheckBox from "../../../components/Input/CheckBox.vue";
import CreateMenuContent from "./CreateMenuContent.vue";
import CreateCanvas from "./CreateCanvas.vue";

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
