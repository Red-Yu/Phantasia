<style scoped>
.loading-animation {
  position: absolute;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  z-index: 3000;
  pointer-events: none;
}

p {
  color: white;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  font-family: "Fanwood Text";
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-variant: small-caps;
  position: absolute;
  /* transform: translate(-50%, -50%); */
  bottom: 4%;
  right: 7%;
  z-index: 3000;
  pointer-events: auto;
}

.video-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 2500;
  overflow: hidden;
}

.startVideo {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 100%;
  z-index: 2500;
}

.start_btn {
  cursor: pointer;
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
    <p class="start_btn start" @click="startVideo">Start</p>
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
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

// import "jquery.ripples";
// import "lettering.js";
// import "textillate";
// import "animate.css";

const router = useRouter();
const isLoading = ref(true);
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
};

// 處理影片播放進度
const videoTimeUpdate = () => {
  isRippleArea.value = false;

  const video = startVideoElement.value;
  setTimeout(() => {
    if (video && video.currentTime / video.duration > 0.91) {
      // 當影片播放超過 95%，觸發隱藏動畫
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
      isStart.value = true;
    });
  }, 3000);
};

onMounted(() => {
  isVideo.value = true;
  videoShow.value = true;
  isRippleArea.value = true;

  nextTick(() => {
    // 確保所有 DOM 更新完成
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

  // 檢查 sessionStorage 中是否有標記，決定是否顯示 Preload 動畫
  if (!sessionStorage.getItem("animationShown")) {
    // 設置標記，防止下次進來還顯示動畫
    sessionStorage.setItem("animationShown", "true");
    // 預加載影片和圖片
    preloadImagesAndVideos();
  } else {
    // 如果已經標記過，直接顯示 Start 按鈕
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

// 設置標記為 'isNavigating' 來標示是否是路由導航
const clearNavigationFlag = () => {
  sessionStorage.setItem("isNavigating", "true");
};

// 清除導航標記
const resetNavigationFlag = () => {
  sessionStorage.removeItem("isNavigating");
};

// 使用 Vue Router 的導航守衛進行清理
router.beforeEach((to, from, next) => {
  // 設置標記，表示正在進行路由導航
  clearNavigationFlag();
  next();
});

// 當路由完成時，重置該標記
router.afterEach((to, from) => {
  // 重置標記，表示導航已經完成
  resetNavigationFlag();
});
</script>
