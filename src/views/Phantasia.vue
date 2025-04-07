<style scoped>
@import "../Assets/css/index.css";

/* test */

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

.slideArea.leftSliding {
  transform: translateX(-2200px);
  opacity: 0;
}

.slideArea.rightSliding {
  transform: translateX(2200px);
  opacity: 0;
}
</style>

<template>
  <!-- ===================登入彈窗===================== -->

  <!-- Login Modal -->
  <!-- <Login
    :isVisible="isLoginVisible"
    @close="closeLogin"
    @openSignup="openSignup"
    :startVideoElement="startVideoElement"
    @login-success="handleLoginSuccess"
  /> -->

  <!-- Signup Modal -->
  <!-- <Signup
    :isVisible="isSignupVisible"
    @close="closeSignup"
    @openLogin="openLogin"
  /> -->

  <!-- ===================首頁共用組件(前景)===================== -->

  <BlackCover />

  <div class="blackWrapper" style="overflow: hidden">
    <!--================= 新手教學================= -->
    <div class="tutorialWrapper">
      <div class="positionArea tutorialArea">
        <div
          class="main_container tutorialArea"
          ref="parallaxContainerTutorial"
        >
          <div class="parallax-wrapper tutorialArea" data-depth="0.05">
            <div
              v-if="isFirstVisit"
              ref="tutorialOverlay"
              class="tutorial-overlay no-select"
              @click="nextTutorialStep"
            >
              <div ref="tutorialContent" class="tutorial-content no-select">
                <p class="no-select" v-html="tutorialText"></p>
              </div>
            </div>
          </div>
          <!-- ==================新手教學圖片============== -->
          <div
            ref="tutorialArea"
            class="parallax-wrapper tutorialArea"
            data-depth="0.05"
          >
            <img
              v-if="tutorialStep === 1"
              src="../Assets/Day/book_day_hover.png"
              alt="Book"
              class="tutorial-image scale blink"
            />
            <img
              v-if="tutorialStep === 1"
              src="../Assets/Day/book_day.png"
              alt="Book"
              class="tutorial-image scale"
            />
          </div>
          <div class="parallax-wrapper tutorialArea" data-depth="0.05">
            <img
              v-if="tutorialStep === 2"
              src="../Assets/Day/boy_day_hover.png"
              alt="boy"
              class="tutorial-image scale blink"
            />
            <img
              v-if="tutorialStep === 2"
              src="../Assets/Day/boy_day.png"
              alt="boy"
              class="tutorial-image scale"
            />
          </div>
          <div class="parallax-wrapper tutorialArea" data-depth="0.1">
            <img
              v-if="tutorialStep === 3"
              src="../Assets/Day/day_skyCity_hover.png"
              alt="skyCity"
              class="tutorial-image blink"
            />
            <img
              v-if="tutorialStep === 3"
              src="../Assets/Day/day_skyCity.png"
              alt="skyCity"
              class="tutorial-image"
            />
          </div>

          <div class="parallax-wrapper tutorialArea" data-depth="0.05">
            <button
              v-if="tutorialStep === 4"
              @click="nextTutorialStep"
              :disabled="isButtonDisabled"
              class="hoverAreaLamp"
            ></button>

            <img
              v-if="tutorialStep === 4"
              src="../Assets/Day/lamp_day_hover.png"
              alt="lamp"
              class="tutorial-image scale blink"
            />
            <img
              v-if="tutorialStep === 4"
              src="../Assets/Day/lamp_day.png"
              alt="lamp"
              class="tutorial-image scale"
            />
          </div>

          <div class="parallax-wrapper tutorialArea" data-depth="0.115">
            <img
              v-if="tutorialStep === 7"
              src="../Assets/Day/left_castle_tutorial_hover.png"
              alt="leftCastle"
              class="tutorial-image blink"
            />

            <img
              v-if="tutorialStep === 7"
              src="../Assets/Day/left_castle_tutorial.png"
              alt="leftCastle"
              class="tutorial-image left_castle"
            />
          </div>

          <div class="parallax-wrapper tutorialArea" data-depth="0.13">
            <img
              v-if="tutorialStep === 8"
              src="../Assets/Day/right_castle_tutorial_hover.png"
              alt="rightCastle"
              class="tutorial-image blink"
            />
            <img
              v-if="tutorialStep === 8"
              src="../Assets/Day/right_castle_tutorial.png"
              alt="rightCastle"
              class="tutorial-image right_castle"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- ======================================= -->

    <div
      class="preloadSlideArea"
      :class="[
        'slideArea',
        { rightSliding: isRightSliding, leftSliding: isLeftSliding },
      ]"
    >
      <Preload ref="preload" />
    </div>
    <div style="background-color: rgba(255, 255, 255, 0)" class="wrapper">
      <div
        :class="[
          'slideArea',
          { rightSliding: isRightSliding, leftSliding: isLeftSliding },
        ]"
      >
        <div class="textContent">
          <div class="copyRight">
            <span>
              本網站為緯育TibaMe【TID201】前端工程師專業技術養成班學員作品，僅供學習、展示之用途。若有侵權疑慮，請私訊TibaMe-前端開發技術在職培訓班，由專人協助處理。
            </span>
          </div>
          <!-- =====log out===== -->
          <div v-if="islogIn" class="logOutmenuButton">
            <div class="filter"></div>
            <div class="menuAvatar" @click="ToMemberCenter">
              <img
                class="avaterImg"
                v-if="avatarURL"
                :src="avatarURL"
                alt="User Avatar"
              />
              <img class="avaterBg" src="../Assets/Day/myColset/avaterBg.jpg" />
            </div>
            <div class="btnLink white loginInfo" @click="ToMemberCenter">
              <p v-if="userName">Hi, {{ userName }} !</p>
              <p v-else>Hi, Visitor !</p>
              <!-- <p>Hi,Chris!</p> -->
            </div>
            <span class="divider"></span>

            <div class="btnLink white btnLinkLogout" @click="logout">
              <p>Log Out</p>
              <!-- <div class="icon-M">
                <div class="white-setting"></div>
              </div> -->
            </div>
            <span class="divider"></span>

            <span>
              <img
                @click="resetTutorial"
                class="questionMark"
                src="../Assets/img/icon/questionMark.png"
                alt=""
              />
            </span>
          </div>

          <!-- =====log in===== -->
          <div v-if="islogOut" class="logInmenuButton">
            <div class="filter"></div>

            <div class="menuAvatar" @click="backToEntrance">
              <img
                class="avaterImg"
                src="../Assets/Day/myColset/avatarDefault.png"
                alt="User Avatar"
              />
              <img class="avaterBg" src="../Assets/Day/myColset/avaterBg.jpg" />
            </div>
            <div class="btnLink white loginInfo" @click="backToEntrance">
              <p>Log In</p>
              <!-- <div class="icon-M">
          <div class="white-edit"></div>
        </div> -->
            </div>
            <span class="divider"></span>

            <span>
              <img
                @click="resetTutorial"
                class="questionMark"
                src="../Assets/img/icon/questionMark.png"
                alt=""
              />
            </span>
          </div>
        </div>

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
            <!-- ======================================= -->
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
import {
  onMounted,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  nextTick,
} from "vue";
import Parallax from "parallax-js";
import { useRouter } from "vue-router";
import Preload from "../components/Preload.vue";
import { useUserAuthState } from "@/stores/userAuthState";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BlackCover from "../components/BlackCover.vue";
// import Login from "./Auth/Login.vue";
// import Signup from "./Auth/Signup.vue";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const isFirstVisit = ref(true); // 標記是否為第一次訪問
const tutorialText = ref(
  "Welcome to Phantasia! <br/>  <span style='color: #FFE9BA;'>Click</span> to start the tour of the magical world."
);
const tutorialStep = ref(0);
const tutorialContent = ref(null);
const tutorialOverlay = ref(null);
const tutorialArea = ref(null);

