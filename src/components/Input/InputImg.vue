<template>
  <div class="inputBox">
    <input
      type="file"
      id="CustomImgInput"
      class="hidden-input"
      @change="handleFileChange"
      accept=".png, .jpeg, .jpg, .gif"
    />
    <label for="CustomImgInput" class="btnKey-L dark-border">
      <p>dark-border</p>
      <div class="icon-L">
        <div class="dark-cross">
          <div class="cols">
            <span></span>
            <span></span>
          </div>
          <div class="rows">
            <span></span>
          </div>
        </div>
      </div>
    </label>
  </div>
  <div class="imgBox" v-if="imageUrl">
    <img :src="imageUrl" alt="Uploaded Image" style="max-width: 100%; height: auto" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageUrl = ref(null);
const emit = defineEmits(["update:image"]); // 定義事件，讓父層監聽

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && validateFileType(file)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      emit("update:image", imageUrl.value); // 傳遞圖片 URL 給父層
    };
    reader.readAsDataURL(file);
  } else {
    alert("請上傳有效的圖片檔案 (png, jpeg, jpg, gif)");
  }
};

const validateFileType = (file) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  return allowedTypes.includes(file.type);
};
</script>

<style scoped>
.btnKey-L {
  background-color: #000;
  width: fit-content;
  align-items: center;
  padding: 5px 10px;
  display: flex;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  z-index: 3;
}
.hidden-input {
  display: none;
}
</style>
