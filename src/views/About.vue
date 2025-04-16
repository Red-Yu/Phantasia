<style scoped>
@import "../Assets/css/index.css";

/* 隱藏所有 box */
.box {
  opacity: 0;
  animation-fill-mode: forwards;
}

/* 進場動畫 */
@keyframes boxFadeIn {
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
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 顯示 box 時的樣式 */
.box.show {
  opacity: 1;
  animation: boxFadeIn 1.7s forwards;
}

/* 隱藏 box 時的樣式 */
.box.hide {
  opacity: 0;
  animation: boxFadeOut 1.7s forwards;
}

/* ==========滑動效果========== */

.slideArea {
  transition: transform 0.7s ease-in-out, opacity 0.5s ease-in-out;
}

.slideArea.sliding {
  transform: translateX(2200px);
  opacity: 0;
}
</style>

<template>
  <div class="aboutWrapper">
    <div :class="['about slideArea', { sliding: isSliding }]">
      <div class="aboutContent">
        <div class="leftContent">
          <div class="contentBox">
            <transition name="fade" mode="out-in">
              <div
                v-show="activeBox === 'aboutUs'"
                class="slogon aboutBox box"
                :class="{
                  show: activeBox === 'aboutUs',
                  hide: activeBox !== 'aboutUs',
                }"
              >
                <h1 class="title1 flipInY">Reading</h1>
                <h2 class="title2 fadeIn">is more than words—</h2>
                <h6 class="title3 rollIn">
                  An interactive journey of exploration.
                </h6>
              </div>
            </transition>

            <transition name="fade" mode="out-in">
              <div
                v-show="activeBox === 'ourOrigin'"
                class="slogon aboutBox box"
                :class="{
                  show: activeBox === 'ourOrigin',
                  hide: activeBox !== 'ourOrigin',
                }"
              >
                <h1 class="title1 flipInY">Learning</h1>
                <h2 class="title2 fadeIn">is a window to magic—</h2>
                <h6 class="title3 rollIn">
                  A magical adventure through stories.
                </h6>
              </div>
            </transition>

            <transition name="fade" mode="out-in">
              <div
                v-show="activeBox === 'ourServices'"
                class="slogon aboutBox box"
                :class="{
                  show: activeBox === 'ourServices',
                  hide: activeBox !== 'ourServices',
                }"
              >
                <h1 class="title1 flipInY">Wonder</h1>
                <h2 class="title2 fadeIn">is a trail to phantasia—</h2>
                <h6 class="title3 rollIn">
                  Explore new worlds with every click.
                </h6>
              </div>
            </transition>

            <div class="menu">
              <div class="aboutUs_button">
                <button
                  @click="onAboutUsClick('aboutUs')"
                  class="btnLink whiteForFrontPage menuIn"
                  :class="{ active: activeButton === 'aboutUs' }"
                >
                  About Us
                </button>
              </div>
              <div class="ourOrigin_button">
                <button
                  @click="onAboutUsClick('ourOrigin')"
                  class="btnLink whiteForFrontPage menuIn"
                  :class="{ active: activeButton === 'ourOrigin' }"
                >
                  Our Origin
                </button>
              </div>
              <div class="ourServices_button">
                <button
                  @click="onAboutUsClick('ourServices')"
                  class="btnLink whiteForFrontPage menuIn"
                  :class="{ active: activeButton === 'ourServices' }"
                >
                  Our Services
                </button>
              </div>
              <div class="backToHome_button">
                <button
                  @click="backToHome"
                  class="btnLink whiteForFrontPage backToHome menuIn"
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="rightContent">
          <div class="aboutContents">
            <div class="aboutUsContent">
              <!-- ===============About Us Content================ -->

              <transition name="fade" mode="out-in">
                <div
                  v-show="activeBox === 'aboutUs'"
                  class="aboutUsBox aboutBox box"
                  :class="{
                    show: activeBox === 'aboutUs',
                    hide: activeBox !== 'aboutUs',
                  }"
                >
                  <h3>About Us</h3>
                  <span>
                    <p>
                      In today’s fast-paced digital era, we are committed to
                      creating a safe and nurturing online space for parents and
                      children. Our platform focuses on the creation and sharing
                      of interactive picture books, blending stories, special
                      effects, and engaging interactions to transform reading
                      into a new way for children to explore the world.
                    </p>
                    <p>
                      We offer more than just one-page story websites; we
                      provide a platform full of creativity and possibilities:
                    </p>
                    <ul>
                      <li>
                        Designed for creators: Anyone can upload their images
                        and story texts, and we’ll help transform them into
                        vibrant, interactive picture books while offering sales
                        and profit-sharing services.
                      </li>
                      <li>
                        Supporting children’s growth: In an age flooded with
                        information, we believe reading should be both safe and
                        enjoyable. Our interactive picture books aim to inspire
                        children’s creativity, nurture their imagination, and
                        give parents peace of mind.
                      </li>
                    </ul>

                    <p>
                      Our vision is to merge technology with storytelling,
                      becoming a trusted companion on children’s journey of
                      growth and bringing warmth and hope to the digital
                      age.Join us and discover the endless possibilities of
                      interactive picture books!
                    </p>
                  </span>
                </div>
              </transition>

              <transition name="fade" mode="out-in">
                <div
                  v-show="activeBox === 'ourOrigin'"
                  class="ourOriginBox aboutBox box"
                  :class="{
                    show: activeBox === 'ourOrigin',
                    hide: activeBox !== 'ourOrigin',
                  }"
                >
                  <h3>Our Origin</h3>
                  <span>
                    <p>
                      In today’s rapidly evolving technological era, children
                      are accessing the internet at an increasingly younger age,
                      leaving parents concerned about how to find beneficial and
                      safe resources amidst an overwhelming sea of content. This
                      question became the foundation of our platform.
                    </p>
                    <p>
                      We firmly believe that reading and learning should be
                      filled with warmth and inspiration, not just cold data and
                      text. By combining storytelling, art, and technology, we
                      aim to create an interactive picture book platform that
                      sparks children’s creativity and offers parents a safe and
                      reliable choice. Reading is no longer limited to printed
                      pages—it becomes an engaging and exploratory experience.
                    </p>

                    <p>
                      Additionally, we have created a platform specifically for
                      parents and creators passionate about children’s
                      education. It empowers them to transform their stories and
                      ideas into vibrant, interactive picture books, benefitting
                      even more families. This is our founding mission and the
                      driving force behind our journey.
                    </p>
                  </span>
                </div>
              </transition>

              <transition name="fade" mode="out-in">
                <div
                  v-show="activeBox === 'ourServices'"
                  class="ourServicesBox aboutBox box"
                  :class="{
                    show: activeBox === 'ourServices',
                    hide: activeBox !== 'ourServices',
                  }"
                >
                  <h3>Our Services</h3>
                  <span>
                    <h4>Safe Picture Book Subscription</h4>
                    <p>
                      We provide parents with a worry-free option. By
                      subscribing to our membership, children can access a
                      curated collection of high-quality interactive picture
                      books crafted with care. These stories offer rich content
                      and educational value, making reading both safe and
                      enjoyable.
                    </p>
                    <h4>Magical Effects and Interactive Experiences</h4>
                    <p>
                      Our platform features innovative, magic-themed effects and
                      engaging interactions, creating an immersive storytelling
                      experience for children. Additionally, kids can design
                      their own unique magical avatar in the member center,
                      enhancing their sense of exploration and participation,
                      making each story journey truly special.
                    </p>
                    <h4>Supporting Creators’ Academic Goals</h4>
                    <p>
                      If you are a parent passionate about children’s education
                      or an aspiring creator, we welcome you to join our creator
                      platform. Transform your stories and ideas into
                      interactive picture books and share them with more
                      families. We are dedicated to supporting anyone who wishes
                      to contribute to children’s education, bringing more
                      outstanding stories to light.
                    </p>
                  </span>
                </div>
              </transition>

              <!-- ================================================ -->
            </div>
            <div class="bgBlack"></div>
          </div>
        </div>
      </div>

      <!-- ===========================背景圖========================= -->

      <transition name="fade" mode="out-in">
        <div
          v-show="activeVideo === 'aboutUs'"
          class="aboutUsBox box"
          :class="{
            show: activeBox === 'aboutUs',
            hide: activeBox !== 'aboutUs',
          }"
        >
          <video ref="aboutUsVideo" class="video">
            <source
              src="../Assets/Day/video/dragon_video.webm"
              type="video/webm"
            />
            您的瀏覽器不支援 HTML5 視頻標籤。
          </video>
          <!-- <img src="../Assets/Day/aboutUsImg.jpg" alt="" class="aboutUsImg" /> -->
        </div>
      </transition>

      <transition name="fade" mode="out-in">
        <div
          v-show="activeVideo === 'ourOrigin'"
          class="ourOriginBox box"
          :class="{
            show: activeBox === 'ourOrigin',
            hide: activeBox !== 'ourOrigin',
          }"
        >
          <video ref="ourOriginVideo" class="video">
            <source
              src="../Assets/Day/video/sword_video.webm"
              type="video/webm"
            />
            您的瀏覽器不支援 HTML5 視頻標籤。
          </video>
          <!-- <img
            src="../Assets/Day/ourOriginImg.jpg"
            alt=""
            class="ourOriginImg"
          /> -->
        </div>
      </transition>

      <transition name="fade" mode="out-in">
        <div
          v-show="activeVideo === 'ourServices'"
          class="ourServicesBox box"
          :class="{
            show: activeBox === 'ourServices',
            hide: activeBox !== 'ourServices',
          }"
        >
          <video ref="ourServicesVideo" class="video">
            <source
              src="../Assets/Day/video/knight_video.webm"
              type="video/webm"
            />
            您的瀏覽器不支援 HTML5 視頻標籤。
          </video>
          <!-- <img
            src="../Assets/Day/ourServicesImg.jpg"
            alt=""
            class="ourServicesImg"
          /> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const videoPlayer = ref(null);

