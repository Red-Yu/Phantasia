<style scoped>
@import "../../Assets/css/MyRewardCard.css";
/* test */
</style>

<template>
  <div class="blackWrapper">
    <div
      class="wrap"
      :style="{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s' }"
    >
      <div class="myCabinContent">
        <div class="slogon">
          <h1 class="title1 flipInY">Reward card</h1>
          <h6 class="title3 rollIn">
            Try clicking the Reward card and see how many points you’ve earned!
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

      <!-- 背景圖 -->
      <div class="bg"></div>
      <!-- 集點卡 -->
      <div class="rcContain">
        <div class="cardWrapper">
          <!-- 左 -->
          <div class="left">
            <!-- 左封面 -->
            <div class="front">
              <div class="sectionWrap">
                <div class="card_wallpaper">
                  <img
                    src="../../Assets/Day/rewardCard/rewardCard_0.png"
                    alt=""
                    class="card0"
                  />
                  <img
                    src="../../Assets/Day/rewardCard/rewardCard_1.png"
                    alt=""
                    class="card1"
                  />
                  <img
                    src="../../Assets/Day/rewardCard/rewardCard_2.png"
                    alt=""
                    class="card2"
                  />
                  <img
                    src="../../Assets/Day/rewardCard/rewardCard_3.png"
                    alt=""
                    class="card3"
                  />
                </div>
                <div class="card_txt">
                  <h1>reward card</h1>
                  <p>
                    The more you read, the more rewards you earn! Collect stamps
                    with every book and redeem them for exciting prizes!
                  </p>
                </div>
              </div>
            </div>
            <!-- 左內文 -->
            <div class="back">
              <div class="sectionWrap">
                <div class="card_wallpaper">
                  <img
                    src="../../Assets/Day/rewardCard/rewardCard_0.png"
                    alt=""
                    class="card0"
                  />
                  <img
                    src="../../Assets/Day/rewardCard/rewardCard_1.png"
                    alt=""
                    class="card1"
                  />
                </div>
                <div class="avatar">
                  <!-- <img
                    src="../../Assets/Day/rewardCard/avatar.png"
                    alt=""
                    class="avatar"
                  /> -->
                  <img
                    class="avaterImg avatar"
                    v-if="avatarURL"
                    :src="avatarURL"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 中內文 -->
          <div class="middle">
            <div class="sectionWrap">
              <div class="card_wallpaper">
                <img
                  src="../../Assets/Day/rewardCard/card_middle_bg.png"
                  alt=""
                  class="card0"
                />
              </div>
              <div class="pointAll">
                <!-- 第一組 5 個圓圈 -->
                <div class="point_5">
                  <div class="twicePoint">
                    <div
                      v-for="(circle, index) in filledCircles.slice(0, 2)"
                      :key="circle.id"
                      class="point"
                    >
                      <img
                        v-if="circle.filled"
                        src="../../Assets/img/membercenter/logo.svg"
                        alt="stamp"
                      />
                      <span v-else>{{ index + 1 }}</span>
                    </div>
                  </div>
                  <div class="oncePoint">
                    <div class="point">
                      <img
                        v-if="filledCircles[2]?.filled"
                        src="../../Assets/img/membercenter/logo.svg"
                        alt="stamp"
                      />
                      <span v-else>3</span>
                    </div>
                  </div>
                  <div class="twicePoint">
                    <div
                      v-for="(circle, index) in filledCircles.slice(3, 5)"
                      :key="circle.id"
                      class="point"
                    >
                      <img
                        v-if="circle.filled"
                        src="../../Assets/img/membercenter/logo.svg"
                        alt="stamp"
                      />
                      <span v-else>{{ index + 4 }}</span>
                    </div>
                  </div>
                </div>

                <!-- 第二組 5 個圓圈 -->
                <div class="point_5">
                  <div class="twicePoint">
                    <div
                      v-for="(circle, index) in filledCircles.slice(5, 7)"
                      :key="circle.id"
                      class="point"
                    >
                      <img
                        v-if="circle.filled"
                        src="../../Assets/img/membercenter/logo.svg"
                        alt="stamp"
                      />
                      <span v-else>{{ index + 6 }}</span>
                    </div>
                  </div>
                  <div class="oncePoint">
                    <div class="point">
                      <img
                        v-if="filledCircles[7]?.filled"
                        src="../../Assets/img/membercenter/logo.svg"
                        alt="stamp"
                      />
                      <span v-else>8</span>
                    </div>
                  </div>
                  <div class="twicePoint">
                    <div
                      v-for="(circle, index) in filledCircles.slice(8, 10)"
                      :key="circle.id"
                      class="point"
                    >
                      <img
                        v-if="circle.filled"
                        src="../../Assets/img/membercenter/logo.svg"
                        alt="stamp"
                      />
                      <span v-else>{{ index + 9 }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="pointAll">
                <div class="point_5">
                  <div class="twicePoint">
                    <div class="point" id="point1">
                      <img src="" alt="stamp" />
                    </div>
                    <div class="point" id="point2">
                      <img src="" alt="stamp" />
                    </div>
                  </div>
                  <div class="oncePoint">
                    <div class="point" id="point3">
                      <img src="" alt="stamp" />
                    </div>
                  </div>
                  <div class="twicePoint">
                    <div class="point" id="point4">
                      <img src="" alt="stamp" />
                    </div>
                    <div class="point" id="point5">
                      <img src="" alt="stamp" />
                    </div>
                  </div>
                </div>
                <div class="point_5">
                  <div class="twicePoint">
                    <div class="point" id="point6">
                      <img src="" alt="stamp" />
                    </div>
                    <div class="point" id="point7">
                      <img src="" alt="stamp" />
                    </div>
                  </div>
                  <div class="oncePoint">
                    <div class="point" id="point8">
                      <img src="" alt="stamp" />
                    </div>
                  </div>
                  <div class="twicePoint">
                    <div class="point" id="point9">
                      <img src="" alt="stamp" />
                    </div>
                    <div class="point" id="point10">
                      <img src="" alt="stamp" />
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <!-- 右內文 -->
          <div class="right">
            <div class="sectionWrap">
              <div class="card_wallpaper">
                <img
                  src="../../Assets/Day/rewardCard/card_rigjt_bg.png"
                  alt=""
                  class="card0"
                />
              </div>
              <div class="contain">
                <div class="rightCard_txt">
                  <h1>reward card</h1>
                  <p>
                    Finish reading a book to earn 1 point. Collect 5 points to
                    unlock exclusive costumes!
                  </p>
                </div>
                <div class="unlock">
                  <div
                    v-for="octagon in unlockedOctagons"
                    :key="octagon.id"
                    class="octagon"
                  >
                    <img
                      v-if="!octagon.unlocked"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img
                      v-else
                      src="../../Assets/Day/rewardCard/key.png"
                      alt="Key"
                      class="real_dress"
                    />
                  </div>
                </div>
                <!-- <div class="unlock">
                  <div class="octagon">
                    <img
                      class="lock"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img class="real_dress" src="" alt="Real" />
                  </div>
                  <div class="octagon">
                    <img
                      class="lock"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img class="real_dress" src="" alt="Real" />
                  </div>
                  <div class="octagon">
                    <img
                      class="lock"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img class="real_dress" src="" alt="Real" />
                  </div>
                  <div class="octagon">
                    <img
                      class="lock"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img class="real_dress" src="" alt="Real" />
                  </div>
                  <div class="octagon">
                    <img
                      class="lock"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img class="real_dress" src="" alt="Real" />
                  </div>
                  <div class="octagon">
                    <img
                      class="lock"
                      src="../../Assets/Day/rewardCard/lock.png"
                      alt="Lock"
                    />
                    <img class="real_dress" src="" alt="Real" />
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// $(document).ready(function() {
//     // 當點擊頁面任意位置時觸發打開動作
//     $(document).click(function(e) {
//       // 如果點擊的地方是 .front，則展開
//       if ($(e.target).closest('.front').length) {
//         $(".back").addClass("open");
//         $(".middle").addClass("open");
//         $(".right").addClass("open");
//         $(".front").css("visibility", "hidden"); // 隱藏 .front
//         $(".front").css("opacity", "0");
//       }
//       // 如果點擊的地方不是 .front，則關閉所有區域
//       else {
//         $(".back").removeClass("open");
//         $(".middle").removeClass("open");
//         $(".right").removeClass("open");
//         $(".front").css("visibility", "visible"); // 顯示 .front
//         $(".front").css("opacity", "1");
//       }
//     });
//     console.log("jQuery loaded successfully.");
//   });

//   $(function(){
//     console.log("jQuery loaded");

//     $(".left").click(function(){
//         // console.log("Front clicked");
//         $(".left").addClass("open");
//         setTimeout(function(){
//             $(".right").addClass("open");
//         }, 250);
//         setTimeout(function(){
//             $(".back").addClass("open");
//         }, 350);
//     });

//     $(".left, .right, .middle").click(function(){
//         console.log("Closing card");
//         setTimeout(function(){
//             $(".left").removeClass("open");
//         }, 250);
//         $(".right").removeClass("open");
//         setTimeout(function(){
//             $(".back").removeClass("open");
//         }, 600);
//     });
// });

// =====================
// $(function(){
//     console.log("jQuery loaded");

//     $(".front").click(function(){
//         // 開始旋轉左邊
//         $(".left").addClass("open");

//         setTimeout(function(){
//             // 開始旋轉右邊
//             $(".right").addClass("open");
//         }, 250);

//         setTimeout(function(){
//             // 展開背面
//             $(".back").addClass("open");
//         }, 600); // 增加一些延遲，以確保先旋轉完左邊和右邊
//     });

//     $(".left, .right, .middle").click(function(){
//         console.log("Closing card");

//         setTimeout(function(){
//             // 關閉左邊
//             $(".left").removeClass("open");
//         }, 250);

//         // 關閉右邊
//         $(".right").removeClass("open");

//         setTimeout(function(){
//             // 關閉背面
//             $(".back").removeClass("open");
//         }, 600); // 關閉背面的時間應該與開啟背面的時間一致
//     });
// });
// ====================================
import { onMounted, ref, nextTick, computed, watch } from "vue";
import { useRouter } from "vue-router";
// import { useUserAuthState } from "@/stores/userAuthState";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isVisible = ref(false);
const router = useRouter();

const avatarURL = ref("");

// 使用 Pinia store
// const userAuthState = useUserAuthState();
// const user = userAuthState.user; // 引用全域的用戶資料

// // 計算屬性：只有在用戶資料加載完畢後，才會返回頭像 URL
// const avatarURL = computed(() => {
//   return user && user.photoURL
//     ? user.photoURL
//     : "/MyColset/character115x409.png"; // 如果沒有 photoURL 則返回 null
// });

// // 監聽 user.photoURL 的變化，並確保在變更後觸發 DOM 更新
// watch(
//   () => user?.photoURL,
//   async (newPhotoURL) => {
//     if (newPhotoURL) {
//       console.log("User avatar updated:", newPhotoURL);
//       // 等待下次 DOM 更新後再執行其他操作
//       await nextTick();
//       // 在此處處理需要在頭像更新後進行的其他操作
//     }
//   }
// );

//設定中間點數引用資料庫
const auth = getAuth();
const userID = ref(null);
const points = ref(0);

// 定義 10 個不規則位置的圓圈
const circles = ref([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
]);

// 計算哪些圓圈應該變成印章
// const filledCircles = computed(() =>
//   circles.value.map((circle, index) => ({
//     ...circle,
//     filled: index < points.value, // 只有小於 points 數的圓圈變成印章
//   }))
// );
const filledCircles = computed(() => {
  const modPoints = points.value % 10 || 10; // 讓滿10後重置
  return circles.value.map((circle, index) => ({
    ...circle,
    filled: index < modPoints, // 當 index < modPoints 時顯示印章
  }));
});
// 定義 6 個八角形框，預設為鎖
const octagons = ref([
  { id: 1, unlocked: false },
  { id: 2, unlocked: false },
  { id: 3, unlocked: false },
  { id: 4, unlocked: false },
  { id: 5, unlocked: false },
  { id: 6, unlocked: false },
]);

// 計算哪些八角形應該變成鑰匙
const unlockedOctagons = computed(() => {
  return octagons.value.map((octagon, index) => ({
    ...octagon,
    unlocked: points.value >= (index + 1) * 5,
  }));
});

const fetchPoints = async (uid) => {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    points.value = userSnap.data().points || 0;
  } else {
    await setDoc(userRef, { points: 0 });
  }
};

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      isVisible.value = true; // 0.8秒後觸發 opacity 變化
    }, 200); // 延遲 0.8 秒
  });

  $(".flipInY").textillate({
    in: {
      effect: "flipInY",
      shuffle: true,
      delay: 170,
    },
  });

  $(".rollIn").textillate({
    in: {
      effect: "rollIn",
      shuffle: true,
      delay: 40,
    },
  });
});

