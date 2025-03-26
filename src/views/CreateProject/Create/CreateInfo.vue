<style>
@import "../../../Assets/css/main.css";
</style>

<template>
  <div class="createInfo">
    <div class="bookCover">
      <!-- AddCover 預覽畫面 -->
      <div class="cover-save-preview">
        <!-- <div class="side frontSide" :style="{ backgroundColor: coverSetting.color }">
          <div v-if="coverSetting.UserCoverImageUrl" class="User-preview">
            <img
              class="customImg"
              :src="coverSetting.UserCoverImageUrl"
              alt="Uploaded in User"
            />
          </div>
          <img class="coverImg" src="../../../Assets/img/book/封面.png" alt="" />
        </div>
        <div class="side backSide" :style="{ backgroundColor: coverSetting.color }">
          <img class="coverImg" src="../../../Assets/img/book/封底.png" alt="" />
        </div> -->
        <div class="product-box-holder" ref="bookHolder">
          <div class="product-box--front">
            <div
              class="pb-color-layer"
              :style="{ backgroundColor: coverSetting.color }"
            ></div>
            <div
              class="pb-inner-layer"
              :style="{
                backgroundImage: `url(${product.innerCoverImage})`,
              }"
            >
              <img
                class="customImg"
                :src="coverSetting.UserCoverImageUrl"
                alt="Uploaded in User"
                v-if="coverSetting.UserCoverImageUrl"
              />
            </div>
            <div
              class="pb-outer-layer"
              :style="{ backgroundImage: `url(${product.coverImage})` }"
            ></div>
          </div>
          <div class="product-box--back">
            <div
              class="pb-color-layer"
              :style="{ backgroundColor: coverSetting.color }"
            ></div>
            <div
              class="pb-outer-layer"
              :style="{ backgroundImage: `url(${product.backImage})` }"
            ></div>
          </div>
          <div class="product-box--side-left">
            <div
              class="pb-color-layer"
              :style="{ backgroundColor: coverSetting.color }"
            ></div>
            <div
              class="pb-outer-layer"
              :style="{ backgroundImage: `url(${product.sideLeftImage})` }"
            ></div>
          </div>
          <div
            class="product-box--side-right"
            :style="{ backgroundImage: `url(${product.sideRightImage})` }"
          ></div>
          <div class="product-box--top"></div>
          <div class="product-box--bottom"></div>
        </div>
      </div>
      <!-- btn: AddCover -->
      <button class="addCover" @click="openModal">
        <div class="btnKey-M light">
          <p>FRONT COVER SETTING</p>
          <div class="icon-M">
            <div class="white-cross">
              <div class="cols">
                <span></span>
                <span></span>
              </div>
              <div class="rows">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
    <!-- Props: AddCover -->
    <AddCover :isVisible="isModalVisible" modalId="AddCover" @close="closeModal" />
    <!-- InfoInput  -->
    <div class="InfoInput">
      <div class="stepsGroup">
        <!-- frontCover -->
        <div class="steps" :class="{ current: isCurrent('CreateCover') }">
          <div class="icon">
            <div class="frontCover"></div>
          </div>
          <p>FRONT COVER</p>
        </div>
        <span></span>
        <!-- information -->
        <div class="steps" :class="{ current: isCurrent('CreateInforMation') }">
          <div class="icon">
            <div class="information"></div>
          </div>
          <p>INFORMATION</p>
        </div>
        <span></span>
        <!-- publish -->
        <div class="steps" :class="{ current: isCurrent('CreateConfirm') }">
          <div class="icon">
            <div class="publish"></div>
          </div>
          <p>PUBLISH</p>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import AddCover from "../FullScreenModal/AddCover.vue";
import { useCoverStore } from "../../../stores/coverSetting";
import { useRoute } from "vue-router";
// 圖片:
import coverImage from "@/assets/img/pics/cover.png";
import backImage from "@/assets/img/pics/backCover.png";
import sideLeftImage from "@/assets/img/pics/spine.png";
import sideRightImage from "@/assets/img/pics/2paper.png";
import innerCoverImage from "@/assets/img/pics/bookImg_2.png";

const route = useRoute();
const isCurrent = (stepName) => {
  return route.name === stepName;
};

