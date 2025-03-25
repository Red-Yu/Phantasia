<template>
  <!-- 登入成功提示 -->
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content successPrompt" @click.stop>
      <div class="bgc"></div>
      <!-- mainContent -->
      <div class="lightbox-content successPrompt">
        <h2>Login Successful!</h2>
        <h2>Welcome to Phantasia.</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* @import "../../Assets/css/main.css"; */
@import "../../Assets/css/loginSignup.css";
</style>

<script setup>
// import { defineProps } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
