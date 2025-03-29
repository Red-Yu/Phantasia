<style scoped>
@import "../Assets/css/index.css";
</style>

<template>
  <!-- ===========================白天=========================== -->

  <div class="wrapper">
    <!-- <img src="../Assets/Day/bookRows_bgi_day.png" alt="" class="bgBook" /> -->

    <div class="positionArea">
      <div class="main_container" ref="parallaxContainer">
        <div class="parallax-wrapper" data-depth="0.12">
          <img src="../Assets/Day/day_base.png" alt="" class="base" />
        </div>
        <div class="parallax-wrapper" data-depth="0.1">
          <img src="../Assets/Day/day_sky.png" alt="" class="sky" />
        </div>
        <div class="parallax-wrapper" data-depth="0.3">
          <img
            src="../Assets/Day/day_cloudLeft.png"
            alt=""
            class="cloud cloud_left"
          />
        </div>

        <div class="parallax-wrapper" data-depth="0.25">
          <img
            src="../Assets/Day/day_cloudRight.png"
            alt=""
            class="cloud cloud_right"
          />
        </div>

        <div class="parallax-wrapper" data-depth="0.1">
          <div class="hoverAreaSkyCity" @click="StoryBooks"></div>
          <img
            src="../Assets/Day/day_skyCity_hover.png"
            alt=""
            class="skyCity img_hover"
          />
          <img
            src="../Assets/Day/storyBooks_scroll.png"
            alt=""
            class="storyBooks_scroll scroll"
          />
          <img src="../Assets/Day/day_skyCity.png" alt="" class="skyCity" />
        </div>

        <!-- 
        <div class="parallax-wrapper" data-depth="0.11">
          <img
            src="../Assets/Day/pillar_left_day.png"
            alt=""
            class="pillar pillar_left"
          />
        </div> -->

        <!-- <div class="parallax-wrapper" data-depth="0.11">
          <img
            src="../Assets/Day/pillar_right_day.png"
            alt=""
            class="pillar pillar_right"
          />
        </div> -->
        <!-- 
        <div class="parallax-wrapper" data-depth="0.05">
          <img
            src="../Assets/Day/platfrom_front_day.png"
            alt=""
            class="platform"
          />
        </div> -->

        <!-- <div class="parallax-wrapper" data-depth="0.05">
          <a href="" class="hoverAreaLamp"></a>
          <img
            src="../Assets/Day/lamp_day_hover.png"
            alt=""
            class="lamp img_hover"
          /> -->

        <!-- <img src="../Assets/Day/lamp_day.png" alt="" class="lamp" />
        </div> -->

        <!-- <div class="parallax-wrapper" data-depth="0.05">
          <a href="" class="hoverAreaBoy">
            <div class="hoverAreaBoy1"></div>
            <div class="hoverAreaBoy2"></div>
          </a>
          <img
            src="../Assets/Day/boy_day_hover.png"
            alt=""
            class="boy img_hover"
          />
          <img
            src="../Assets/Day/myCabin_scroll.png"
            alt=""
            class="myCabin_scroll scroll"
          />
          <img src="../Assets/Day/boy_day.png" alt="" class="boy" />
        </div> -->
        <!-- 
        <div class="parallax-wrapper" data-depth="0.05">
          <div class="hoverAreaBook" @click="ToAbout"></div>
          <img
            src="../Assets/Day/book_day_hover.png"
            alt=""
            class="book img_hover"
          />
          <img
            src="../Assets/Day/about_scroll.png"
            alt=""
            class="about_scroll scroll"
          />
          <div class="magic">
            <img
              src="../Assets/Day/day_magic1.png"
              alt=""
              class="about_magic1"
              style="z-index: 920"
            />
            <img
              src="../Assets/Day/day_magic2.png"
              alt=""
              class="about_magic2"
              style="z-index: 910"
            />
            <img
              src="../Assets/Day/day_magic3.png"
              alt=""
              class="about_magic3"
              style="z-index: 900"
            />
          </div> -->

        <!-- <img src="../Assets/Day/book_day.png" alt="" class="book" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Parallax from "parallax-js";
import { useRouter } from "vue-router";

const parallaxContainer = ref(null);
const router = useRouter();

onMounted(() => {
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
});

const StoryBooks = () => {
  router.push("/Products");
};

// document.addEventListener("DOMContentLoaded", function () {
//   var scene = document.querySelector(".main_container");
//   var parallaxInstance = new Parallax(scene, {
//     relativeInput: true, // 啟用相對滑鼠位置偏移
//     hoverOnly: true, // 只在滑鼠懸停時啟動 Parallax
//     originY: 0,
//     originX: 0.8,
//     scalarX: 5.5, // 水平方向移動幅度是滑鼠移動的一半
//     scalarY: 6.5, // 垂直方向移動幅度是滑鼠移動的一半
//   });
// });
</script>
