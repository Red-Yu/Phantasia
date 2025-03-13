<template>
  <div class="ZoomAnimation">
    <div class="text"></div>
    <div class="content"></div>
    <div class="background">
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <button @click="uploadFile">上傳檔案</button>
    </div>
  </div>
</template>
<script setup></script>

<style scoped>
.ZoomAnimation {
  max-width: 1440px;
  width: 100%;
  height: auto;
}
</style>
