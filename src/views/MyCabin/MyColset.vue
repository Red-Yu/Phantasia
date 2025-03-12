<style scoped>
@import "../../Assets/css/index.css";
/* 隱藏所有 box */
.box {
  height: 0;
  opacity: 0;
  overflow: hidden; /* 隱藏溢出的內容 */
  animation-fill-mode: forwards;
}

/* 進場動畫 */
@keyframes boxFadeIn {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 250px;
    opacity: 1;
  }
}

/* 退場動畫 */
@keyframes boxFadeOut {
  from {
    height: 250px;
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

/* 顯示 box 時的樣式 */
.box.show {
  opacity: 1;
  height: 250px; /* 確保顯示後的高度是 250px */
  animation: boxFadeIn 0.4s forwards;
}

/* 隱藏 box 時的樣式 */
.box.hide {
  opacity: 0;
  height: 0; /* 確保隱藏後的高度是 0 */
  animation: boxFadeOut 0.4s forwards;
}
</style>

<template>
  <BlackCover />

  <div class="blackWrapper">
    <div class="wrapper">
      <div class="positionArea">
        <!-- ===================性別選單================== -->
        <transition name="fade" mode="out-in">
          <div
            v-show="selectedBall === 'gender'"
            class="myColsetContent gender box"
            :class="{
              show: selectedBall === 'gender',
              hide: selectedBall !== 'gender',
            }"
          >
            <div class="section">Gender</div>
            <div class="line"></div>
            <div class="optionArea">
              <button
                class="btnLink whiteForFrontPage"
                @click="selectGender('male')"
              >
                Male
              </button>
              <button
                class="btnLink whiteForFrontPage"
                @click="selectGender('female')"
              >
                Female
              </button>
            </div>
          </div>
        </transition>
        <!-- ===================頭髮選單================== -->
        <transition name="fade" mode="out-in">
          <div
            v-show="selectedBall === 'hair'"
            class="myColsetContent hair box"
            :class="{
              show: selectedBall === 'hair',
              hide: selectedBall !== 'hair',
            }"
          >
            <div class="section">Hair</div>
            <div class="line"></div>
            <div class="optionArea">
              <button
                class="btnLink whiteForFrontPage"
                v-for="(image, index) in hairImages"
                :key="index"
                @click="selectHairImage(index)"
              >
                {{ image.name }}
              </button>
            </div>
          </div>
        </transition>

        <!-- ===================衣服選單================== -->
        <transition name="fade" mode="out-in">
          <div
            v-show="selectedBall === 'clothes'"
            class="myColsetContent clothes box"
            :class="{
              show: selectedBall === 'clothes',
              hide: selectedBall !== 'clothes',
            }"
          >
            <div class="section">Clothes</div>
            <div class="line"></div>
            <div class="optionArea">
              <button
                class="btnLink whiteForFrontPage"
                v-for="(image, index) in clothesImages"
                :key="index"
                @click="selectClothesImage(index)"
              >
                {{ image.name }}
              </button>
            </div>
          </div>
        </transition>

        <!-- ===================小精靈選單================== -->
        <transition name="fade" mode="out-in">
          <div
            v-show="selectedBall === 'partner'"
            class="myColsetContent partner box"
            :class="{
              show: selectedBall === 'partner',
              hide: selectedBall !== 'partner',
            }"
          >
            <div class="section">Partner</div>
            <div class="line"></div>
            <div class="optionArea">
              <button
                class="btnLink whiteForFrontPage"
                v-for="(image, index) in partnerImages"
                :key="index"
                @click="selectPartnerImage(index)"
              >
                {{ image.name }}
              </button>
            </div>
          </div>
        </transition>

        <!-- ===================魔法陣選單================== -->
        <transition name="fade" mode="out-in">
          <div
            v-show="selectedBall === 'magicCircle'"
            class="myColsetContent magicCircle box"
            :class="{
              show: selectedBall === 'magicCircle',
              hide: selectedBall !== 'magicCircle',
            }"
          >
            <div class="section">Magic Circle</div>
            <div class="line"></div>
            <div class="optionArea">
              <button
                class="btnLink whiteForFrontPage magicCircle"
                v-for="(image, index) in magicCircleImages"
                :key="index"
                @click="selectMagicCircleImage(index)"
              >
                {{ image.name }}
              </button>
            </div>
          </div>
        </transition>

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
              <!-------------- 衣服圖片 --------------->
              <img
                v-for="(image, index) in clothesImages"
                :key="index"
                v-show="selectedClothesImage === index"
                :src="`/MyColset/${image.url}`"
                :alt="image.name"
              />

              <!-- <img
                src="../../Assets/Day/myColset/clothes_1.png"
                alt=""
                class="characterClothes"
              /> -->

              <!-------------- 髮型圖片 --------------->

              <img
                v-for="(image, index) in hairImages"
                :key="index"
                v-show="selectedHairImage === index"
                :src="`/MyColset/${image.url}`"
                :alt="image.name"
              />
              <!-- <img
                src="../../Assets/Day/myColset/head_1.png"
                alt=""
                class="characterHead"
              /> -->
            </div>
          </div>

          <!-------------- 小精靈圖片 --------------->
          <div class="parallax-wrapper" data-depth="0.055">
            <div class="elfChangeClothesWrapper">
              <img
                v-for="(image, index) in partnerImages"
                :key="index"
                v-show="selectedPartnerImage === index"
                :src="`/MyColset/${image.url}`"
                :alt="image.name"
              />
              <!-- <img
                src="../../Assets/Day/myColset/elf_1.png"
                alt=""
                class="elf"
              /> -->
            </div>
          </div>

          <!-------------- 魔法陣圖片 --------------->
          <div class="parallax-wrapper" data-depth="0.055">
            <div class="magicCircleWrapper">
              <img
                v-for="(image, index) in magicCircleImages"
                :key="index"
                v-show="selectedMagicCircleImage === index && image.url !== ''"
                :src="`/MyColset/${image.url}`"
                :alt="image.name"
              />

              <!-- <img
                src="../../Assets/Day/myColset/magicCircle_1.png"
                alt=""
                class="magicCircle"
              /> -->
            </div>
          </div>

          <!-- ===============ball=============== -->
          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_1" @click="selectBall('gender')">
              <img
                src="../../Assets/Day/myColset/ball_1_76x76.png"
                alt=""
                class="ball_1"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_2" @click="selectBall('hair')">
              <img
                src="../../Assets/Day/myColset/ball_2_60x60.png"
                alt=""
                class="ball_2"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_3" @click="selectBall('clothes')">
              <img
                src="../../Assets/Day/myColset/ball_3_43x43.png"
                alt=""
                class="ball_3"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_4" @click="selectBall('partner')">
              <img
                src="../../Assets/Day/myColset/ball_4_56x56.png"
                alt=""
                class="ball_4"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="selectBall_5" @click="selectBall('magicCircle')">
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

