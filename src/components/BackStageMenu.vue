<script setup>
import { ref } from "vue";
import TabButton from "./BTN/TabButton.vue";

const isClosetOpen = ref(false); // 控制衣櫃管理選單展開/收起

const toggleClosetMenu = () => {
  isClosetOpen.value = !isClosetOpen.value; // 切換狀態
};

const changeStyle = () => {};


</script>

<style scoped>
@import "../Assets/css/main.css";
@import "../Assets/css/backStageMenu.css";

</style>


  <!-- 後台左側風琴選單 -->
<template>
  <!-- sass:MenuSidebar -->
  <div class="backStageMenu">
    <div class="sidebar">
      <div class="user">
        <div class="useImg">
          <div class="avatar"></div>
        </div>
      </div>
      <div class="tab-group">
        <TabButton
          text="會員管理"
          to="/BKMember"
          @click="changeStyle"
        />
        <TabButton 
          text="商品管理" 
          to="/BKMember/BKProduct" 
          @click="changeStyle"
        />
        <TabButton 
          text="資訊管理" 
          to="/BKMember/BKInfo" 
          @click="changeStyle"
        />
        <!-- 衣櫃管理 按鈕 -->
        <div @click="toggleClosetMenu">
          <TabButton 
            text="衣櫃管理" 
            to="/BKMember/BKMyColsetClothes" 
            :class="{ active: isClosetOpen }"
          />
        </div>

         <!-- 手風琴展開/收起 子選單 -->
        <div v-if="isClosetOpen" class="sub-menu">
          <TabButton class="sub-item"
            text="髮型管理" 
            to="/BKMember/BKMyColsetHair" 
            @click="changeStyle"
          />
          <TabButton class="sub-item"
            text="服裝管理" 
            to="/BKMember/BKMyColsetClothes" 
            @click="changeStyle"
          />
          <TabButton class="sub-item"
            text="精靈管理" 
            to="/BKMember/BKMyColsetPartner" 
            @click="changeStyle"
          />
          <TabButton class="sub-item"
            text="魔法陣管理" 
            to="/BKMember/BKMyColsetMagicCircle" 
            @click="changeStyle"
          />
        </div>
        <div class="logout-container">
          <button class="logout">
            <div class=" btnKey-M dark">
              <p>登出</p>
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
      </div>
    </div>
  
    <!-- 右側(子頁面)顯示區域 -->
    <main>
      <router-view></router-view>
      <!-- 顯示子頁面內容 -->
    </main>
  </div>
</template>