// 登入按鈕選單
const islogIn = ref(false);
const islogOut = ref(null);

// 初始化Firebase身份驗證
const auth = getAuth();

// 使用 Pinia store
const userAuthState = useUserAuthState();
const userName = ref("");
const avatarURL = ref("");

const parallaxContainer = ref(null);
const parallaxContainerTutorial = ref(null);

const router = useRouter();

const day = ref(true);
const showImage = ref(true);
const showVideo_day = ref(false);
const showVideo_night = ref(false);
const isButtonDisabled = ref(false);
const day_night = computed(() => (day.value ? "day" : "night"));

const dayTransferVideo = ref(null);
const nightTransferVideo = ref(null);

const isLeftSliding = ref(false);
const isRightSliding = ref(false);

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

const preload = ref(null);

const backToEntrance = () => {
  // 通過ref調用子組件的backToEntrance方法
  if (preload.value && preload.value.backToEntrance) {
    preload.value.backToEntrance();
  }
};

// 登出方法
const logout = async () => {
  await userAuthState.logout(); // 呼叫 store 中的 logout 方法
  // router.push("/"); // 登出後重定向到登入頁面
  // window.location.reload();
};

// 監控 day_night 的變化=========================
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

// ============新手教學==============
// 教學步驟進行的邏輯
const nextTutorialStep = () => {
  tutorialStep.value++;

  if (tutorialStep.value === 1) {
    tutorialText.value =
      "The book in the corner <br/>helps you <span style='color: #FFE9BA;'>learn more about Phantasia.</span>";
  } else if (tutorialStep.value === 2) {
    tutorialText.value =
      "Click the boy in the center to enter your Cabin. <br/> There, you can <span style='color: #FFE9BA;'>change the decor, collect points,</span> and<span style='color: #FFE9BA;'> view your books.</span>";
  } else if (tutorialStep.value === 3) {
    tutorialText.value =
      "Click on the Sky Castle to<span style='color: #FFE9BA;'> read many interesting books.</span>";

    if (tutorialContent.value) {
      tutorialContent.value.style.marginTop = "0px";
    }
  } else if (tutorialStep.value === 4) {
    tutorialText.value =
      "Here comes the fun!<br/> <span style='color: #FFE9BA;'>Click on the lamp</span> to see what happens!";

    if (tutorialOverlay.value) {
      tutorialOverlay.value.style.pointerEvents = "none";
    }

    if (tutorialArea.value) {
      tutorialArea.value.style.pointerEvents = "auto";
    }

    if (tutorialContent.value) {
      tutorialContent.value.style.marginTop = "15px";
    }
  } else if (tutorialStep.value === 5) {
    if (tutorialOverlay.value) {
      tutorialOverlay.value.style.pointerEvents = "auto";
      tutorialOverlay.value.style.opacity = "0"; // 改變透明度
      tutorialOverlay.value.style.transition = "opacity 0.8s ease"; // 添加過渡效果
    }

    if (tutorialArea.value) {
      tutorialArea.value.style.pointerEvents = "none";
    }

    toggleDayNight();
  } else if (tutorialStep.value === 6) {
    tutorialText.value =
      "Welcome to the night in Phantasia<br/>  <span style='color: #FFE9BA;'>let's continue the tutorial!</span>";

    if (tutorialOverlay.value) {
      tutorialOverlay.value.style.opacity = "1";
      tutorialOverlay.value.style.transition = "opacity 0.8s ease"; // 添加過渡效果
    }
  } else if (tutorialStep.value === 7) {
    tutorialText.value =
      "The castle on the left is the <span style='color: #FFE9BA;'>  Creation Center</span><br/>where you can  <span style='color: #FFE9BA;'> create your own storybook.</span>";
  } else if (tutorialStep.value === 8) {
    tutorialText.value =
      "The castle on the right is the <span style='color: #FFE9BA;'> Member Center</span><br/> where you can  <span style='color: #FFE9BA;'>view your membership details.</span>";
  } else if (tutorialStep.value === 9) {
    tutorialText.value =
      "The tutorial is almost over<br/>now you can<span style='color: #FFE9BA;'>  begin your adventure in Phantasia!</span>";
  } else if (tutorialStep.value === 10) {
    tutorialText.value =
      "If you get lost, just click the <span style='color: #FFE9BA;'>question mark </span><br/>in the<span style='color: #FFE9BA;'> top right</span>, and I'll guide you again.";
  } else {
    isFirstVisit.value = false; // 完成教學，隱藏教程
  }
};

