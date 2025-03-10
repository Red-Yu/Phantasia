<script setup>
import TabButton from "./BTN/TabButton.vue";


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
          to="/BackstageMember"
          @click="changeStyle"
        />
        <TabButton 
          text="商品管理" 
          to="/BackstageProduct" 
          @click="changeStyle"
        />
        <TabButton 
          text="資訊管理" 
          to="/BackstageInfo" 
          @click="changeStyle"
        />
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