// components 初始狀態
const isModalVisible = ref(false);
// 打開彈窗的方法
const openModal = () => {
  isModalVisible.value = true;
};

// 關閉彈窗的方法
const closeModal = () => {
  isModalVisible.value = false;
};

// 使用 Pinia store
const coverSetting = useCoverStore();

// ---------------------
// 3d 書
// ---------------------
// Product data
const product = ref({
  coverImage: coverImage,
  innerCoverImage: innerCoverImage,
  backImage: backImage,
  sideLeftImage: sideLeftImage,
  sideRightImage: sideRightImage,
});
// 3D book dragging logic
const bookHolder = ref(null);
const bookIsDragging = ref(false);
const bookPreviousX = ref(0);
const bookPreviousY = ref(0);
const bookRotateY = ref(0);
const bookRotateX = ref(16);

const bookStartDragging = (e) => {
  bookIsDragging.value = true;
  bookPreviousX.value = e.clientX;
  bookPreviousY.value = e.clientY;
  bookHolder.value.style.cursor = "grabbing";
  bookHolder.value.style.animation = "none"; // 停止動畫
  e.preventDefault();
};

const bookDrag = (e) => {
  if (!bookIsDragging.value) return;
  const bookCurrentX = e.clientX;
  const bookCurrentY = e.clientY;
  const bookDeltaX = bookCurrentX - bookPreviousX.value;
  const bookDeltaY = bookCurrentY - bookPreviousY.value;

  bookRotateY.value += bookDeltaX * 0.5;
  bookRotateX.value -= bookDeltaY * 0.5;
  bookRotateX.value = Math.max(-90, Math.min(90, bookRotateX.value));

  bookHolder.value.style.transform = `rotateX(${bookRotateX.value}deg) rotateY(${bookRotateY.value}deg)`;
  bookPreviousX.value = bookCurrentX;
  bookPreviousY.value = bookCurrentY;
};

const bookStopDragging = () => {
  if (!bookHolder.value) return;
  bookIsDragging.value = false;
  bookHolder.value.style.cursor = "-webkit-grab";
  bookHolder.value.style.animation =
    "bookFloat 15s ease-in-out infinite alternate"; // 重新啟動動畫
};

const bookTouchStart = (e) => {
  if (!bookHolder.value) return;
  bookIsDragging.value = true;
  bookPreviousX.value = e.touches[0].clientX;
  bookPreviousY.value = e.touches[0].clientY;
  e.preventDefault();
};

const bookTouchMove = (e) => {
  if (!bookIsDragging.value) return;
  const bookCurrentX = e.touches[0].clientX;
  const bookCurrentY = e.touches[0].clientY;
  const bookDeltaX = bookCurrentX - bookPreviousX.value;
  const bookDeltaY = bookCurrentY - bookPreviousY.value;

  bookRotateY.value += bookDeltaX * 0.5;
  bookRotateX.value -= bookDeltaY * 0.5;
  bookRotateX.value = Math.max(-90, Math.min(90, bookRotateX.value));

  bookHolder.value.style.transform = `rotateX(${bookRotateX.value}deg) rotateY(${bookRotateY.value}deg)`;
  bookPreviousX.value = bookCurrentX;
  bookPreviousY.value = bookCurrentY;
  e.preventDefault();
};

const bookTouchEnd = () => {
  bookIsDragging.value = false;
};
// Lifecycle hooks for event listeners
onMounted(() => {
  if (bookHolder.value) {
    bookHolder.value.addEventListener("mousedown", bookStartDragging);
    document.addEventListener("mousemove", bookDrag);
    document.addEventListener("mouseup", bookStopDragging);

    bookHolder.value.addEventListener("touchstart", bookTouchStart);
    document.addEventListener("touchmove", bookTouchMove);
    document.addEventListener("touchend", bookTouchEnd);
  }
});

onUnmounted(() => {
  if (bookHolder.value) {
    bookHolder.value.removeEventListener("mousedown", bookStartDragging);
    document.removeEventListener("mousemove", bookDrag);
    document.removeEventListener("mouseup", bookStopDragging);

    bookHolder.value.removeEventListener("touchstart", bookTouchStart);
    document.removeEventListener("touchmove", bookTouchMove);
    document.removeEventListener("touchend", bookTouchEnd);
  }
});
</script>
