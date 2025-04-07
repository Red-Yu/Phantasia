<style scoped>
@import "../Assets/css/index.css";
/* @import "../Assets/css/main.css"; */

.loading-animation {
  position: absolute;
  /* max-width: 1440px; */
  width: 100%;
  height: 100%;
  z-index: 3000;
  pointer-events: none;
}

p {
  color: white;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  /* font-family: "Fanwood Text"; */
  /* font-variant: small-caps; */
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  pointer-events: auto;
  font-family: "Aleo";
  text-transform: uppercase;
  cursor: pointer;
}

/* .visitor,
.login {
  color: rgba(255, 255, 255, 0.6);
}

.visitor:hover,
.login:hover {
  color: white;
} */

.video-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 2000;
  overflow: hidden;
}

.startVideo {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 100%;
  /* z-index: 2500; */
  pointer-events: none;
}

.loading {
  position: absolute;
  z-index: 3000;
  bottom: 4%;
  right: 7%;
}

.start {
  position: absolute;
  z-index: 3000;
  transform: translate(-50%, -50%);
  top: 70%;
  left: 50%;
  display: flex;
  gap: 40px;
}

/* .start p {
  font-size: 44px;
  text-shadow: 3px 3px 4px rgba(0, 79, 59, 0.8);
} */

.start_btn {
  cursor: pointer;
  pointer-events: auto;
}

.btnKey-L.start_btn:hover {
  background-color: #284163;
  color: white;
}

.Administrator {
  position: absolute;
  z-index: 3000;
  bottom: 4%;
  right: 4%;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
}

.Administrator:hover {
  color: white;
}

.Administrator::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1.5px;
  width: 0;
  background-color: white;
  transition: width 0.4s ease;
  transform-origin: left;
}

.Administrator:hover::after,
.Administrator.active::after {
  width: 100%;
}

/* ==========影片========== */
.fade_Video-enter-active,
.fade_Video-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade_Video-enter,
.fade_Video-leave-to {
  opacity: 0;
}

/* 進場動畫 */
@keyframes boxFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 退場動畫 */
@keyframes boxFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 顯示 box 時的樣式 */
.box.show {
  animation: boxFadeIn 1.7s forwards;
}
.box.hide {
  opacity: 0;
  animation: boxFadeOut 1.5s forwards;
}

/* ===========ripple========== */

.rippleArea {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  z-index: 2501;
  background: transparent;
  /* pointer-events: none; */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>

<template>
  <!-- Login Modal -->
  <Login
    :isVisible="isLoginVisible"
    @close="closeLogin"
    @openSignup="openSignup"
    :startVideoElement="startVideoElement"
    @login-success="handleLoginSuccess"
  />

  <!-- Signup Modal -->
  <Signup
    :isVisible="isSignupVisible"
    @close="closeSignup"
    @openLogin="openLogin"
  />

  <transition name="fade_Video">
    <div
      v-show="isRippleArea"
      class="rippleArea box"
      :class="{
        show: isRippleArea == true,
        hide: isRippleArea == false,
      }"
    ></div>
  </transition>

  <div v-if="isLoading" class="loading-animation">
    <p class="loading">Now Loading...</p>
  </div>

  <div v-if="isStart" class="loading-animation">
    <div class="startWrapper start">
      <div class="btnKey-L dark-border start_btn">
        <span class="start_btn visitor" @click="startVideo">Visitor</span>
      </div>
      <div class="btnKey-L dark-border start_btn">
        <span class="start_btn login" @click="openModal">Login</span>
      </div>
    </div>
  </div>

  <div v-if="isStart" class="loading-animation">
    <p class="Administrator" @click="ToBackstage">Admin Panel</p>
  </div>

  <transition name="fade_Video">
    <div v-show="isVideo" class="video-container">
      <video
        ref="startVideoElement"
        src="../Assets/Day/video/start_video.webm"
        class="startVideo"
        @timeupdate="videoTimeUpdate"
      ></video>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Signup from "../views/Auth/Signup.vue";

// =================登入彈窗====================

// 控制顯示登入與註冊彈窗
const isLoginVisible = ref(false);
const isSignupVisible = ref(false);

// 打開彈窗的方法
const openModal = () => {
  isLoginVisible.value = true;
  // $(".rippleArea").ripples("destroy");
};

// 打開註冊彈窗的事件
const openSignup = () => {
  isLoginVisible.value = false;
  isSignupVisible.value = true;
};

// 打開登入彈窗
const openLogin = () => {
  isLoginVisible.value = true;
  isSignupVisible.value = false;
};

// 關閉彈窗的方法
const closeLogin = () => {
  isLoginVisible.value = false;
};

const closeSignup = () => {
  isSignupVisible.value = false;
};

// ==========================================

import "jquery.ripples";
import "lettering.js";
import "textillate";
import "animate.css";

const router = useRouter();
const isLoading = ref(true);
const isintroduction = ref(false);
const isStart = ref(false);
const isVideo = ref(false);
const videoShow = ref(true); //讓動畫出現時有過場
const isRippleArea = ref(false);

