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
</style>

<template>
  <BlackCover />

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
              @click="generateFinalImage"
            >
              Save
            </button>
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

          <canvas ref="finalCanvas" style="display: none"></canvas>

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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserAuthState } from "@/stores/userAuthState";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, storage } from "@/firebase/firebaseConfig";
import { db } from "@/firebase/firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
import { ref as fsRef, uploadBytes, getDownloadURL } from "firebase/storage";
import BlackCover from "../../components/BlackCover.vue";

const router = useRouter();

onMounted(() => {
  loadUserSelection(); // 頁面加載時載入用戶選擇
});

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
    selectedHairImage.value = 0;
    selectedClothesImage.value = 0;
  } else {
    hairImages.value = femaleHairImages;
    clothesImages.value = femaleClothesImages;
    selectedHairImage.value = 0;
    selectedClothesImage.value = 0;
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
      if (userClosetSelections.gender === "male") {
        hairImages.value = maleHairImages;
        clothesImages.value = maleClothesImages;
      } else {
        hairImages.value = femaleHairImages;
        clothesImages.value = femaleClothesImages;
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
  hairImages.value = maleHairImages; // 預設髮型圖片為 maleHairImages
  clothesImages.value = maleClothesImages; // 預設衣服圖片為 maleClothesImages
};

// ==================使用canva生成圖片=================

const finalImageDataURL = ref("");
const finalCanvas = ref(null);

const generateFinalImage = async () => {
  selectedBall.value = null;
  isSaveButtonVisible.value = false;

  const canvas = finalCanvas.value;
  const ctx = canvas.getContext("2d");

  // 設定 Canvas 大小，這裡假設是 500x500
  canvas.width = 155;
  canvas.height = 409;

  // 加載圖片並繪製到 Canvas
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  };

  const drawImages = async () => {
    try {
      // 加載選中的衣服和髮型圖片
      const clothesImage = await loadImage(
        `/MyColset/${clothesImages.value[selectedClothesImage.value].url}`
      );
      const hairImage = await loadImage(
        `/MyColset/${hairImages.value[selectedHairImage.value].url}`
      );

      // 在 Canvas 上繪製圖片，注意順序
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空畫布
      ctx.drawImage(clothesImage, 0, 0, canvas.width, canvas.height); // 繪製衣服
      ctx.drawImage(hairImage, 0, 0, canvas.width, canvas.height); // 繪製髮型

      // 生成 Base64 圖像
      const dataURL = canvas.toDataURL("image/png");
      console.log(dataURL); // 顯示生成的圖片，或進行後續操作，如上傳到 Firebase

      // 更新 finalImageDataURL，顯示在頁面上
      finalImageDataURL.value = dataURL;
      uploadImage(dataURL);
      saveUserSelection(); // 儲存用戶選擇
    } catch (error) {
      console.error("圖片加載錯誤:", error);
    }
  };

  drawImages();
};

const base64ToBlob = (base64) => {
  const byteCharacters = atob(base64.split(",")[1]); // 解碼 Base64
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byte = byteCharacters.charCodeAt(offset);
    byteArrays.push(byte);
  }
  return new Blob([new Uint8Array(byteArrays)], { type: "image/png" });
};

const uploadImage = async (dataURL) => {
  const imageBlob = base64ToBlob(dataURL); // 轉換為 Blob
  const storageRef = fsRef(
    storage,
    `userAvatars/${auth.currentUser.uid}/avatar.png`
  ); // 設定圖片路徑

  // 使用 Pinia store
  const userAuthState = useUserAuthState();

  try {
    // 檢查是否有當前使用者
    const auth = getAuth(); // 使用 Firebase auth API
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in");
    }

    // 上傳圖片
    const snapshot = await uploadBytes(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref); // 獲取圖片 URL

    // 更新 Firebase Authentication 的頭像 URL
    await updateProfile(user, {
      photoURL: downloadURL, // 更新頭像 URL
    });

    // 更新 Pinia store 中的 avatarURL
    userAuthState.setAvatarURL(downloadURL);

    console.log("Avatar updated successfully!");
  } catch (error) {
    console.error("Error uploading avatar:", error);
  }
};

const backToHome = () => {
  router.push("/MyCabin");
};
</script>