// 重新觸發教學
const resetTutorial = () => {
  const currentRoute = router.currentRoute.value.path;
  if (currentRoute === "/night") {
    // 如果當前路由是 'night'，將頁面推送到 'day'
    toggleDayNight();

    setTimeout(() => {
      nextTick(() => {
        // 確保 toggleDayNight 完成後再顯示教學
        tutorialStep.value = 0; // 重設教學步驟
        tutorialText.value =
          "Welcome to Phantasia! <br/> Click to start the tour of a magical world."; // 初始文字
        isFirstVisit.value = true; // 顯示教學覆蓋層
      });
    }, 2500);
  } else {
    tutorialStep.value = 0;
    tutorialText.value =
      "Welcome to Phantasia! <br/> Click to start the tour of a magical world."; // 初始文字
    isFirstVisit.value = true;
  }
};

onMounted(() => {
  // ========紀錄是否第一次進入(新手教學)========
  const hasVisited = localStorage.getItem("hasVisited"); // 記錄用戶是否曾經訪問過
  if (hasVisited) {
    isFirstVisit.value = false; // 如果曾經訪問過，則不顯示教程
  } else {
    localStorage.setItem("hasVisited", "true"); // 記錄首次訪問
  }

  // ========================

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

  if (parallaxContainerTutorial.value) {
    // 初始化 Parallax 實例
    const scene = parallaxContainerTutorial.value;
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true, // 啟用相對滑鼠位置偏移
      hoverOnly: true, // 只在滑鼠懸停時啟動 Parallax
      originY: 0,
      originX: 0.8,
      scalarX: 5.5, // 水平方向移動幅度是滑鼠移動的一半
      scalarY: 6.5, // 垂直方向移動幅度是滑鼠移動的一半
    });
  }

  // const currentHour = new Date().getHours();
  // if (currentHour >= 18 || currentHour < 6) {
  //   day.value = false;
  // } else {
  //   day.value = true;
  // }

  updateImagePaths(day_night.value);

  router.push(`/${day.value ? "day" : "night"}`);
  // router.push("/Day");

  // 預加載頭像
  if (userAuthState.user) {
    // 如果用戶已經登錄，則直接從 store 中獲取頭像 URL
    userAuthState.avatarURL = userAuthState.user.photoURL;
  }

  onAuthStateChanged(auth, async (user) => {
    // 將回調設為 async 函數
    if (user) {
      // 用戶已登入
      islogIn.value = true;
      islogOut.value = false;

      // 獲取用戶資料
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid)); // 使用 await 獲取資料
        if (userDoc.exists()) {
          userName.value = userDoc.data().name; // 更新用戶名稱
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
      // 解決用google帳號登入會覆蓋頭像的問題
      // 更新頭像 URL - 使用過濾函數處理 Google 頭像
      avatarURL.value = getProperAvatarURL(user);
    } else {
      // 用戶未登入
      islogIn.value = false;
      islogOut.value = true;
      userName.value = ""; // 清空用戶名稱
      avatarURL.value = new URL(
        "../Assets/Day/myColset/avatarDefault.png",
        import.meta.url
      ).href;
    }
  });
});

