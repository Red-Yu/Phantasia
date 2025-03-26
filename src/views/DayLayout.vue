<!-- Layout.vue (共用佈局組件) -->

<template>
  <BlackCover />

  <div class="dayLayout">
    <div class="bgd-wrapper"></div>

    <!-- Header -->
    <Header type="day" />

    <!-- 子頁面顯示區域 -->
    <div class="wrapper">
      <router-view> </router-view>
      <!-- 頁面共用尾部 -->
    </div>
  </div>
</template>

<script setup>
import BlackCover from "../components/BlackCover.vue";
import Header from "../components/Header.vue";
import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 使用 requestAnimationFrame 滾動到頂部
const scrollToTop = () => {
  requestAnimationFrame(() => {
    // 滾動 wrapper 容器到頂部
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.scrollTop = 0;
    }
    
    // 同時也滾動 right-content 容器
    const rightContent = document.querySelector('.right-content');
    if (rightContent) {
      rightContent.scrollTop = 0;
    }
  });
};

// 添加路由前置守衛
onMounted(() => {
  router.beforeEach((to, from, next) => {
    // 立即設置滾動位置為 0
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      wrapper.scrollTop = 0;
    }
    
    next();
  });
});

// 仍然保留路由變化監聽作為備份
watch(
  () => route.path,
  () => {
    // 立即執行一次
    scrollToTop();
    
    // 再添加一個極短的延遲執行一次，確保 DOM 已更新
    setTimeout(scrollToTop, 10);
  }
);
</script>