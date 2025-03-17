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

import { ref, watch, computed } from "vue"; // 添加 watch 引入
import { useRouter, useRoute } from "vue-router"; // 添加 useRoute 引入
// import { auth, storage } from "@/firebase/firebaseConfig";
import { useUserAuthState } from "@/stores/userAuthState";
import "@/assets/css/main.css";

const router = useRouter();
const route = useRoute();

// 使用 Pinia store
const userAuthState = useUserAuthState();
const user = userAuthState.user; // 引用全域的用戶資料

// 計算屬性：如果用戶存在，則返回他的頭像 URL，否則返回預設頭像
const avatarURL = computed(() => {
  return user?.photoURL || null; // 預設圖片 URL
});

// 監聽 user.photoURL 的變化，並確保在變更後觸發 DOM 更新
watch(
  () => user?.photoURL,
  async (newPhotoURL) => {
    if (newPhotoURL) {
      console.log("User avatar updated:", newPhotoURL);
      // 等待下次 DOM 更新後再執行其他操作
      await nextTick();
      // 在此處處理需要在頭像更新後進行的其他操作
    }
  }
);
</script>