import BlackCover from "../../components/BlackCover.vue";

const maleHairImages = [
  { name: "Short Hair", url: "shortHair.png" },
  { name: "Mid-length Hair", url: "mid-lengthHair.png" },
  { name: "Curly Hair", url: "curly-hair.png" },
  { name: "Bald", url: "bald.png" },
  { name: "Bald", url: "bald.png" },
  { name: "Bald", url: "bald.png" },
];

const femaleHairImages = [
  { name: "Ponytail", url: "Ponytail.png" },
  { name: "Curly Hair", url: "curlyHair.png" },
  { name: "Curly Hair", url: "curly-hair.png" },
  { name: "Long", url: "Long.png" },
  { name: "Long", url: "Long.png" },
  { name: "Long", url: "Long.png" },
];

const maleClothesImages = [
  { name: "Blue Coat", url: "blueCoat.png" },
  { name: "Red Robe", url: "redRobe.png" },
  { name: "Shirt", url: "Shirt.png" },
  { name: "Shirt", url: "Shirt.png" },
];

const femaleClothesImages = [
  { name: "Black Coat", url: "blaceCoat.png" },
  { name: "Red Robe", url: "redRobe.png" },
  { name: "Shirt", url: "Shirt.png" },
  { name: "Shirt", url: "Shirt.png" },
];

const partnerImages = [
  { name: "Ollie", url: "Ollie.png" },
  { name: "Lyra", url: "Lyra.png" },
  { name: "Elara", url: "Elara.png" },
  { name: "Ivy", url: "Ivy.png" },
  { name: "Eldric", url: "Eldric.png" },
];

const magicCircleImages = [
  { name: "None", url: "" },
  { name: "Rune of the Elements", url: "RuneOfTheElements.png" },
  { name: "Sigil of the Ancients", url: "SigilOfTheAncients.png" },
  { name: "Glyph of the Void", url: "GlyphOfTheVoid.png" },
  { name: "Glyph of the Void2", url: "GlyphOfTheVoid2.png" },
];

const selectedGender = ref("male");
const hairImages = ref(maleHairImages);
const clothesImages = ref(maleClothesImages);

const selectedBall = ref(null);
const selectedHairImage = ref(0);
const selectedClothesImage = ref(0);
const selectedPartnerImage = ref(0);
const selectedMagicCircleImage = ref(0);

// 選擇性別
const selectGender = (gender) => {
  selectedGender.value = gender;
  if (gender === "male") {
    hairImages.value = maleHairImages;
    clothesImages.value = maleClothesImages;
  } else {
    hairImages.value = femaleHairImages;
    clothesImages.value = femaleClothesImages;
  }
};

// 選擇髮型
const selectHairImage = (index) => {
  selectedHairImage.value = index;
};

// 選擇衣服
const selectClothesImage = (index) => {
  selectedClothesImage.value = index;
};

// 選擇小精靈
const selectPartnerImage = (index) => {
  selectedPartnerImage.value = index;
};

// 選擇魔法陣
const selectMagicCircleImage = (index) => {
  selectedMagicCircleImage.value = index;
};

// 選擇球選單
const selectBall = (optionArea) => {
  // 如果點擊的是相同的球，隱藏選單
  if (selectedBall.value === optionArea) {
    selectedBall.value = null; // 隱藏選單
  } else {
    selectedBall.value = optionArea; // 根據選中的球號設置
  }
};
</script>
