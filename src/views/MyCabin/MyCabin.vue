<style scoped>
@import "../../Assets/css/index.css";

/* ==========滑動效果========== */

.slideArea {
  transition: transform 0.7s ease-in-out, opacity 0.5s ease-in-out;
}

.slideArea.sliding {
  transform: translateX(-2200px);
  opacity: 0;
}
</style>

<template>
  <BlackCover />

  <div class="blackWrapper">
    <div :class="['wrapper slideArea', { sliding: isSliding }]">
      <div class="myCabinContent">
        <div class="slogon">
          <h1 class="title1 flipInY">My Cabin</h1>
          <h6 class="title3 rollIn">
            This is your cabin. Try clicking on the characters and bookshelve in
            the picture!
          </h6>
        </div>

        <div class="menu">
          <div class="backToHome_button">
            <button @click="backToHome" class="btnLink white backToHome menuIn">
              Back to home
            </button>
          </div>
        </div>
      </div>

      <!-- ====================背景圖片======================= -->

      <div class="positionArea">
        <div class="main_container" ref="parallaxContainer">
          <div class="parallax-wrapper" data-depth="0.02">
            <img
              src="../../Assets/Day/myCabin/myCabinBaseDark.jpg"
              alt=""
              class="myCabinBaseDark"
            />
            <img
              src="../../Assets/Day/myCabin/myCabinBaseLight.jpg"
              alt=""
              class="myCabinBaseLight"
            />
          </div>

          <div class="parallax-wrapper" data-depth="0.03">
            <div class="hoverAreaBookcase"></div>
            <img
              src="../../Assets/Day/myCabin/bookCase_hover.png"
              alt=""
              class="bookCase_hover"
            />
            <img
              src="../../Assets/Day/myCabin/bookCase.png"
              alt=""
              class="bookCase"
            />
          </div>

          <div class="parallax-wrapper" data-depth="0.05">
            <div class="characterWrapper">
              <img
                src="../../Assets/Day/myCabin/character115x409_hover.png"
                alt=""
                class="character_hover"
              />

              <img
                src="../../Assets/Day/myCabin/character115x409.png"
                alt=""
                class="character"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.035">
            <div class="elfWrapper">
              <img
                src="../../Assets/Day/myCabin/elf183x291_hover.png"
                alt=""
                class="elf_hover"
                @click="ToMyRewardCard"
              />
              <img
                src="../../Assets/Day/myCabin/elf183x291.png"
                alt=""
                class="elf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Parallax from "parallax-js";
import { useRouter } from "vue-router";
import BlackCover from "../../components/BlackCover.vue";

const parallaxContainer = ref(null);
const router = useRouter();

const isSliding = ref(false);

const backToHome = () => {
  isSliding.value = true;

  setTimeout(() => {
    router.push("/");
  }, 375);
};

const ToMyRewardCard = () => {
  router.push("/MyCabin/MyRewardCard");
};

onMounted(() => {
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
</script>
