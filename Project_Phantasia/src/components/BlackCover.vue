<style scoped>
.blackCover {
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: black;
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
}
</style>

<template>
  <div ref="blackCover" class="blackCover"></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
const blackCover = ref(null);

onMounted(() => {
  nextTick(() => {
    if (blackCover.value) {
      setTimeout(() => {
        blackCover.value.style.opacity = 0; // 或者將 opacity 設為你想要的值
      }, 10);
    }
  });
});
</script>
