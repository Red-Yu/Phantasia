<style scoped>
@import "../Assets/css/index.css";

/* 當圖片進場時和離場時的過渡效果 */
/* ==========燈========== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.8s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* ==========其它前景========== */

.fade_slow-enter-active,
.fade_slow-leave-active {
  transition: opacity 2.45s ease-in-out;
}

.fade_slow-enter,
.fade_slow-leave-to {
  opacity: 0;
}

/* ==========影片========== */
.fade_Video-enter-active,
.fade_Video-leave-active {
  transition: opacity 0.6s ease-in-out;
}

.fade_Video-enter,
.fade_Video-leave-to {
  opacity: 0;
}

/* ==========滑動效果========== */

.slideArea {
  transition: transform 0.9s ease-in-out, opacity 0.75s ease-in-out;
}

.slideArea.sliding {
  transform: translateX(-2200px);
  opacity: 0;
}
.blackCover {
  transition: opacity 0.8s ease-in-out;
}
</style>

<template>
  <Preload />

  <!-- ===================首頁共用組件(前景)===================== -->

  <div ref="blackCover" class="blackCover"></div>

  <div class="blackWrapper">
    <div style="background-color: rgba(255, 255, 255, 0)" class="wrapper">
      <div :class="['slideArea', { sliding: isSliding }]">
        <transition name="fade_slow" mode="out-in">
          <img v-show="showImage" :src="bgBook" alt="" class="bgBook" />
        </transition>
        <img
          style="z-index: 300"
          src="../Assets/Day/bookRows_lightoff.png"
          alt=""
          class="bgBook"
        />

        <div class="positionArea">
          <div class="main_container" ref="parallaxContainer">
            <div class="parallax-wrapper" data-depth="0.11">
              <img
                src="../Assets/Day/piller_left_lightoff.png"
                alt=""
                class="pillar pillar_left"
              />
            </div>
            <transition name="fade_slow" mode="in-out">
              <div
                v-show="showImage"
                class="parallax-wrapper"
                data-depth="0.11"
              >
                <img :src="pillar_left" alt="" class="pillar pillar_left" />
              </div>
            </transition>

            <div class="parallax-wrapper" data-depth="0.11">
              <img
                src="../Assets/Day/piller_right_lightoff.png"
                alt=""
                class="pillar pillar_right"
              />
            </div>
            <transition name="fade_slow" mode="in-out">
              <div
                v-show="showImage"
                class="parallax-wrapper"
                data-depth="0.11"
              >
                <img :src="pillar_right" alt="" class="pillar pillar_right" />
              </div>
            </transition>

            <div class="parallax-wrapper" data-depth="0.05">
              <img
                src="../Assets/Day/platform_lightoff.png"
                alt=""
                class="platform"
              />
            </div>

            <transition name="fade_slow" mode="in-out">
              <div
                v-show="showImage"
                class="parallax-wrapper"
                data-depth="0.05"
              >
                <img :src="platform" alt="" class="platform" />
              </div>
            </transition>

            <transition
              name="fade"
              @after-enter="isButtonDisabled = false"
              mode="in-out"
            >
              <div
                v-show="showImage"
                class="parallax-wrapper"
                data-depth="0.05"
              >
                <button
                  @click="toggleDayNight"
                  :disabled="isButtonDisabled"
                  class="hoverAreaLamp"
                ></button>
                <img :src="lamp_hover" alt="" class="lamp img_hover" />

                <img :src="lamp" alt="" class="lamp" />
              </div>
            </transition>
            <transition name="fade_slow" mode="in-out">
              <div
                v-show="showImage"
                class="parallax-wrapper"
                data-depth="0.05"
              >
                <div class="hoverAreaBoy" @click="ToCabin">
                  <div class="hoverAreaBoy1"></div>
                  <div class="hoverAreaBoy2"></div>
                </div>
                <img :src="boy_hover" alt="" class="boy img_hover" />
                <img
                  src="../Assets/Day/myCabin_scroll.png"
                  alt=""
                  class="myCabin_scroll scroll"
                />
                <img :src="boy" alt="" class="boy" />
              </div>
            </transition>
            <transition name="fade_slow" mode="in-out">
              <div
                v-show="showImage"
                class="parallax-wrapper"
                data-depth="0.05"
              >
                <div class="hoverAreaBook" @click="ToAbout"></div>
                <img :src="book_hover" alt="" class="book img_hover" />
                <img
                  src="../Assets/Day/about_scroll.png"
                  alt=""
                  class="about_scroll scroll"
                />
                <div class="magic">
                  <img
                    :src="magic1"
                    alt=""
                    class="about_magic1"
                    style="z-index: 920"
                  />
                  <img
                    :src="magic2"
                    alt=""
                    class="about_magic2"
                    style="z-index: 910"
                  />
                  <img
                    :src="magic3"
                    alt=""
                    class="about_magic3"
                    style="z-index: 900"
                  />
                </div>
                <img :src="book" alt="" class="book" />
              </div>
            </transition>
          </div>
        </div>
        <main>
          <!-- 顯示子頁面內容 -->
          <router-view></router-view>
        </main>

        <transition name="fade_Video">
          <video
            v-show="showVideo_day"
            ref="dayTransferVideo"
            @ended="showVideo_day = false"
            preload="auto"
            height="100vh"
            class="dayTransferVideo"
          >
            <source src="../Assets/Day/video/day_transfer.webm" />
            <!-- 您的瀏覽器不支援影片播放。 -->
          </video>
        </transition>

        <transition name="fade_Video">
          <video
            v-show="showVideo_night"
            ref="nightTransferVideo"
            @ended="showVideo_night = false"
            preload="auto"
            height="100vh"
            class="nightTransferVideo"
          >
            <source src="../Assets/Day/video/night_transfer.webm" />
            <!-- 您的瀏覽器不支援影片播放。 -->
          </video>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch, onBeforeUnmount } from "vue";
