<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import CreateImgInput from "../Input/CreateImgInput.vue";

const templateRef = ref(null);
const localImageUrl = ref(""); // 只影響本地的圖片
const fileInputRef = ref(null); // 有檔案 ==> input 隱藏

// 定義圖片上傳類別
const validateFileType = (file) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  return allowedTypes.includes(file.type);
};

// 處理圖片上傳
const onImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && validateFileType(file)) {
    // 釋放之前的 URL，避免記憶體累積 (當使用者選擇了新圖片或離開該頁面)
    if (localImageUrl.value) {
      URL.revokeObjectURL(localImageUrl.value);
    }
    // JavaScript API，適用於建立本地檔案的臨時 URL
    localImageUrl.value = URL.createObjectURL(file);
  } else {
    alert("請上傳有效的圖片檔案 (png, jpeg, jpg, gif)");
  }
};

// 讓點擊背景圖片時，打開上傳框
const triggerFileInput = () => {
  fileInputRef.value.click();
};

onMounted(() => {
  gsap.fromTo(
    templateRef.value,
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );
});
</script>

<template>
  <div ref="templateRef" class="template-bcg">
    <img class="bgc" :src="localImageUrl" alt="背景圖片" @click="triggerFileInput" />
    <div class="normBox" v-show="!localImageUrl">
      <p>上傳 1920px * 1080px 大小的 gif, jpeg, png</p>
      <!-- <CreateImgInput @change="onImageUpload" ref="fileInputRef" /> -->
      <input
        type="file"
        name="CreateImgInput"
        @change="onImageUpload"
        ref="fileInputRef"
      />
    </div>
  </div>
</template>

<style>
/* template 共用版面配置 ==> CreateTemplate.scss */
@import "@/Assets/css/main.css";
</style>
<style scoped></style>