// import "lettering.js";
// import "textillate";
// import "animate.css";
const activeBox = ref(null);
const activeButton = ref(null);
const activeVideo = ref(null);

const aboutUsVideo = ref(null);
const ourOriginVideo = ref(null);
const ourServicesVideo = ref(null);

const isSliding = ref(false);

const onAboutUsClick = (clicked) => {
  activeBox.value = clicked;
  activeButton.value = clicked;
  activeVideo.value = clicked;

  // 根據 activeVideo 播放對應的影片
  const videoElement = getVideoElement(activeVideo.value);
  // console.log(videoElement);

  if (videoElement) {
    videoElement.load(); // 重新載入影片
    videoElement.play(); // 播放影片
  }

  // 移除並重新附加 class 來觸發動畫
  resetTextillateAnimations();
};

// 根據 activeVideo 的值選擇正確的影片 ref
const getVideoElement = (videoKey) => {
  switch (videoKey) {
    case "aboutUs":
      return aboutUsVideo.value;
    case "ourOrigin":
      return ourOriginVideo.value;
    case "ourServices":
      return ourServicesVideo.value;
    default:
      return aboutUsVideo.value;
  }
};

// 移除並重新附加 textillate 動畫 class
const resetTextillateAnimations = () => {
  // 重新初始化 textillate 動畫
  $(".title1").textillate("start");
  $(".title2").textillate("start");
  $(".title3").textillate("start");
};

