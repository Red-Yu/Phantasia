<template>
  <div class="footer">
    <div class="container">
      <div class="accordion">
        <!-- 按鈕改為直向排列 -->
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

      <div class="logoGroup" @click="backToHome">
        <img src="../Assets/img/Logo_Stars.png" class="logo stars" />
        <img src="../Assets/img/Logo_Book.png" class="logo book" />
        <img src="../Assets/img/Logo_Text.png" class="logo text" />
        <div class="textMaskBox"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// 使用 Vue Router
const router = useRouter();

// 定義按鈕選單
const menuItems = ref([
  { label: "About Us", link: "/about" },
  { label: "Products", link: "/Products" },
  { label: "MyCabin", link: "/MyCabin" },
  { label: "Create", link: "/CreateProject" },
  { label: "MemberCenter", link: "/MemberCenter" },
]);
// 回首頁
const backToHome = () => {
  setTimeout(() => {
    router.push("/");
  }, 375);
};

// 按鈕點擊導航
function navigate(link) {
  if (link.startsWith("http")) {
    window.location.href = link; // 外部網站直接跳轉
  } else {
    router.push(link); // 內部 Vue Router 跳轉
  }
}

// 監聽滾動效果
const scrollEffect = () => {
  const buttons = document.querySelectorAll(".accordion-btn");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.5 } // 進入視野 80% 時觸發
  );

  buttons.forEach((button) => observer.observe(button));
};

// 確保 DOM 加載完成後執行
onMounted(() => {
  scrollEffect();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Aleo:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fanwood+Text:ital@0;1&display=swap");
.container {
  width: 100%;
  margin: 0 auto;
  padding: 3vw 0;
  background-color: #153243;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* 按鈕直向排列 */
.accordion {
  width: 80vw;
  margin: 0 auto;
  display: block; /* 讓每個按鈕獨立成一行 */
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
button.active {
  animation: fadeIn 1s ease;
}
.accordion-btn {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  cursor: pointer;
  position: relative;
  margin-bottom: 30px; /* 按鈕之間的間距 */
  /* font */
  font-family: "Fanwood Text";
  font-variant: small-caps;
  letter-spacing: 1px;
  font-size: 24px;
  font-weight: 500;
  color: #f9faf9;
}

/* 按鈕 hover 底線效果 */
.accordion-btn::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: #f9faf9;
  transition: width 0.4s ease-in-out, left 0.4s ease-in-out;
  transition-duration: 1s;
  transform: translateX(-50%);
}

/* 滑鼠懸停時的樣式 */
.accordion-btn:hover {
  color: #eead50;
}

.accordion-btn.active::after {
  width: 100%;
}

/* LOGO  */
.logoGroup {
  height: 200px;
  width: 200px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.textMaskBox {
  position: absolute;
  width: 90%;
  height: 40px;
  overflow: hidden;
  bottom: 0;
}
.textMask {
  position: relative;
  width: calc(100px - 6px);
}
.textMaskBox::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #153243;
  mask-image: linear-gradient(to right, transparent, #153243);
  opacity: 0;
}
@keyframes glowOnce {
  0% {
    opacity: 50%;
  }
  25% {
    opacity: 90%;
  } /* 變亮 */
  50% {
    opacity: 30%;
  }
  100% {
    opacity: 100%;
  } /* 回到原本透明度 */
}
@keyframes reveal {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.logoGroup:hover {
  .stars {
    animation: glowOnce 3s cubic-bezier(0.59, -0.12, 0.13, 1.14);
  }
  .textMaskBox::after {
    opacity: 1; /* 讓方塊出現 */
    animation: reveal 3s cubic-bezier(0.59, -0.12, 0.13, 1.14);
  }
}
</style>
