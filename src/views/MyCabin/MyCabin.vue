<style scoped>
@import "../../Assets/css/index.css";

/* ==========滑動效果========== */

.slideArea {
  transition: transform 0.7s ease-in-out, opacity 0.5s ease-in-out;
}

.slideArea.sliding {
  transform: translateX(-2200px);
  opacity: 0;
}
</style>

<template>
  <BlackCover />

  <div class="blackWrapper">
    <div :class="['wrapper slideArea', { sliding: isSliding }]">
      <div class="myCabinContent">
        <div class="slogon">
          <h1 class="title1 flipInY">My Cabin</h1>
          <h6 class="title3 rollIn">
            This is your cabin. Try clicking on the characters and bookshelve in
            the picture!
          </h6>
        </div>

        <div class="menu">
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

      <!-- ====================背景圖片======================= -->

      <div class="positionArea">
        <div class="main_container" ref="parallaxContainer">
          <div class="myCabinCoverBase">
            <img
              ref="myCabinBaseCover"
              src="../../Assets/Day/myCabin/myCabinBaseLight.jpg"
              alt=""
              class="myCabinBaseCover"
            />
          </div>
          <div class="parallax-wrapper" data-depth="0.04">
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

          <div class="parallax-wrapper" data-depth="0.05">
            <div class="hoverAreaBookcase" @click="ToMyBookcase"></div>
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

          <div class="parallax-wrapper" data-depth="0.07">
            <div class="characterWrapper">
              <img
                src="../../Assets/Day/myCabin/character115x409_hover.png"
                alt=""
                class="character_hover"
                @click="ToMyColset"
              />

              <!-- 角色旁邊的對話框 -->
              <div class="dialogBox characterDialog">
                <p>If you want a style change, just let me know!</p>
              </div>

              <!-- <img
                src="../../Assets/Day/myCabin/character115x409.png"
                alt=""
                class="character"
              /> -->

              <img
                class="avaterImg"
                v-if="avatarURL"
                :src="avatarURL"
                alt="User Avatar"
              />
            </div>
          </div>

          <div class="parallax-wrapper" data-depth="0.055">
            <div class="elfWrapper">
              <img
                src="../../Assets/Day/myCabin/elf183x291_hover.png"
                alt=""
                class="elf_hover"
                @click="ToMyRewardCard"
              />
              <!-- <img
                src="../../Assets/Day/myCabin/elf183x291.png"
                alt=""
                class="elf"
              /> -->

              <!-- 夥伴旁邊的對話框 -->
              <div class="dialogBox partnerDialog">
                <p>Let's check out your reward card points!</p>
              </div>

              <img
                class="partnerImg"
                v-if="partnerURL"
                :src="partnerURL"
                alt="User Partner"
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
// import { useUserAuthState } from "@/stores/userAuthState";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import BlackCover from "../../components/BlackCover.vue";

const parallaxContainer = ref(null);
const router = useRouter();
const auth = getAuth();
// 使用 Pinia store
// const userAuthState = useUserAuthState();
// const user = userAuthState.user; // 引用全域的用戶資料

const partnerURL = ref("");
const avatarURL = ref("");

const myCabinBaseCover = ref(null);

// // 計算屬性：只有在用戶資料加載完畢後，才會返回頭像 URL
// const avatarURL = computed(() => {
//   return user && user.photoURL
//     ? user.photoURL
//     : "/MyColset/character115x409.png"; // 如果沒有 photoURL 則返回預設圖
// });

// 監聽 user.photoURL 的變化，並確保在變更後觸發 DOM 更新
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

// 獲取小精靈圖片 URL
// const fetchPartnerImageURL = async () => {
//   if (user) {
//     const userDoc = doc(db, "users", user.uid); // 使用當前用戶的 UID 查詢 Firestore 文檔
//     try {
//       const docSnapshot = await getDoc(userDoc); // 獲取用戶資料
//       if (docSnapshot.exists()) {
//         const data = docSnapshot.data();
//         partnerURL.value = data.partnerURL || "/MyColset/Ollie.png"; // 設置小精靈圖片 URL
//       } else {
//         console.log("No such document!");
//         partnerURL.value = "/MyColset/Ollie.png"; // 如果沒有該文檔，設置為預設圖片
//       }
//     } catch (error) {
//       console.error("Error fetching partner image URL:", error);
//       partnerURL.value = "/MyColset/Ollie.png"; // 當發生錯誤時設置為預設圖片
//     }
//   } else {
//     partnerURL.value = "/MyColset/Ollie.png"; // 如果用戶未登錄，設置為預設圖片
//   }
// };

// =========================================

const isSliding = ref(false);

const backToHome = () => {
  isSliding.value = true;

  setTimeout(() => {
    router.push("/");
  }, 375);
};

const ToMyRewardCard = () => {
  router.push("/MyCabin/MyRewardCard");
};

const ToMyBookcase = () => {
  router.push("/MyCabin/MyBookcase");
};

const ToMyColset = () => {
  router.push("/MyCabin/MyColset");
};

onMounted(() => {
  nextTick(() => {
    if (myCabinBaseCover.value) {
      myCabinBaseCover.value.style.transition = "opacity 1s ease-out";
      setTimeout(() => {
        myCabinBaseCover.value.style.opacity = 0;
        myCabinBaseCover.value.style.pointerEvents = "none";
      }, 650);
    }
  });

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

  // ===============獲取用戶圖片===============

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // 獲取用戶資料
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          partnerURL.value =
            userData.partnerURL ||
            new URL("../../Assets/Day/myColset/elf_1.png", import.meta.url);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }

      // // 更新頭像 URL
      // avatarURL.value =
      //   user.photoURL ||
      //   new URL("../../Assets/Day/myColset/avatarDefault.png", import.meta.url)
      //     .href; // 如果用戶有頭像，則使用；否則使用預設頭像

      // 檢查是否為 Google 頭像
      const isGoogleAvatar =
        user.photoURL &&
        (user.photoURL.includes("googleusercontent.com") ||
          user.photoURL.includes("google.com"));

      // 更新頭像 URL，如果是 Google 頭像則不使用
      avatarURL.value = isGoogleAvatar
        ? new URL(
            "../../Assets/Day/myColset/avatarDefault.png",
            import.meta.url
          ) // 使用預設頭像
        : user.photoURL ||
          new URL(
            "../../Assets/Day/myColset/avatarDefault.png",
            import.meta.url
          ); // 使用自訂頭像或預設頭像
    } else {
      // 用戶未登入
      avatarURL.value = new URL(
        "../../Assets/Day/myColset/avatarDefault.png",
        import.meta.url
      ).href;
      partnerURL.value = new URL(
        "../../Assets/Day/myColset/elf_1.png",
        import.meta.url
      ).href;
    }
  });
});
</script>