const backToHome = () => {
  isSliding.value = true;

  setTimeout(() => {
    router.push("/");
  }, 375);
};

onMounted(() => {
  // 頁面加載後再顯示預設，避免同時觸發3個box
  setTimeout(() => {
    activeBox.value = "aboutUs";
    activeButton.value = "aboutUs";
    activeVideo.value = "aboutUs";

    const videoElement = getVideoElement(activeVideo.value);
    if (videoElement) {
      videoElement.load(); // 重新載入影片
      videoElement.play(); // 播放影片
    }
  }, 200);

  // =========textillate=========

  $(".flipInY").textillate({
    in: {
      effect: "flipInY",
      shuffle: true,
      delay: 170,
    },
    out: {
      effect: "fadeOut", // 離開效果
      delay: 50, // 動畫延遲
    },
    // loop: true, // 設置是否循環播放
  });
  $(".fadeIn").textillate({
    in: {
      effect: "fadeIn",
      shuffle: true,
      delay: 120,
    },
  });
  $(".rollIn").textillate({
    in: {
      effect: "rollIn",
      shuffle: true,
      delay: 70,
    },
  });

  $(".menuIn").textillate({
    in: {
      effect: "fadeIn",
      sequence: true,
      delay: 60,
    },
  });
});
</script>