import Parallax from "parallax-js";
import { useRouter } from "vue-router";
import Preload from "../components/Preload.vue";
import { nextTick } from "vue";

const blackCover = ref(null);
const parallaxContainer = ref(null);
const router = useRouter();
// const isPreloading = ref(null);

const day = ref(true);
const showImage = ref(true);
const showVideo_day = ref(false);
const showVideo_night = ref(false);
const isButtonDisabled = ref(false);
const day_night = computed(() => (day.value ? "day" : "night"));

const dayTransferVideo = ref(null);
const nightTransferVideo = ref(null);

const isSliding = ref(false);

//===============動態加載圖片================
const bgBook = ref("");
const pillar_left = ref("");
const pillar_right = ref("");
const platform = ref("");
const lamp = ref("");
const lamp_hover = ref("");
const boy_hover = ref("");
const boy = ref("");
const book_hover = ref("");
const book = ref("");
const magic1 = ref("");
const magic2 = ref("");
const magic3 = ref("");

const updateImagePaths = (newDayNight) => {
  bgBook.value = new URL(
    `../Assets/Day/bookRows_bgi_${newDayNight}.png`,
    import.meta.url
  ).href;
  pillar_left.value = new URL(
    `../Assets/Day/pillar_left_${newDayNight}.png`,
    import.meta.url
  ).href;
  pillar_right.value = new URL(
    `../Assets/Day/pillar_right_${newDayNight}.png`,
    import.meta.url
  ).href;
  platform.value = new URL(
    `../Assets/Day/platfrom_front_${newDayNight}.png`,
    import.meta.url
  ).href;
  lamp.value = new URL(
    `../Assets/Day/lamp_${newDayNight}.png`,
    import.meta.url
  ).href;
  lamp_hover.value = new URL(
    `../Assets/Day/lamp_${newDayNight}_hover.png`,
    import.meta.url
  ).href;
  boy_hover.value = new URL(
    `../Assets/Day/boy_${newDayNight}_hover.png`,
    import.meta.url
  ).href;
  boy.value = new URL(
    `../Assets/Day/boy_${newDayNight}.png`,
    import.meta.url
  ).href;
  book_hover.value = new URL(
    `../Assets/Day/book_${newDayNight}_hover.png`,
    import.meta.url
  ).href;
  book.value = new URL(
    `../Assets/Day/book_${newDayNight}.png`,
    import.meta.url
  ).href;
  magic1.value = new URL(
    `../Assets/Day/${newDayNight}_magic1.png`,
    import.meta.url
  ).href;
  magic2.value = new URL(
    `../Assets/Day/${newDayNight}_magic2.png`,
    import.meta.url
  ).href;
  magic3.value = new URL(
    `../Assets/Day/${newDayNight}_magic3.png`,
    import.meta.url
  ).href;
};
//===============================================

