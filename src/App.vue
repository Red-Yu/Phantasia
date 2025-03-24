<script setup></script>

<template>
  <div class="overlay"></div>

  <RouterView />
</template>

<style scoped>
#app {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("./Assets/Day/texture.png"); /* 替換成您PNG圖檔的路徑 */
  background-size: cover;
  background-position: center;
  pointer-events: none; /* 讓其他內容可以點擊 */
  z-index: 100000; /* 確保遮罩層在最上面 */
  opacity: 0.8;
}
</style>
