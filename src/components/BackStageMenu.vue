<script setup>
import { ref, onMounted } from "vue";
import TabButton from "./BTN/TabButton.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const auth = getAuth();
const avatarURL = ref("");
const isClosetOpen = ref(false); // 控制衣櫃管理選單展開/收起

const toggleClosetMenu = () => {
  isClosetOpen.value = !isClosetOpen.value; // 切換狀態
};

// 點擊其他選單時，強制收起衣櫃管理子選單
const closeClosetMenu = () => {
  isClosetOpen.value = false;
};

const changeStyle = () => {};

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    // 將回調設為 async 函數
    if (user) {
      // 更新頭像 URL
      avatarURL.value =
        user.photoURL ||
        new URL("../Assets/Day/myColset/avatarDefault.png", import.meta.url)
          .href; // 如果用戶有頭像，則使用；否則使用預設頭像
    } else {
      avatarURL.value = new URL(
        "../Assets/Day/myColset/avatarDefault.png",
        import.meta.url
      ).href;
    }
  });
});

const backToHome = () => {
  router.push("/");
};
</script>

<style scoped>
@import "../Assets/css/main.css";
/* @import "../Assets/css/backStageMenu.css"; */
</style>

<!-- 後台左側風琴選單 -->
<template>
  <!-- sass:MenuSidebar -->
  <div class="backStageMenu">
    <div class="sidebar">
      <div class="user">
        <div class="useImg">
          <div class="avatar">
            <img
              class="avaterImg"
              v-if="avatarURL"
              :src="avatarURL"
              alt="User Avatar"
            />
            <img class="avaterBg" src="../Assets/Day/myColset/avaterBg.jpg" />
          </div>
        </div>
      </div>
      <div class="tab-group">
        <TabButton text="會員管理" to="/BKMember" @click="closeClosetMenu" />
        <TabButton
          text="商品管理"
          to="/BKMember/BKProduct"
          @click="closeClosetMenu"
        />
        <!-- <TabButton
          text="資訊管理"
          to="/BKMember/BKInfo"
          @click="closeClosetMenu"
        /> -->
        <!-- 衣櫃管理 按鈕 -->
        <div @click="toggleClosetMenu">
          <TabButton
            text="衣櫃管理"
            to="/BKMember/BKMyColsetHair"
            :class="{ active: isClosetOpen }"
          />
        </div>

        <!-- 手風琴展開/收起 子選單 -->
        <div v-if="isClosetOpen" class="sub-menu">
          <TabButton
            class="sub-item"
            text="髮型管理"
            to="/BKMember/BKMyColsetHair"
            @click="changeStyle"
          />
          <TabButton
            class="sub-item"
            text="服裝管理"
            to="/BKMember/BKMyColsetClothes"
            @click="changeStyle"
          />
          <TabButton
            class="sub-item"
            text="精靈管理"
            to="/BKMember/BKMyColsetPartner"
            @click="changeStyle"
          />
          <TabButton
            class="sub-item"
            text="魔法陣管理"
            to="/BKMember/BKMyColsetMagicCircle"
            @click="changeStyle"
          />
        </div>
        <div class="logout-container">
          <button @click="backToHome" class="logout">
            <div class="btnKey-M dark">
              <p>返回首頁</p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 右側(子頁面)顯示區域 -->
    <main>
      <router-view></router-view>
      <!-- 顯示子頁面內容 -->
    </main>
  </div>
</template>
