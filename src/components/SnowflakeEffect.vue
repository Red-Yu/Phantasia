<template>
  <div ref="snowContainer" class="snow-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const snowContainer = ref(null);
let intervalId = null;

const createSnowflake = () => {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowContainer.value.appendChild(snowflake);

  const size = Math.random() * 5 + 2;
  const startPosition = Math.random() * window.innerWidth;
  const duration = Math.random() * 5 + 2;

  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${startPosition}px`;
  snowflake.style.animationDuration = `${duration}s`;

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
};

onMounted(() => {
  console.log("SNOWFLAKE EFFECT MOUNTED");
  intervalId = setInterval(createSnowflake, 200);
});

onBeforeUnmount(() => {
  console.log("SNOWFLAKE EFFECT UNMOUNTED");
  clearInterval(intervalId);
});
</script>

<style>
.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999999999;
}

.snowflake {
  position: absolute;
  top: -10px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100vh);
  }
}
</style>