const startVideoElement = ref(null);

const startVideo = () => {
  isStart.value = false;
  // console.log(startVideoElement.value);

  setTimeout(() => {
    $(".rippleArea").ripples("destroy");
  }, 1700);

  if (startVideoElement.value) {
    startVideoElement.value.play(); // 開始播放影片
  }

  // setTimeout(() => {
  //   location.reload();
  // }, 5500);
};

// 登入成功後，隱藏啟動畫面
const handleLoginSuccess = () => {
  isStart.value = false; // 隱藏啟動畫面
};

// 處理影片播放進度
const videoTimeUpdate = () => {
  isRippleArea.value = false;

  const video = startVideoElement.value;

  setTimeout(() => {
    if (video && video.currentTime / video.duration > 0.85) {
      location.reload();
    }
  }, 100);

  setTimeout(() => {
    if (video && video.currentTime / video.duration > 0.91) {
      // 當影片播放超過 91%，觸發隱藏動畫
      isVideo.value = false;
    }
  }, 1900);
};

// 預加載圖片和影片
const preloadImagesAndVideos = () => {
  const preloadImages = [
    // 前景切換素材
    new URL(`../Assets/Day/bookRows_bgi_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/bookRows_bgi_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/pillar_left_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/pillar_left_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/pillar_right_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/pillar_right_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/platfrom_front_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/platfrom_front_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/lamp_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/lamp_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/lamp_day_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/lamp_night_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/boy_day_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/boy_night_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/boy_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/boy_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/book_day_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/book_night_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/book_day.png`, import.meta.url).href,
    new URL(`../Assets/Day/book_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_magic1.png`, import.meta.url).href,
    new URL(`../Assets/Day/night_magic1.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_magic2.png`, import.meta.url).href,
    new URL(`../Assets/Day/night_magic2.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_magic3.png`, import.meta.url).href,
    new URL(`../Assets/Day/night_magic3.png`, import.meta.url).href,

    //底層base素材
    new URL(`../Assets/Day/bookRows_lightoff.png`, import.meta.url).href,
    new URL(`../Assets/Day/piller_left_lightoff.png`, import.meta.url).href,
    new URL(`../Assets/Day/piller_right_lightoff.png`, import.meta.url).href,
    new URL(`../Assets/Day/platform_lightoff.png`, import.meta.url).href,

    // scroll素材
    new URL(`../Assets/Day/myCabin_scroll.png`, import.meta.url).href,
    new URL(`../Assets/Day/about_scroll.png`, import.meta.url).href,
    new URL(`../Assets/Day/creationCenter_scroll.png`, import.meta.url).href,
    new URL(`../Assets/Day/memberCenter_scroll.png`, import.meta.url).href,
    new URL(`../Assets/Day/storyBooks_scroll.png`, import.meta.url).href,

    // Day Night route素材
    // Day
    new URL(`../Assets/Day/day_base.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_sky.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_cloudLeft.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_cloudRight.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_skyCity_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/day_skyCity.png`, import.meta.url).href,

    // Night
    new URL(`../Assets/Day/night_river.png`, import.meta.url).href,
    new URL(`../Assets/Day/sky_night_base.png`, import.meta.url).href,
    new URL(`../Assets/Day/sky_night.png`, import.meta.url).href,
    new URL(`../Assets/Day/sky_night_moon.png`, import.meta.url).href,
    new URL(`../Assets/Day/sky_night_star.png`, import.meta.url).href,
    new URL(`../Assets/Day/sky_night_plantent.png`, import.meta.url).href,
    new URL(`../Assets/Day/left_castle_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/Right_castle_hover.png`, import.meta.url).href,
    new URL(`../Assets/Day/left_castle.png`, import.meta.url).href,
    new URL(`../Assets/Day/right_castle.png`, import.meta.url).href,
  ];

  // 影片素材
  const preloadVideos = [
    new URL(`../Assets/Day/video/start_video.webm`, import.meta.url).href,
    new URL(`../Assets/Day/video/day_transfer.webm`, import.meta.url).href,
    new URL(`../Assets/Day/video/night_transfer.webm`, import.meta.url).href,
    new URL(`../Assets/Day/video/dragon_video.webm`, import.meta.url).href,
    new URL(`../Assets/Day/video/sword_video.webm`, import.meta.url).href,
    new URL(`../Assets/Day/video/knight_video.webm`, import.meta.url).href,
  ];

  setTimeout(() => {
    // 使用 Promise 來確保所有資源加載完畢
    const imagePromises = preloadImages.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve; // 當圖片加載完成後，調用 resolve
        img.onerror = resolve; // 當圖片加載失敗後，也調用 resolve，確保進程繼續
      });
    });

    // 預加載影片
    const videoPromises = preloadVideos.map((src) => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.onloadeddata = resolve; // 當影片數據加載完成後，調用 resolve
        video.onerror = resolve; // 當影片加載失敗後，也調用 resolve，確保進程繼續
        video.load();
      });
    });

    // 等待所有圖片和影片加載完成
    Promise.all([...imagePromises, ...videoPromises]).then(() => {
      isLoading.value = false;
      // 當所有資源加載完成後，檢查 isVideo.value
      if (isVideo.value) {
        isStart.value = true; // 如果 isVideo 為 true，才設置 isStart 為 true
      } else {
        isStart.value = false; // 否則設置為 false
      }
    });
  }, 6000);
};

