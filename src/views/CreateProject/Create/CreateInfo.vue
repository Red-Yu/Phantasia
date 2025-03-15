<style>
@import "../../../Assets/css/main.css";
</style>

<template>
  <div class="createInfo">
    <div class="bookCover">
      <!-- AddCover 預覽畫面 -->
      <div class="cover-save-preview">
        <!-- <div class="side frontSide" :style="{ backgroundColor: coverSetting.color }">
          <div v-if="coverSetting.UserCoverImageUrl" class="User-preview">
            <img
              class="customImg"
              :src="coverSetting.UserCoverImageUrl"
              alt="Uploaded in User"
            />
          </div>
          <img class="coverImg" src="../../../Assets/img/book/封面.png" alt="" />
        </div>
        <div class="side backSide" :style="{ backgroundColor: coverSetting.color }">
          <img class="coverImg" src="../../../Assets/img/book/封底.png" alt="" />
        </div> -->
      </div>
      <!-- btn: AddCover -->
      <button class="addCover" @click="openModal">
        <div class="btnKey-M light">
          <p>FRONT COVER SETTING</p>
          <div class="icon-M">
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
    </div>
    <!-- Props: AddCover -->
    <AddCover :isVisible="isModalVisible" @close="closeModal" />
    <!-- InfoInput  -->
    <div class="InfoInput">
      <div class="stepsGroup">
        <!-- frontCover -->
        <div class="steps" :class="{ current: isCurrent('CreateCover') }">
          <div class="icon">
            <div class="frontCover"></div>
          </div>
          <p>FRONT COVER</p>
        </div>
        <span></span>
        <!-- information -->
        <div class="steps" :class="{ current: isCurrent('CreateInforMation') }">
          <div class="icon">
            <div class="information"></div>
          </div>
          <p>INFORMATION</p>
        </div>
        <span></span>
        <!-- publish -->
        <div class="steps" :class="{ current: isCurrent('CreateConfirm') }">
          <div class="icon">
            <div class="publish"></div>
          </div>
          <p>PUBLISH</p>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddCover from "../FullScreenModal/AddCover.vue";
import { useCoverStore } from "../../../stores/coverSetting";
import { useRoute } from "vue-router";

const route = useRoute();
const isCurrent = (stepName) => {
  return route.name === stepName;
};

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

// 使用 Pinia store
const coverSetting = useCoverStore();
</script>
