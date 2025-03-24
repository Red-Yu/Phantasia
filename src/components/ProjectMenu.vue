<!-- sass:MenuSidebar -->
<template>
  <div class="ProjectMenu">
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
        <TabButton
          text="CreateProject"
          to="/CreateProject"
          @click="changeStyle"
        />
        <TabButton text="Draft" to="/CreateProject/Draft" />
      </div>
    </div>
    <!-- Tab分頁面顯示內容 -->
    <main>
      <router-view></router-view>
      <!-- 顯示子頁面內容 -->
    </main>
  </div>
</template>

<script setup>
import TabButton from "./BTN/TabButton.vue";

const changeStyle = () => {};

import { ref, onMounted } from "vue"; // 添加 watch 引入
import { useRouter, useRoute } from "vue-router"; // 添加 useRoute 引入
// import { auth, storage } from "@/firebase/firebaseConfig";
// import { useUserAuthState } from "@/stores/userAuthState";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "@/assets/css/main.css";

const router = useRouter();
const route = useRoute();

const auth = getAuth();
const avatarURL = ref("");

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    // 將回調設為 async 函數
    if (user) {
      // 更新頭像 URL
      avatarURL.value = user.photoURL || "/MyColset/avatarDefault.png"; // 如果用戶有頭像，則使用；否則使用預設頭像
    } else {
      avatarURL.value = "/MyColset/avatarDefault.png";
    }
  });
});
</script>
