<template>
  <!-- 登入成功提示 -->
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content successPrompt" @click.stop>
      <div class="bgc"></div>
      <!-- mainContent -->
      <div class="lightbox-content successPrompt">
        <h2 v-if="!isUploading">Login Successful!</h2>
        <h2 v-if="!isUploading">Welcome to Phantasia.</h2>

        <div v-if="isUploading">
          <h2>Saving images...</h2>
          <div class="progress-bar">
            <div
              class="progress-bar-fill"
              :style="{ width: `${uploadProgress}%` }"
            ></div>
          </div>
          <p>{{ uploadProgress }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* @import "../../Assets/css/main.css"; */
@import "../Assets/css/loginSignup.css";

/* 進度條樣式 */
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background-color: #284163;
  border-radius: 5px;
  transition: width 0.6s ease;
}

.bgc {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.modal-content {
  position: relative;
  z-index: 2;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.lightbox-content {
  text-align: center;
}

.successPrompt h2 {
  font-size: 1.5rem;
  color: #333;
}
</style>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  isUploading: {
    type: Boolean,
    required: true,
  },
  uploadProgress: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
