<style scoped>
@import "../../Assets/css/index.css";
/* 隱藏所有 box */
.box {
  height: 0;
  opacity: 0;
  overflow: hidden;
  animation-fill-mode: forwards;
}

.saveBox {
  opacity: 0;
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

@keyframes saveBoxFadeIn {
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
    height: 250px;
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

@keyframes saveBoxFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 顯示 box 時的樣式 */
.box.show {
  opacity: 1;
  height: 250px; /* 確保顯示後的高度是 250px */
  animation: boxFadeIn 0.4s forwards;
}

.saveBox.show {
  animation: saveBoxFadeIn 0.4s forwards;
}

/* 隱藏 box 時的樣式 */
.box.hide {
  opacity: 0;
  height: 0; /* 確保隱藏後的高度是 0 */
  animation: boxFadeOut 0.4s forwards;
}

.saveBox.hide {
  animation: saveBoxFadeOut 0.4s forwards;
}

.main_container::before {
  content: "";
  position: absolute;
  /* background-image: url(../../Assets/Day/rewardCard/rc_bg_circle.png); */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  transition: transform 1s ease;
  z-index: 1;
  animation: transformBackground 7s infinite;
}

@keyframes transformBackground {
  0% {
    transform: scale(1); /* 初始大小 */
  }
  25% {
    transform: scaleX(1.1); /* 略微放大 */
  }
  50% {
    transform: scale(1); /* 恢復到初始大小 */
  }
  75% {
    transform: scaleX(1.1); /* 略微放大 */
  }
  100% {
    transform: scale(1); /* 恢復到初始大小 */
  }
}
</style>

<template>
  <BlackCover />

  <MyClosetLoading
    :isVisible="isUploading"
    :isUploading="isUploading"
    :uploadProgress="uploadProgress"
    @close="closeModal"
  />

  <div class="blackWrapper">
    <div class="wrapper">
      <div class="positionArea">
        <!-- 生成圖片預覽 -->
        <!-- <img :src="finalImageDataURL" alt="Generated Image" /> -->
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
                :class="{ active: selectedGender === 'male' }"
                @click="selectGender('male')"
              >
                Male
              </button>
              <button
                class="btnLink whiteForFrontPage"
                :class="{ active: selectedGender === 'female' }"
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
                :class="{
                  active: selectedHairImage === index,
                }"
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
                :class="{
                  active: selectedClothesImage === index,
                }"
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
                :class="{
                  active: selectedPartnerImage === index,
                }"
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
                :class="{
                  active: selectedMagicCircleImage === index,
                }"
                v-for="(image, index) in magicCircleImages"
                :key="index"
                @click="selectMagicCircleImage(index)"
              >
                {{ image.name }}
              </button>
            </div>
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <div
            v-show="selectedBall !== null"
            class="saveButton saveBox"
            :class="{
              show: selectedBall !== null,
              hide: selectedBall === null,
            }"
          >
            <button
              v-show="isSaveButtonVisible"
              class="saveButton btnKey-L dark"
              @click="generateAllImages"
            >
              Save
            </button>
          </div>
        </transition>
        <!-- ====================背景圖片======================= -->
        <canvas ref="avatarCanvas" style="display: none"></canvas>
        <canvas ref="partnerCanvas" style="display: none"></canvas>
        <div class="main_container" ref="parallaxContainer">
          <div class="myCabinCoverBase">
            <!-- <img
              ref="MyColsetCover"
              src="../../Assets/Day/myColset/MyColsetBase.jpg"
              alt=""
              class="MyColsetCover"
            /> -->
            <video ref="MyColsetCover" class="MyColsetCover" autoplay muted>
              <source
                src="../../Assets/Day/myColset/myClosetCoverVideo.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="parallax-wrapper" data-depth="0.04">
            <img
              src="../../Assets/Day/myColset/MyColsetBaseDark.jpg"
              alt=""
              class="MyColsetBaseDark"
            />
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
            <div class="MyColsetLightScale">
              <img
                src="../../Assets/Day/myColset/MyColsetLight.png"
                alt=""
                class="MyColsetLight"
              />
            </div>
            <img
              src="../../Assets/Day/myColset/characterLight.png"
              alt=""
              class="characterLight"
            />
            <!-- <img
              src="../../Assets/Day/myColset/elf_light.png"
              alt=""
              class="elfLight"
            /> -->
          </div>

          <!-------------- 魔法陣圖片 --------------->
          <div class="parallax-wrapper" data-depth="0.055">
            <div class="magicCircleWrapper">
              <img
                v-for="(image, index) in magicCircleImages"
                :key="index"
                v-show="selectedMagicCircleImage === index && image.url !== ''"
                :src="image.imageUrl"
                :alt="image.name"
              />

              <!-- <img
                src="../../Assets/Day/myColset/magicCircle_1.png"
                alt=""
                class="magicCircle"
              /> -->
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.07">
            <div class="characterChangeClothesWrapper">
              <!-------------- 衣服圖片 --------------->
              <img
                v-for="(image, index) in clothesImages"
                :key="index"
                v-show="selectedClothesImage === index"
                :src="image.imageUrl"
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
                :src="image.imageUrl"
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
                :src="image.imageUrl"
                :alt="image.name"
              />
              <!-- <img
                src="../../Assets/Day/myColset/elf_1.png"
                alt=""
                class="elf"
              /> -->
            </div>
          </div>

          <!-- ===============ball=============== -->
          <div class="parallax-wrapper" data-depth="0.5">
            <div class="ballPosition1">
              <div class="ballLight1" @click="selectBall('gender')">
                <img
                  src="../../Assets/Day/myColset/ball_light.png"
                  alt=""
                  class="ball_light"
                />
              </div>
              <div class="selectBall_1">
                <img
                  src="../../Assets/Day/myColset/ball_1_76x76.png"
                  alt=""
                  class="ball_1"
                />
              </div>
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.3">
            <div class="ballPosition2">
              <div class="ballLight2" @click="selectBall('hair')">
                <img
                  src="../../Assets/Day/myColset/ball_light.png"
                  alt=""
                  class="ball_light"
                />
              </div>
              <div class="selectBall_2">
                <img
                  src="../../Assets/Day/myColset/ball_2_60x60.png"
                  alt=""
                  class="ball_2"
                />
              </div>
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.4">
            <div class="ballPosition3">
              <div class="ballLight3">
                <img
                  src="../../Assets/Day/myColset/ball_light.png"
                  alt=""
                  class="ball_light"
                  @click="selectBall('clothes')"
                />
              </div>
              <div class="selectBall_3">
                <img
                  src="../../Assets/Day/myColset/ball_3_43x43.png"
                  alt=""
                  class="ball_3"
                />
              </div>
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.4">
            <div class="ballPosition4">
              <div class="ballLight4">
                <img
                  src="../../Assets/Day/myColset/ball_light.png"
                  alt=""
                  class="ball_light"
                  @click="selectBall('partner')"
                />
              </div>
              <div class="selectBall_4">
                <img
                  src="../../Assets/Day/myColset/ball_4_56x56.png"
                  alt=""
                  class="ball_4"
                />
              </div>
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.5">
            <div class="ballPosition5">
              <div class="ballLight5">
                <img
                  src="../../Assets/Day/myColset/ball_light.png"
                  alt=""
                  class="ball_light"
                  @click="selectBall('magicCircle')"
                />
              </div>
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

      <div class="myCabinContent">
        <div class="slogon">
          <h1 class="title1 flipInY">My Closet</h1>
          <h6 class="title3 rollIn">
            Try clicking the floating balls on the screen and see what happens!
          </h6>
        </div>
        <div class="menu">
          <div class="backToHome_button">
            <button
              @click="backToHome"
              class="btnLink whiteForFrontPage backToHome menuIn"
            >
              Back to my cabin
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Parallax from "parallax-js";
import { useRouter } from "vue-router";
import { useUserAuthState } from "@/stores/userAuthState";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, storage } from "@/firebase/firebaseConfig";
import { db } from "@/firebase/firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
import {
  ref as fsRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import BlackCover from "../../components/BlackCover.vue";
import MyClosetLoading from "../../components/MyClosetLoading.vue";

const isUploading = ref(false);
const uploadProgress = ref(0);

const router = useRouter();
const parallaxContainer = ref(null);

const MyColsetCover = ref(null);

onMounted(async () => {
  // MyColsetCover消失
  nextTick(() => {
    if (MyColsetCover.value) {
      MyColsetCover.value.style.transition = "opacity 2s ease-out";
      setTimeout(() => {
        MyColsetCover.value.style.opacity = 0; // 或者將 opacity 設為你想要的值
        MyColsetCover.value.style.pointerEvents = "none";
      }, 3700);
    }
  });

  // 確保 DOM 內容加載完成後執行 Parallax 初始化
  if (parallaxContainer.value) {
    // 初始化 Parallax 實例
    const scene = parallaxContainer.value;
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true, // 啟用相對滑鼠位置偏移
      hoverOnly: false, // 只在滑鼠懸停時啟動 Parallax
      originY: 0,
      originX: 0.8,
      scalarX: 5.5, // 水平方向移動幅度是滑鼠移動的一半
      scalarY: 6.5, // 垂直方向移動幅度是滑鼠移動的一半
    });
  }

  loadUserSelection(); // 頁面加載時載入用戶選擇
  $(".flipInY").textillate({
    in: {
      effect: "flipInY",
      shuffle: true,
      delay: 230,
    },
  });

  $(".rollIn").textillate({
    in: {
      effect: "rollIn",
      shuffle: true,
      delay: 30,
    },
  });

  try {
    await loadUserSelection();

    // 進行排序查詢，按 `order` 字段升序排列
    const elvesQuery = query(
      collection(db, "MyClosetElves"),
      orderBy("order", "asc")
    );
    const magicCircleQuery = query(
      collection(db, "MyClosetMagicCircles"),
      orderBy("order", "asc")
    );

    const maleHairQuery = query(
      collection(db, "MyClosetMaleHair"),
      orderBy("order", "asc")
    );

    const femaleHairQuery = query(
      collection(db, "MyClosetFemaleHair"),
      orderBy("order", "asc")
    );

    const maleClothingQuery = query(
      collection(db, "MyClosetMaleClothing"),
      orderBy("order", "asc")
    );

    const femaleClothingQuery = query(
      collection(db, "MyClosetFemaleClothing"),
      orderBy("order", "asc")
    );

    // 加載小精靈
    const elvesSnapshot = await getDocs(elvesQuery);
    elvesSnapshot.forEach((doc) => {
      const data = doc.data();
      partnerImages.value.push({
        name: data.name,
        url: data.fileName,
        imageUrl: data.imageUrl,
        order: data.order, // 確保獲取到 `order` 字段
      });
    });

    // 加載魔法陣
    const magicCircleSnapshot = await getDocs(magicCircleQuery);
    magicCircleSnapshot.forEach((doc) => {
      const data = doc.data();
      magicCircleImages.value.push({
        name: data.name,
        url: data.fileName,
        imageUrl: data.imageUrl,
        order: data.order, // 確保獲取到 `order` 字段
      });
    });

    // 加載男生髮型
    const maleHairSnapshot = await getDocs(maleHairQuery);
    maleHairSnapshot.forEach((doc) => {
      const data = doc.data();
      maleHairImages.value.push({
        name: data.name,
        url: data.fileName,
        imageUrl: data.imageUrl,
        order: data.order, // 確保獲取到 `order` 字段
      });
    });

    // 加載女生髮型
    const femaleHairSnapshot = await getDocs(femaleHairQuery);
    femaleHairSnapshot.forEach((doc) => {
      const data = doc.data();
      femaleHairImages.value.push({
        name: data.name,
        url: data.fileName,
        imageUrl: data.imageUrl,
        order: data.order, // 確保獲取到 `order` 字段
      });
    });

    // 加載男生服裝
    const maleClothingSnapshot = await getDocs(maleClothingQuery);
    maleClothingSnapshot.forEach((doc) => {
      const data = doc.data();
      maleClothesImages.value.push({
        name: data.name,
        url: data.fileName,
        imageUrl: data.imageUrl,
        order: data.order, // 確保獲取到 `order` 字段
      });
    });

    // 加載女生服裝
    const femaleClothingSnapshot = await getDocs(femaleClothingQuery);
    femaleClothingSnapshot.forEach((doc) => {
      const data = doc.data();
      femaleClothesImages.value.push({
        name: data.name,
        url: data.fileName,
        imageUrl: data.imageUrl,
        order: data.order, // 確保獲取到 `order` 字段
      });
    });

    // console.log(partnerImages.value[0].imageUrl);
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
});

