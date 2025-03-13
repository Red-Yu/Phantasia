<template>
  <div class="footer">
    <div class="footer-snow-container"></div>
    <nav>
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <a :href="item.link">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
    <div class="footer-logo">
      <img src="../Assets/img/Logo_white.png" alt="Phantasia Logo" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 定義 menuItems
const menuItems = ref([
  { label: "ABOUT US", link: "/about" },
  { label: "CREATE STORY", link: "/create-story" },
  { label: "MY PAGE", link: "/mypage" },
  { label: "STORIES", link: "/stories" },
  { label: "FACEBOOK", link: "/facebook" },
  { label: "INSTAGRAM", link: "/instagram" },
]);

// 雪花動畫
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  document.querySelector(".footer-snow-container").appendChild(snowflake);

  const size = Math.random() * 10 + 5;
  const startPosition = Math.random() * window.innerWidth;
  const duration = Math.random() * 5 + 3;

  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${startPosition}px`;
  snowflake.style.animationDuration = `${duration}s`;

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

onMounted(() => {
  setInterval(createSnowflake, 100); // 每 100ms 生成一個雪花
});
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
}

.footer-snow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

nav ul {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  transition: 0.3s;
}

nav ul li a:hover {
  color: #ffcc00;
}

.footer-logo {
  margin-top: 30px;
  text-align: center;
}

.footer-logo img {
  max-width: 200px;
  display: inline-block;
}
</style>
