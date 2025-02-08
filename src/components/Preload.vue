<template>
  <!-- 可選：顯示預加載的動畫或進度條 -->
  <!-- <div v-if="isLoading" class="loading-animation">
    <p>Loading...</p>
  </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

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
    new URL(`../Assets/Day/video/day_transfer.webm`, import.meta.url).href,
    new URL(`../Assets/Day/video/night_transfer.webm`, import.meta.url).href,
  ];

  // 預加載圖片
  preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // 預加載影片
  preloadVideos.forEach((src) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "auto"; // 預加載影片
    video.load();
  });
};

onMounted(() => {
  preloadImagesAndVideos(); // 預加載圖片和影片

  // 假設預加載完畢後，顯示內容並隱藏loading動畫
  setTimeout(() => {
    isLoading.value = false;
  }, 3000); // 這裡可以根據實際需求來調整時間
});
</script>

<style scoped>
.loading-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #fff;
}
</style>