const maleHairImages = ref([]);

// const maleHairImages = [
//   { name: "Short Hair", url: "shortHair.png" },
//   { name: "Mid-length Hair", url: "mid-lengthHair.png" },
//   { name: "Black Short Hair", url: "blackShortHair.png" },
// ];

const femaleHairImages = ref([]);

// const femaleHairImages = [
//   { name: "Ponytail", url: "ponytail.png" },
//   { name: "Curly Hair", url: "curlyHair.png" },
// ];

const maleClothesImages = ref([]);

// const maleClothesImages = [
//   { name: "Blue Coat", url: "blueCoat.png" },
//   { name: "Red Robe", url: "redRobe.png" },
//   { name: "Blue Robe", url: "blueRobe.png" },
//   { name: "Purple Coat", url: "purpleCoat.png" },
// ];

const femaleClothesImages = ref([]);

// const femaleClothesImages = [
//   { name: "Black Robe", url: "blackRobe.png" },
//   { name: "Blue Coat", url: "blueCoat.png" },
//   { name: "Blue Robe", url: "blueRobe.png" },
//   { name: "Purple Coat", url: "purpleCoat.png" },
// ];

const partnerImages = ref([]);

// const partnerImages = [
//   { name: "Ollie", url: "Ollie.png" },
//   { name: "Lyra", url: "Lyra.png" },
//   { name: "Elara", url: "Elara.png" },
//   { name: "Ivy", url: "Ivy.png" },
//   { name: "Eldric", url: "Eldric.png" },
// ];

