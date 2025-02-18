<script setup>
import TabButton from "./BTN/TabButton.vue";

const changeStyle = () => {};
</script>

<!-- sass:MenuSidebar -->
<template>
  <div class="ProjectMenu">
    <div class="sidebar">
      <div class="user">
        <div class="useImg">
          <div class="avatar"></div>
        </div>
      </div>
      <div class="tab-group">
        <TabButton
          text="CreateProject"
          to="/CreateProject"
          @click="changeStyle"
        />
        <TabButton text="Draft" to="/CreateProject/Draft" />
      </div>
    </div>
    <!-- Tab分頁面顯示內容 -->
    <main>
      <router-view></router-view>
      <!-- 顯示子頁面內容 -->
    </main>
  </div>
</template>