// 監控 day_night 的變化
watch(day_night, (newDayNight) => {
  updateImagePaths(newDayNight); // 當 day_night 改變時更新圖片路徑
});

const toggleDayNight = () => {
  isButtonDisabled.value = true;
  showImage.value = false; // 先隱藏圖片
  const currentRoute = router.currentRoute.value.path;

  //  白天晚上圖片切換
  setTimeout(() => {
    day.value = !day.value; // 改變白天/夜晚
    showImage.value = true; // 再顯示圖片
  }, 1800); // x秒後切換圖片

  //  白天晚上路由切換
  setTimeout(() => {
    const newRoute = currentRoute === "/day" ? "/night" : "/day"; // 根據當前路由決定切換的目標
    router.push(newRoute); // 切換路由
  }, 700);

  //  白天晚上影片切換

  if (day.value) {
    // 白天播放影片
    showVideo_day.value = true; // 顯示影片
    showVideo_night.value = false; // 隱藏夜晚影片
    dayTransferVideo.value.play();
  } else {
    // 夜晚播放影片
    showVideo_night.value = true; // 顯示影片
    showVideo_day.value = false; // 隱藏白天影片
    nightTransferVideo.value.play();
  }
};

onMounted(() => {
  // console.log(sessionStorage.getItem("animationShown"));
  // // 檢查 sessionStorage，判斷是否是第一次訪問
  // if (!sessionStorage.getItem("animationShown")) {
  //   isPreloading.value = true;
  // } else {
  //   isPreloading.value = false;
  // }
  // sessionStorage.removeItem("animationShown");

  nextTick(() => {
    if (blackCover.value) {
      blackCover.value.style.opacity = 0; // 或者將 opacity 設為你想要的值
    }
  });
  // 確保 DOM 內容加載完成後執行 Parallax 初始化
  if (parallaxContainer.value) {
    // 初始化 Parallax 實例
    const scene = parallaxContainer.value;
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true, // 啟用相對滑鼠位置偏移
      hoverOnly: true, // 只在滑鼠懸停時啟動 Parallax
      originY: 0,
      originX: 0.8,
      scalarX: 5.5, // 水平方向移動幅度是滑鼠移動的一半
      scalarY: 6.5, // 垂直方向移動幅度是滑鼠移動的一半
    });
  }

  const currentHour = new Date().getHours();
  if (currentHour >= 18 || currentHour < 6) {
    day.value = false;
  } else {
    day.value = true;
  }

  updateImagePaths(day_night.value);

  router.push(`/${day.value ? "day" : "night"}`);

  // =========textillate=========
});

// ========保持過場影片加載(避免過場卡頓)==========
const intervalId = setInterval(() => {
  // 檢查是否影片是處於播放中，如果是，就不會觸發 load
  if (dayTransferVideo.value.paused || dayTransferVideo.value.ended) {
    dayTransferVideo.value.load(); // 如果影片沒播放或已結束，進行加載
    console.log(`日間過場影片重新加載..`);
  }

  if (nightTransferVideo.value.paused || nightTransferVideo.value.ended) {
    nightTransferVideo.value.load(); // 如果影片沒播放或已結束，進行加載
    console.log(`夜間過場影片重新加載..`);
  }
}, 10000); // 每10秒重新加載

// 在組件卸載前清除 interval 以避免記憶體泄漏
onBeforeUnmount(() => {
  clearInterval(intervalId); // 清除 interval
});

// ========router.push==========

const ToCabin = () => {
  router.push("/MyCabin");
};

const ToAbout = () => {
  isSliding.value = true;

  setTimeout(() => {
    router.push("/About");
  }, 450);
};
</script>
