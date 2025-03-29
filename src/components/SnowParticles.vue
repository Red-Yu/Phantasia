<template>
  <div class="snow-particles-overlay"></div>
</template>

<script setup>
// 無需特別邏輯，單純樣式元件
</script>

<style scoped>
.snow-particles-overlay {
  position: absolute ;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
  opacity: 0.6;
  background-image:
    radial-gradient(circle at 20% 35%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 75% 44%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 46% 52%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 35% 85%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 62% 67%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 82% 77%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 20% 35%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 75% 44%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 46% 52%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 35% 85%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 62% 67%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px),
    radial-gradient(circle at 82% 77%, rgba(255, 255, 255, 0.35) 1.2px, transparent 1.2px);

  background-size: 120px 120px;
  animation: floating-snow-particles 15s linear infinite;
}

@keyframes floating-snow-particles {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 55px 55px;
  }
  100% {
    background-position: 110px 110px;
  }
}
</style>
