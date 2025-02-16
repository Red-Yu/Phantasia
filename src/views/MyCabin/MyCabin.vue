<style scoped>
@import "../../Assets/css/index.css";
</style>

<template>
  <BlackCover />

  <div class="blackWrapper">
    <div style="background-color: rgba(255, 255, 255, 0)" class="wrapper">
      <!-- <img
        style="z-index: 300"
        src="../../Assets/Day/bookRows_bgi_day.png"
        alt=""
        class="bgBook"
      /> -->

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
import { onMounted, ref, nextTick } from "vue";
import Parallax from "parallax-js";
import { useRouter } from "vue-router";
import BlackCover from "../../components/blackCover.vue";

const parallaxContainer = ref(null);
const router = useRouter();

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
