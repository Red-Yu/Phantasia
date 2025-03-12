<<<<<<< HEAD
<!-- Layout.vue (共用佈局組件) -->

<template>
  <BlackCover />
  <div class="nightLayout">
    <div class="bgd-wrapper"></div>

    <!-- Header -->
    <Header type="night" />


    <!-- 子頁面顯示區域 -->
    <div class="wrapper">
      <main>
        <router-view> </router-view>
      </main>
      <!-- 頁面共用尾部 -->
      <footer></footer>
=======
<template>
  <div class="snow-container"></div>
  <!-- 雪花效果 -->

  <div class="container">
    <div class="accordion">
      <button
        v-for="(item, index) in menuItems"
        :key="index"
        class="accordion-btn"
        @click="navigate(item.link)"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- LOGO -->
    <div class="footer-logo">
      <img src="/src/Assets/img/membercenter/footer.png" alt="Phantasia Logo" />
>>>>>>> 759941c1590b0d577497c53683ea30500aac84de
    </div>
  </div>
</template>

<<<<<<< HEAD
<script setup>
import BlackCover from "../components/BlackCover.vue";
import Header from "../components/Header.vue";
=======

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const menuItems = [
  { label: "ABOUT US", link: "About.vue" },
      { label: "CREATE STORY", link: "" },
      { label: "MY PAGE", link: "" },
      { label: "STORIES", link: "Products.vue" },
      { label: "FACEBOOK", link: "facebook.html" },
      { label: "INSTAGRAM", link: "instagram.html" },
];

// 按鈕跳轉功能
const navigate = (link) => {
      window.location.href = link;
};

// 雪花效果
const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      document.querySelector(".snow-container").appendChild(snowflake);

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
      setInterval(createSnowflake, 100);
});

return {
      menuItems,
      navigate,
};
>>>>>>> 759941c1590b0d577497c53683ea30500aac84de
</script>

<style scoped lang="scss">
/* 主要內容區塊 */
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 3vw 0;
}

/* 按鈕樣式 */
.accordion {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.accordion-btn {
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 1.5vw;
  font-weight: 700;
  background-color: #243b55;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.accordion-btn:hover {
  color: #f8e8a6;
}

/* LOGO 區塊 */
.footer-logo {
  margin-top: 30px;
  text-align: center;
}

.footer-logo img {
  max-width: 200px;
  display: inline-block;
}

/* 雪花特效 */
.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.snowflake {
  position: absolute;
  top: -10px;
  background: white;
  width: 5px;
  height: 5px;
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
