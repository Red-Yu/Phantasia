<!-- Layout.vue (共用佈局組件) -->
<template>
  <div>
    <!-- 頁面共用部分 -->
    <header>
      <!-- <h1>Site Header</h1> -->
      <!-- 可以是共用的導航 -->
      <nav>
        <!-- <button @click="goToHome">Home</button> -->
        <!-- <button @click="goToAbout">About</button> -->
      </nav>
    </header>

    <!-- 子頁面顯示區域 -->
    <main>
      <router-view></router-view>
      <!-- 顯示子頁面內容 -->
    </main>

    <!-- 頁面共用尾部 -->
    <footer>
      <!-- <p>Site Footer</p> -->
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
    },
    goToAbout() {
      this.$router.push({ name: "about" });
    },
  },
};
</script>
