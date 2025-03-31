<!-- sass:MenuSidebar -->
<template>
  <div class="ProjectMenu">
    <div class="sidebar">
      <div class="user">
        <div class="useImg">
          <div class="avatar" style="cursor: pointer" @click="ToMyCloset">
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
        <TabButton text="Publish" to="/CreateProject/Draft" />
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
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "@/assets/css/main.css";

const router = useRouter();
const route = useRoute();

const auth = getAuth();
const avatarURL = ref("");

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
  const defaultAvatar = new URL(
    "../Assets/Day/myColset/avatarDefault.png",
    import.meta.url
  ).href;

  if (!user) return defaultAvatar;

  // 如果是 Google 頭像，返回預設頭像
  if (isGoogleAvatar(user.photoURL)) {
    return defaultAvatar;
  }

  // 否則返回用戶的頭像或預設頭像
  return user.photoURL || defaultAvatar;
}

onMounted(() => {
  // 先檢查是否有當前登入用戶，立即處理頭像
  const currentUser = auth.currentUser;
  if (currentUser) {
    avatarURL.value = getProperAvatarURL(currentUser);
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // 更新頭像 URL - 使用過濾函數
      avatarURL.value = getProperAvatarURL(user);
    } else {
      avatarURL.value = new URL(
        "../Assets/Day/myColset/avatarDefault.png",
        import.meta.url
      ).href;
    }
  });
});

const ToMyCloset = () => {
  router.push("/MyCabin/MyColset");
};
</script>