// ========保持過場影片加載(避免過場卡頓)==========
const intervalId = setInterval(() => {
  // 檢查是否影片是處於播放中，如果是，就不會觸發 load
  if (dayTransferVideo.value.paused || dayTransferVideo.value.ended) {
    dayTransferVideo.value.load(); // 如果影片沒播放或已結束，進行加載
    // console.log(`日間過場影片重新加載..`);
  }

  if (nightTransferVideo.value.paused || nightTransferVideo.value.ended) {
    nightTransferVideo.value.load(); // 如果影片沒播放或已結束，進行加載
    // console.log(`夜間過場影片重新加載..`);
  }
}, 10000); // 每10秒重新加載

// 在組件卸載前清除 interval 以避免記憶體泄漏
onBeforeUnmount(() => {
  clearInterval(intervalId); // 清除 interval
});

// =================登入彈窗====================

// // 控制顯示登入與註冊彈窗
// const isLoginVisible = ref(false);
// const isSignupVisible = ref(false);

// // 打開彈窗的方法
// const openModal = () => {
//   isLoginVisible.value = true;
//   // $(".rippleArea").ripples("destroy");
// };

// // 打開註冊彈窗的事件
// const openSignup = () => {
//   isLoginVisible.value = false;
//   isSignupVisible.value = true;
// };

// // 打開登入彈窗
// const openLogin = () => {
//   isLoginVisible.value = true;
//   isSignupVisible.value = false;
// };

// // 關閉彈窗的方法
// const closeLogin = () => {
//   isLoginVisible.value = false;
// };

// const closeSignup = () => {
//   isSignupVisible.value = false;
// };

// ==========================================

// ========router.push==========

const ToCabin = () => {
  isRightSliding.value = true;

  setTimeout(() => {
    router.push("/MyCabin");
  }, 500);
};

const ToAbout = () => {
  isLeftSliding.value = true;

  setTimeout(() => {
    router.push("/About");
  }, 450);
};

const ToMemberCenter = () => {
  router.push("/MemberCenter");
};

// ==============================================
// 檢查頭像是否來自 Google
function isGoogleAvatar(photoURL) {
  return (
    photoURL &&
    (photoURL.includes("googleusercontent.com") ||
      photoURL.includes("google.com"))
  );
}

// 獲取適當的頭像 URL
function getProperAvatarURL(user) {
  if (!user) return "/MyColset/avatarDefault.png";

  // 如果是 Google 頭像，返回預設頭像
  if (isGoogleAvatar(user.photoURL)) {
    return "/MyColset/avatarDefault.png";
  }

  // 否則返回用戶的頭像或預設頭像
  return user.photoURL || "/MyColset/avatarDefault.png";
}
</script>
