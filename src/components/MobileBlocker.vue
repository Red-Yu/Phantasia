<style scoped>
.mobileBlocker {
  position: fixed;
  inset: 0;
  background-color: #153243;
  color: white;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.mobileLogo {
  width: 200px;
  margin-bottom: 1.5rem;
}

.mobileMessage {
  font-size: 1.2rem;
  line-height: 1.8;
  font-family: "Aleo";
  font-weight: 500;
}
</style>

<template>
  <div v-if="isMobile" class="mobileBlocker">
    <div class="mobileMessage">
      <img class="mobileLogo" src="../Assets/img/logo.png" alt="" />
      <p>目前僅支援電腦版使用</p>
      <p>Mobile devices are not supported.</p>
      <p>Please switch to a desktop.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const isMobile = ref(false);

onMounted(() => {
  const ua = navigator.userAgent;
  isMobile.value = /Mobi|Android|iPhone|iPad/i.test(ua);
});
</script>
