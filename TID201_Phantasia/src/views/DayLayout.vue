<!-- Layout.vue (共用佈局組件) -->

<template>
  <BlackCover />

  <div class="dayLayout">
    <div class="bgd-wrapper"></div>
    <!-- 頁面共用部分 -->
    <header>
      <nav>
        <button @click="goToHome">Home</button>
        <button @click="goToAbout">About</button>
      </nav>
    </header>
    <!-- 子頁面顯示區域 -->
    <div class="wrapper">
      <main>
        <router-view> </router-view>
      </main>
      <!-- 頁面共用尾部 -->
      <footer></footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import BlackCover from "../components/BlackCover.vue";

const router = useRouter();

const goToHome = () => {
  router.push({ name: "home" });
};

const goToAbout = () => {
  router.push({ name: "about" });
};
</script>