onAuthStateChanged(auth, async (user) => {
  // 將回調設為 async 函數
  if (user) {
    // 更新頭像 URL
    avatarURL.value =
      user.photoURL ||
      new URL("../../Assets/Day/myColset/avatarDefault.png", import.meta.url)
        .href; // 如果用戶有頭像，則使用；否則使用預設頭像
  } else {
    avatarURL.value = new URL(
      "../../Assets/Day/myColset/avatarDefault.png",
      import.meta.url
    ).href;
  }
});

//中間點數參資料庫
onAuthStateChanged(auth, (user) => {
  if (user) {
    userID.value = user.uid;
    fetchPoints(user.uid);
  }
});

//卡片打開關閉
$(function () {
  console.log("jQuery loaded");

  $(".front").click(function () {
    // 開始旋轉左邊
    $(".left").addClass("open");

    setTimeout(function () {
      // 開始旋轉右邊
      $(".right").addClass("open");
    }, 250); // 延遲 250 毫秒，讓左邊先旋轉

    setTimeout(function () {
      // 展開背面
      $(".back").addClass("open");
    }, 300); // 延遲毫秒數為[關閉背面延遲時間的一半]，確保左邊和右邊旋轉中顯示到背面不會突兀
  });

  $(".back, .right, .middle").click(function () {
    console.log("Closing card");

    setTimeout(function () {
      // 關閉左邊
      $(".left").removeClass("open");
    }, 250);

    // 關閉右邊
    $(".right").removeClass("open");

    setTimeout(function () {
      // 關閉背面
      $(".back").removeClass("open");
    }, 600); // 關閉背面延遲時間
  });
});

const backToHome = () => {
  router.push("/MyCabin");
};

// return { points, filledCircles };
</script>
