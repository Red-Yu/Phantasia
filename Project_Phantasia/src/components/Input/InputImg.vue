<template>
  <div class="inputImg">
    <input
      type="file"
      id="CustomImgInput"
      class="hidden-input"
      @change="handleFileChange"
      accept=".png, .jpeg, .jpg, .gif"
    />
    <label for="CustomImgInput" class="btnKey-M dark-border">
      <p>Browse file</p>
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
    <img
      :src="imageUrl"
      alt="Uploaded Image"
      style="max-width: 100%; height: auto"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageUrl = ref(null);
const emit = defineEmits(["update:image"]); // 定義事件，讓父層監聽

const MAX_SIZE_MB = 1; // 最大圖片大小 1MB
const MAX_WIDTH = 450; // 壓縮後圖片的最大寬度（可以根據需要調整）

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && validateFileType(file)) {
    const reader = new FileReader();
    // reader.onload = (e) => {
    //   imageUrl.value = e.target.result;
    //   emit("update:image", imageUrl.value); // 傳遞圖片 URL 給父層
    // };

    reader.onload = (e) => {
      // 使用 FileReader 讀取圖片
      const img = new Image();
      img.onload = () => {
        // 壓縮圖片
        const compressedImage = compressImage(img);
        // 傳遞壓縮後的圖片 URL 給父層
        emit("update:image", compressedImage);
      };
      img.src = e.target.result;
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

// 壓縮圖片函數
const compressImage = (img) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 設定圖片的最大寬度與高度，並保持比例
  const scaleFactor = Math.min(MAX_WIDTH / img.width, 1);
  const width = img.width * scaleFactor;
  const height = img.height * scaleFactor;

  // 設定 canvas 寬高
  canvas.width = width;
  canvas.height = height;

  // 在 canvas 上畫出圖片
  ctx.drawImage(img, 0, 0, width, height);

  // 轉換為 base64 格式的圖片，並檢查大小
  let compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8); // 0.8 是壓縮質量（0 到 1 之間）
  let imageSize = getBase64Size(compressedDataUrl);

  // 如果圖片大小超過 1MB，繼續壓縮直到達到目標大小
  while (imageSize > MAX_SIZE_MB * 450 * 450) {
    compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // 進一步降低質量
    imageSize = getBase64Size(compressedDataUrl);
  }

  return compressedDataUrl;
};

// 計算 base64 圖片的大小
const getBase64Size = (dataUrl) => {
  const base64String = dataUrl.split(",")[1];
  return (base64String.length * 3) / 4;
};
</script>

<style scoped>
.inputImg > input {
  display: none;
}
</style>