const magicCircleImages = ref([]);

// const magicCircleImages = [
//   { name: "None", url: "" },
//   { name: "Rune of the Elements", url: "RuneOfTheElements.png" },
//   { name: "Sigil of the Ancients", url: "SigilOfTheAncients.png" },
//   { name: "Glyph of the Void", url: "GlyphOfTheVoid.png" },
// ];

const selectedGender = ref("male");
const hairImages = ref(maleHairImages.value);
const clothesImages = ref(maleClothesImages.value);

const selectedBall = ref(null);
const selectedHairImage = ref(0);
const selectedClothesImage = ref(0);
const selectedPartnerImage = ref(0);
const selectedMagicCircleImage = ref(0);

// 選擇性別
// const selectGender = (gender) => {
//   selectedGender.value = gender;
//   if (gender === "male") {
//     hairImages.value = maleHairImages;
//     clothesImages.value = maleClothesImages;
//     selectedHairImage.value = 0;
//     selectedClothesImage.value = 0;
//   } else {
//     hairImages.value = femaleHairImages;
//     clothesImages.value = femaleClothesImages;
//     selectedHairImage.value = 0;
//     selectedClothesImage.value = 0;
//   }
// };

const selectGender = (gender) => {
  selectedGender.value = gender;
  if (gender === "male") {
    hairImages.value = maleHairImages.value;
    clothesImages.value = maleClothesImages.value;
  } else {
    hairImages.value = femaleHairImages.value;
    clothesImages.value = femaleClothesImages.value;
  }

  // 每次切換性別時，將髮型和服裝選擇回到第一個
  selectedHairImage.value = 0;
  selectedClothesImage.value = 0;
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

// Save按鈕
const isSaveButtonVisible = ref(true);

// 選擇球選單
const selectBall = (optionArea) => {
  // 如果點擊的是相同的球，隱藏選單
  // isSaveButtonVisible.value = true;
  if (selectedBall.value === optionArea) {
    selectedBall.value = null; // 隱藏選單
    // isSaveButtonVisible.value = false;
  } else {
    selectedBall.value = optionArea; // 根據選中的球號設置
    isSaveButtonVisible.value = true;
  }
};

// ==================儲存用戶選擇=================

// 儲存用戶選擇
const saveUserSelection = async () => {
  const userId = auth.currentUser.uid; // 獲取用戶 ID
  const userClosetDocRef = doc(db, "usersCloset", userId); // 目標文檔

  // 用戶選擇的資料
  const userClosetSelections = {
    gender: selectedGender.value,
    hair: selectedHairImage.value,
    clothes: selectedClothesImage.value,
    partner: selectedPartnerImage.value,
    magicCircle: selectedMagicCircleImage.value,
  };

  try {
    await setDoc(userClosetDocRef, userClosetSelections); // 儲存或更新選擇
    console.log("User selection saved successfully");
  } catch (error) {
    console.error("Error saving user selection:", error);
  }
};

// 讀取用戶選擇
const loadUserSelection = async () => {
  const user = auth.currentUser; // 獲取當前登錄用戶

  if (!user) {
    // 如果未登錄，直接返回預設值
    console.log("User is not logged in, returning default selections.");
    setDefaultSelections();
    return;
  }

  const userId = user.uid;
  const userClosetDocRef = doc(db, "usersCloset", userId); // 使用新的集合名稱

  try {
    const docSnap = await getDoc(userClosetDocRef);

    if (docSnap.exists()) {
      const userClosetSelections = docSnap.data();

      // 根據讀取到的選擇更新頁面
      selectedGender.value = userClosetSelections.gender;
      selectedHairImage.value = userClosetSelections.hair;
      selectedClothesImage.value = userClosetSelections.clothes;
      selectedPartnerImage.value = userClosetSelections.partner;
      selectedMagicCircleImage.value = userClosetSelections.magicCircle;

      // 根據選擇更新髮型和衣服圖片
      // if (userClosetSelections.gender === "male") {
      //   hairImages.value = maleHairImages;
      //   clothesImages.value = maleClothesImages;
      // } else {
      //   hairImages.value = femaleHairImages;
      //   clothesImages.value = femaleClothesImages;
      // }

      // 根據選擇更新髮型和衣服圖片
      if (userClosetSelections.gender === "male") {
        hairImages.value = maleHairImages.value;
        clothesImages.value = maleClothesImages.value;
      } else {
        hairImages.value = femaleHairImages.value;
        clothesImages.value = femaleClothesImages.value;
      }
    } else {
      // 用戶有登錄但尚未儲存過資料，返回預設值
      console.log("No user data found, returning default selections.");
      setDefaultSelections();
    }
  } catch (error) {
    console.error("Error reading user selection:", error);
    // 出錯時也返回預設值
    setDefaultSelections();
  }
};

// 設置預設值
const setDefaultSelections = () => {
  // 設定預設值
  selectedGender.value = "male"; // 預設為 male
  selectedHairImage.value = 0; // 預設髮型選擇為 0
  selectedClothesImage.value = 0; // 預設衣服選擇為 0
  selectedPartnerImage.value = 0; // 預設伴侶選擇為 0
  selectedMagicCircleImage.value = 0; // 預設魔法圈選擇為 0

  // 根據預設性別更新髮型和衣服圖片
  hairImages.value = maleHairImages.value; // 預設髮型圖片為 maleHairImages
  clothesImages.value = maleClothesImages.value; // 預設衣服圖片為 maleClothesImages
};

// ==================使用canva生成圖片=================

const generateAllImages = async () => {
  // 開始上傳，設置彈窗狀態
  isUploading.value = true;
  uploadProgress.value = 0;

  selectedBall.value = null;
  isSaveButtonVisible.value = false;

  // 等待人物和小精靈圖片生成
  const avatarDataURL = await generateCharacterImage();
  const partnerDataURL = await generatePartnerImage();

  // 確保兩張圖片的 Base64 字符串都有效
  if (avatarDataURL && partnerDataURL) {
    await uploadImages(avatarDataURL, partnerDataURL);
    saveUserSelection(); // 儲存用戶選擇
  } else {
    console.error("無效的圖片 Base64 字符串");
  }

  saveUserSelection(); // 儲存用戶選擇
};

// const finalImageDataURL = ref("");
const avatarCanvas = ref(null);

// ========生成人物=======

const generateCharacterImage = async () => {
  const canvas = avatarCanvas.value;
  const ctx = canvas.getContext("2d");

  // 設定 Canvas 大小
  canvas.width = 300;
  canvas.height = 791;

  // 設定衣服和髮型的圖片路徑
  const clothesImagePath =
    clothesImages.value[selectedClothesImage.value].imageUrl;
  const hairImagePath = hairImages.value[selectedHairImage.value].imageUrl;

  try {
    // 使用 Firebase SDK 獲取衣服圖片的下載 URL
    const clothesStorageRef = fsRef(storage, clothesImagePath);
    const clothesUrl = await getDownloadURL(clothesStorageRef);

    // 使用 Firebase SDK 獲取髮型圖片的下載 URL
    const hairStorageRef = fsRef(storage, hairImagePath);
    const hairUrl = await getDownloadURL(hairStorageRef);

    // 創建圖片元素並加載衣服圖片
    const clothesImg = new Image();
    clothesImg.crossOrigin = "Anonymous";
    clothesImg.src = clothesUrl;

    // 創建圖片元素並加載髮型圖片
    const hairImg = new Image();
    hairImg.crossOrigin = "Anonymous";
    hairImg.src = hairUrl;

    // 等待兩張圖片都加載完成
    await Promise.all([
      new Promise((resolve, reject) => {
        clothesImg.onload = resolve;
        clothesImg.onerror = reject;
      }),
      new Promise((resolve, reject) => {
        hairImg.onload = resolve;
        hairImg.onerror = reject;
      }),
    ]);

    // 清空畫布並繪製圖片
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 畫衣服圖片
    ctx.drawImage(clothesImg, 0, 0, canvas.width, canvas.height);
    // 畫髮型圖片
    ctx.drawImage(hairImg, 0, 0, canvas.width, canvas.height);

    // 生成 Base64 圖像並返回
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("圖片加載錯誤:", error);
    return null;
  }
};

// 從本地端獲取
// const generateCharacterImage = async () => {
//   // selectedBall.value = null;
//   // isSaveButtonVisible.value = false;

//   const canvas = avatarCanvas.value;
//   const ctx = canvas.getContext("2d");

//   // 設定 Canvas 大小，這裡假設是 500x500
//   canvas.width = 300;
//   canvas.height = 791;

//   // 加載圖片並繪製到 Canvas
//   const loadImage = (src) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = src;
//       img.onload = () => resolve(img);
//       img.onerror = (error) => reject(error);
//     });
//   };

//   try {
//     // 加載選中的衣服和髮型圖片
//     const clothesImage = await loadImage(
//       `${clothesImages.value[selectedClothesImage.value].imageUrl}`
//     );
//     const hairImage = await loadImage(
//       `${hairImages.value[selectedHairImage.value].imageUrl}`
//     );

//     // 清空畫布並繪製圖片
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.drawImage(clothesImage, 0, 0, canvas.width, canvas.height);
//     ctx.drawImage(hairImage, 0, 0, canvas.width, canvas.height);

//     // 生成 Base64 圖像並返回
//     return canvas.toDataURL("image/png");
//   } catch (error) {
//     console.error("圖片加載錯誤:", error);
//     return null;
//   }
// };

// ========生成小精靈=======

const partnerCanvas = ref(null);

const generatePartnerImage = async () => {
  const canvas = partnerCanvas.value;
  const ctx = canvas.getContext("2d");

  // 設定 Canvas 大小
  canvas.width = 120;
  canvas.height = 191;

  // 從 Firebase Storage 下載圖片 URL
  const imagePath = `${
    partnerImages.value[selectedPartnerImage.value].imageUrl
  }`; // 這是你圖片的路徑

  try {
    // 使用 Firebase SDK 獲取圖片的下載 URL
    const storageRef = fsRef(storage, imagePath); // 構建 Storage 參考
    const url = await getDownloadURL(storageRef); // 獲取圖片的下載 URL

    // 創建圖片元素並加載
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    // 等待圖片加載完成
    await new Promise((resolve, reject) => {
      img.onload = resolve; // 圖片加載成功後進行繪製
      img.onerror = reject; // 圖片加載失敗處理
    });

    // 清空畫布並繪製圖片
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 生成 Base64 圖像並返回
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("圖片加載錯誤:", error);
    return null;
  }
};

// 從本地端獲取
// const generatePartnerImage = async () => {
//   const canvas = partnerCanvas.value;
//   const ctx = canvas.getContext("2d");

//   // 設定 Canvas 大小
//   canvas.width = 120;
//   canvas.height = 191;

//   // 加載圖片並繪製到 Canvas
//   const loadImage = (src) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = src;
//       img.onload = () => resolve(img);
//       img.onerror = (error) => reject(error);
//     });
//   };

//   try {
//     const partnerImage = await loadImage(
//       `${partnerImages.value[selectedPartnerImage.value].imageUrl}`
//     );

//     // 清空畫布並繪製圖片
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(partnerImage, 0, 0, canvas.width, canvas.height);

//     // 生成 Base64 圖像並返回
//     return canvas.toDataURL("image/png");
//   } catch (error) {
//     console.error("圖片加載錯誤:", error);
//     return null;
//   }
// };

const base64ToBlob = (base64) => {
  const byteCharacters = atob(base64.split(",")[1]); // 解碼 Base64
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byte = byteCharacters.charCodeAt(offset);
    byteArrays.push(byte);
  }
  return new Blob([new Uint8Array(byteArrays)], { type: "image/png" });
};

