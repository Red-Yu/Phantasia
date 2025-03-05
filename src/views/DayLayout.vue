<!-- Layout.vue (共用佈局組件) -->

<template>
  <BlackCover />

  <div class="dayLayout">
    <div class="bgd-wrapper"></div>

    <!-- Header -->
    <Header type="day" />

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
import BlackCover from "../components/BlackCover.vue";
import Header from "../components/Header.vue";
</script>
