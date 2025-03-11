<style scoped>
@import "../../Assets/css/index.css";
</style>

<template>
  <BlackCover />

  <div class="blackWrapper">
    <div class="wrapper">
      <!-- ====================文字選單======================= -->

      <div class="positionArea">
        <div class="myColsetContent">
          <div class="section">Hair</div>
          <div class="line"></div>
          <div class="optionArea">
            <button
              class="btnLink white"
              v-for="(image, index) in imageNames"
              :key="index"
              @click="selectImage(index)"
            >
              {{ image.name }}
            </button>
          </div>
        </div>

        <!-- ====================背景圖片======================= -->

        <div class="main_container" ref="parallaxContainer">
          <div class="parallax-wrapper" data-depth="0.04">
            <img
              src="../../Assets/Day/myColset/MyColsetBase.jpg"
              alt=""
              class="MyColsetBase"
            />
            <img
              src="../../Assets/Day/myColset/MyColsetLight.png"
              alt=""
              class="MyColsetLight"
            />
            <img
              src="../../Assets/Day/myColset/characterLight.png"
              alt=""
              class="characterLight"
            />
            <img
              src="../../Assets/Day/myColset/elf_light.png"
              alt=""
              class="elfLight"
            />
          </div>

          <div class="parallax-wrapper" data-depth="0.07">
            <div class="characterChangeClothesWrapper">
              <img
                src="../../Assets/Day/myColset/clothes_1.png"
                alt=""
                class="characterClothes"
              />

              <img
                v-show="selectedImage === 0"
                :src="`/MyColset/${imageNames[0].url}`"
                :alt="imageNames[0].name"
              />
              <img
                v-show="selectedImage === 1"
                :src="`/MyColset/${imageNames[1].url}`"
                :alt="imageNames[1].name"
              />
              <!-- <img
                src="../../Assets/Day/myColset/head_1.png"
                alt=""
                class="characterHead"
              /> -->
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="elfChangeClothesWrapper">
              <img
                src="../../Assets/Day/myColset/elf_1.png"
                alt=""
                class="elf"
              />
            </div>
          </div>
          <!-- ===============ball=============== -->
          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_1">
              <img
                src="../../Assets/Day/myColset/ball_1_76x76.png"
                alt=""
                class="ball_1"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_2">
              <img
                src="../../Assets/Day/myColset/ball_2_60x60.png"
                alt=""
                class="ball_2"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_3">
              <img
                src="../../Assets/Day/myColset/ball_3_43x43.png"
                alt=""
                class="ball_3"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_4">
              <img
                src="../../Assets/Day/myColset/ball_4_56x56.png"
                alt=""
                class="ball_4"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_5">
              <img
                src="../../Assets/Day/myColset/ball_5_88x88.png"
                alt=""
                class="ball_5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageNames = [
  { name: "Short Hair", url: "shortHair.png" }, // 短髮圖片
  { name: "Mid-length Hair", url: "mid-lengthHair.png" }, // 長髮圖片
  { name: "Curly Hair", url: "curly-hair.jpg" }, // 捲髮圖片
  { name: "Bald", url: "bald.jpg" }, // 禿頭圖片
  { name: "Bald", url: "bald.jpg" }, // 禿頭圖片
  { name: "Bald", url: "bald.jpg" }, // 禿頭圖片
];

const selectedImage = ref(0); // 使用 ref 來定義選中的圖片索引

// 點擊按鈕選擇對應的圖片
const selectImage = (index) => {
  selectedImage.value = index; // 更新選中的圖片
};
</script>
