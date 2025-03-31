<template>
  <!-- 彈窗 -->
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content imageUploadModal" @click.stop>
      <div class="bgc"></div>
      <!-- 主內容區 -->
      <div class="lightbox-content">
        <h2>上傳圖片</h2>
        <!-- 圖片名稱輸入框 -->
        <div class="input-group">
          <label for="imageName">圖片名稱:</label>
          <input
            type="text"
            id="imageName"
            v-model="imageName"
            placeholder="請輸入圖片名稱"
          />
        </div>

        <!-- 上傳圖片框 -->
        <div class="upload-group">
          <label for="imageUpload">選擇圖片:</label>
          <input type="file" id="imageUpload" @change="previewImage" />
        </div>

        <!-- 預覽圖片區域 -->
        <div v-if="imageUrl" class="preview">
          <img :src="imageUrl" alt="Image Preview" class="preview-image" />
        </div>
        <!-- 預覽空白區域（當沒有圖片時）-->
        <div v-if="!imageUrl" class="preview-placeholder">
          <p>尚未選擇圖片</p>
        </div>

        <!-- 上傳和關閉按鈕 -->
        <div class="modal-actions">
          <button class="btnKey-M light" @click="handleUpload">上傳</button>
          <button class="btnKey-M dark" @click="closeModal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../Assets/css/loginSignup.css";

.lightbox-content h2 {
  margin-top: 15px;
  margin-bottom: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content.imageUploadModal {
  width: 400px;
  max-width: 90%;
}

.input-group,
.upload-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.input-group label,
.upload-group label {
  margin-right: 10px;
  width: 90px;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
}

input[type="file"] {
  margin-top: 5px;
}

.preview {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  max-height: 190px; /* 設定最大高度，防止圖片超出彈窗框 */
  height: auto;
}

.preview-placeholder {
  width: 80%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  color: #888;
}

.modal-actions {
  display: flex;
  justify-content: space-between; /* 將按鈕排列在兩端 */
  margin-top: 15px;
  gap: 20px; /* 設定按鈕間距為20px */
}

button {
  padding: 10px 15px;
}

button:hover {
  background-color: #0056b3;
}
</style>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["close", "uploadImage"]);

const imageName = ref("");
const imageUrl = ref(null);
const file = ref(null);

// 關閉彈窗
const closeModal = () => {
  emit("close");
};

// 上傳圖片後預覽
const previewImage = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
};

// 用來觸發父組件的上傳邏輯
const handleUpload = () => {
  if (file.value && imageName.value) {
    emit("uploadImage", { file: file.value, imageName: imageName.value });

    setTimeout(() => {
      // 清空資料
      imageName.value = ""; // 清空圖片名稱
      imageUrl.value = null; // 清空圖片預覽 URL
      file.value = null; // 清空選擇的圖片
    }, 2500);
  } else {
    alert("請選擇圖片並輸入名稱");
  }
};
</script>