// 移除並重新附加 textillate 動畫 class
const resetTextillateAnimations = () => {
  // 重新初始化 textillate 動畫
  $(".title1").textillate("start");
};

const initializeRipples = () => {
  $(".rippleArea").ripples({
    resolution: 720,
    dropRadius: 12,
    perturbance: 0.02,
    interactive: true,
    cover: true,
    dropColor: "rgba(0, 255, 191, 0.5)",
    ripplesRadius: 25,
    effect: "complex",
    duration: 400,
    imageUrl: new URL("../Assets/Day/startImg.jpg", import.meta.url).href,
  });
};

const backToEntrance = () => {
  isVideo.value = true;

  setTimeout(() => {
    isStart.value = true;
  }, 1000);

  setTimeout(() => {
    isRippleArea.value = true;
  }, 150);

  startVideoElement.value.currentTime = 0;
  initializeRipples();
};

const handleBeforeUnload = (event) => {
  // 設置標記為 'true'，表示頁面即將關閉
  sessionStorage.setItem("pageClosed", "true");
};

// // 在beforeunload事件中設置標記，標記是否關閉了頁面
// window.addEventListener("beforeunload", (event) => {
//   // 設置標記為 'closed'，表示頁面即將關閉
//   sessionStorage.setItem("pageClosed", "true");
// });

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
  // isVideo.value = true;
  // videoShow.value = true;
  // isRippleArea.value = true;

  nextTick(() => {
    // 確保所有 DOM 更新完成
    initializeRipples();
  });

  nextTick(() => {
    $(".loading").textillate({
      in: {
        effect: "flip",
        sequence: true,
        delay: 120,
      },
      out: {
        effect: "flip", // 離開效果
        delay: 120, // 動畫延遲
      },
      loop: true,
    });

    $(".start").textillate({
      in: {
        effect: "fadeIn",
        sequence: true,
        delay: 50,
      },
    });
  });

  $(".flipInY").textillate({
    in: {
      effect: "flipInY",
      shuffle: true,
      delay: 60,
    },
  });

  // 檢查 sessionStorage 中的標記來決定是否顯示動畫
  const isPageClosed = sessionStorage.getItem("pageClosed");

  // 如果標記為 'true'，表示是關閉頁面後重新打開
  if (isPageClosed) {
    sessionStorage.removeItem("pageClosed"); // 移除標記
    isLoading.value = false;
    isStart.value = false;
    isVideo.value = false;
    isRippleArea.value = false;

    setTimeout(() => {
      $(".rippleArea").ripples("destroy");
    }, 200);
  } else {
    isLoading.value = true;
    isVideo.value = true;
    isRippleArea.value = true;
  }

  // 檢查 sessionStorage 中是否有標記，決定是否顯示 Preload 動畫
  if (!sessionStorage.getItem("animationShown")) {
    // 設置標記，防止下次進來還顯示動畫
    sessionStorage.setItem("animationShown", "true");
    // 預加載影片和圖片
    preloadImagesAndVideos();
  } else {
    // 如果已經標記過
    isLoading.value = false;
    isStart.value = false;
    isVideo.value = false;
    isRippleArea.value = false;
  }
});

// 監聽頁面卸載
window.addEventListener("beforeunload", (event) => {
  console.log("Before unload triggered");
  // 檢查是否是路由導航
  if (!sessionStorage.getItem("isNavigating")) {
    // 如果不是路由導航，才執行清理操作
    console.log("Clearing animationShown");
    sessionStorage.removeItem("animationShown");
  }
});

// // 設置標記為 'isNavigating' 來標示是否是路由導航
// const clearNavigationFlag = () => {
//   sessionStorage.setItem("isNavigating", "true");
// };

// // 清除導航標記
// const resetNavigationFlag = () => {
//   sessionStorage.removeItem("isNavigating");
// };

// // 使用 Vue Router 的導航守衛進行清理
// router.beforeEach((to, from, next) => {
//   // 設置標記，表示正在進行路由導航
//   clearNavigationFlag();
//   next();
// });

router.beforeEach((to, from, next) => {
  // 避免第一次路由切換時執行動畫邏輯
  if (!sessionStorage.getItem("isNavigating")) {
    sessionStorage.setItem("isNavigating", "true");
    // 如果是第一次進行路由導航，保證不觸發動畫
    next();
  } else {
    next();
  }
});

// 當路由完成時，重置該標記
router.afterEach((to, from) => {
  // 當路由完成時，重置標記
  sessionStorage.removeItem("isNavigating");
});

const ToBackstage = () => {
  router.push("/BKMember");
};

defineExpose({
  backToEntrance,
});
</script>
