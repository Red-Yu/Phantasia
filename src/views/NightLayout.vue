<!-- Layout.vue (共用佈局組件) -->

<template>
  <BlackCover />
  <div class="nightLayout">
    <div class="bgd-wrapper"></div>

    <!-- Header -->
    <!-- <Header type="night" /> -->

    <!-- 子頁面顯示區域 -->
    <div class="wrapper">
      <main>
        <router-view> </router-view>
      </main>
      <!-- 頁面共用尾部 -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import BlackCover from "../components/BlackCover.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
</script>
