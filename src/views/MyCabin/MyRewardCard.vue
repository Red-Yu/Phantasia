<style scoped>
@import "../../Assets/css/MyRewardCard.css";
</style>

<template>
  <div class="blackWrapper">
    <div
      class="wrap"
      :style="{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s' }"
    >
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
                  <img
                    src="../../Assets/Day/rewardCard/avatar.png"
                    alt=""
                    class="avatar"
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
              </div>
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
                </div>
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
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";

const isVisible = ref(false);
const router = useRouter();

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      isVisible.value = true; // 0.8秒後觸發 opacity 變化
    }, 200); // 延遲 0.8 秒
  });
});

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
</script>