// =========上傳兩張圖片==========

const uploadImages = async (avatarDataURL, partnerDataURL) => {
  try {
    // 使用 Firebase auth API
    const auth = getAuth();
    const user = auth.currentUser; // 獲取當前用戶

    if (!user) {
      // 沒有用戶資料，彈出提示並停止上傳
      alert("Please log in to proceed.");
      isUploading.value = false; // 停止上傳狀態
      return; // 提前終止函數執行
    }

    // 轉換 Base64 為 Blob
    const avatarBlob = base64ToBlob(avatarDataURL);
    const partnerBlob = base64ToBlob(partnerDataURL);

    // 從storage獲取的圖片邏輯
    // const partnerBlob = await generatePartnerImage();

    // 設定圖片儲存路徑
    const avatarStorageRef = fsRef(
      storage,
      `userAvatars/${user.uid}/avatar.png`
    );
    const partnerStorageRef = fsRef(
      storage,
      `userAvatars/${user.uid}/partner.png`
    );

    // 上傳圖片 (處理上傳進度)
    const avatarUploadTask = uploadBytesResumable(avatarStorageRef, avatarBlob);
    const partnerUploadTask = uploadBytesResumable(
      partnerStorageRef,
      partnerBlob
    );

    // 監聽上傳進度
    avatarUploadTask.on("state_changed", (snapshot) => {
      const progress = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      uploadProgress.value = Math.max(uploadProgress.value, progress); // 確保進度不會回退
    });

    partnerUploadTask.on("state_changed", (snapshot) => {
      const progress = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      uploadProgress.value = Math.max(uploadProgress.value, progress); // 確保進度不會回退
    });

    // 等待上傳完成
    const avatarUploadSnapshot = await avatarUploadTask;
    const partnerUploadSnapshot = await partnerUploadTask;

    // 獲取下載 URL
    const avatarURL = await getDownloadURL(avatarUploadSnapshot.ref);
    const partnerURL = await getDownloadURL(partnerUploadSnapshot.ref);

    // 更新 Firebase Authentication 的頭像 URL
    await updateProfile(user, {
      photoURL: avatarURL, // 更新頭像 URL
    });

    // 儲存 avatarURL 到 Firestore
    await setDoc(doc(db, "users", user.uid), { avatarURL }, { merge: true });
    // 儲存 partnerURL 到 Firestore
    await setDoc(doc(db, "users", user.uid), { partnerURL }, { merge: true });

    // console.log("Partner URL saved to Firestore:", partnerURL);

    // 更新 Pinia store 中
    const userAuthState = useUserAuthState();
    userAuthState.setAvatarURL(avatarURL);
    userAuthState.setPartnerURL(partnerURL);

    console.log("Avatar and partner images updated successfully!");

    // 上傳完成，隱藏彈窗
    isUploading.value = false;

    // 在上傳完成後確保最終進度為100%
    avatarUploadTask.then(() => {
      uploadProgress.value = 100;
    });
    // uploadProgress.value = 100;

    // 這裡可以選擇是否要返回這兩個下載 URL 進行進一步處理
    // return { avatarURL, partnerURL };
  } catch (error) {
    console.error("Error uploading avatar and partner images:", error.message);
    // 如果用戶沒有登入，顯示提示或執行其他處理邏輯
    // 提供更詳細的錯誤信息
    console.error(error);
  }
};

const backToHome = () => {
  router.push("/MyCabin");
};
</script>
