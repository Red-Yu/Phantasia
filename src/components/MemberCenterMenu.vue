<template>
  <div class="member-center">
    <!-- 左側選單 -->
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
        <!-- 主選單項目 -->
        <div v-for="(tab, index) in menuItems" :key="index">
          <div
            :class="['btnTab', { 'btnTab-click': activeIndex === index }]"
            @click="toggleSubMenu(index)"
          >
            <div class="text">{{ tab.title }}</div>
            <div class="tab-cross">
              <div class="cols">
                <span></span>
                <span></span>
              </div>
              <div class="rows">
                <span></span>
              </div>
            </div>
          </div>

          <!-- 子選單項目 -->

          <template v-if="tab.subItems.length > 0 && activeIndex === index">
            <div
              v-for="(subItem, subIndex) in tab.subItems"
              :key="subIndex"
              :class="[
                'btnTab-list',
                { 'btnTab-click': activeSubMenu === subIndex },
              ]"
              @click="selectSubMenu(index, subIndex)"
            >
              <div class="pagination"></div>
              <!--子頁面前的藍色區塊 -->

              <div class="text">{{ subItem.title }}</div>

              <div class="tab-cross">
                <div class="cols">
                  <span></span>
                  <span></span>
                </div>
                <div class="rows">
                  <span></span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 右側內容區 -->
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router"; // 添加 useRoute 引入
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";

import "@/assets/css/main.css";

const router = useRouter();
const route = useRoute();

const auth = getAuth();
const avatarURL = ref("");

// 添加訂閱狀態追踪
const hasActiveSubscription = ref(false);

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
      // 檢查用戶訂閱狀態
      try {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          where("status", "==", "pending"),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(q);
        hasActiveSubscription.value = !querySnapshot.empty;
      } catch (error) {
        console.error("Error checking subscription status:", error);
        hasActiveSubscription.value = false;
      }
    } else {
      avatarURL.value = new URL(
        "../Assets/Day/myColset/avatarDefault.png",
        import.meta.url
      ).href;
      hasActiveSubscription.value = false;
    }
  });
});

// 設置選單和頁面路徑等
const SUBSCRIPTION_PLAN_INDEX = 1;
const MY_PLAN_SUB_INDEX = 0;

const menuItems = ref([
  {
    title: "Member Center",
    path: "/MemberCenter",
    subItems: [],
  },
  {
    title: "Subscription Plan",
    path: "/MemberCenter/MyPlanSubscribed",
    subItems: [
      {
        title: "My Plan",
        path: "/MemberCenter/MyPlanVisitor",
      },
      {
        title: "Purchase History",
        path: "/MemberCenter/PurchaseHistory",
      },
    ],
  },
  {
    title: "My Projects",
    path: "",
    subItems: [
      {
        title: "Published",
        path: "/MemberCenter/MyProjects",
      },
      {
        title: "Removed",
        path: "/MemberCenter/MyProjectsRemoved",
      },
    ],
  },
  {
    title: "Account Setting",
    path: "/MemberCenter/AccountSetting",
    subItems: [],
  },
  {
    title: "FAQ",
    path: "/MemberCenter/FAQ",
    subItems: [],
  },
]);

const activeIndex = ref(null);
const activeSubMenu = ref(null);

watch(
  () => route.path,
  (newPath) => {
    // 找到匹配當前路徑的選單項目
    menuItems.value.forEach((item, index) => {
      // 檢查主選單路徑
      if (item.path === newPath) {
        activeIndex.value = index;
        activeSubMenu.value = null;
      }

      // 檢查子選單路徑
      if (item.subItems?.length) {
        const subIndex = item.subItems.findIndex(
          (subItem) => subItem.path === newPath
        );
        if (subIndex !== -1) {
          activeIndex.value = index;
          activeSubMenu.value = subIndex;
        }
      }
    });
  },
  { immediate: true }
);

const toggleSubMenu = (index) => {
  const item = menuItems.value[index];

  if (item.subItems.length === 0 && item.path) {
    // 如果沒有子選單且有路徑，直接導航
    router.push(item.path);
    activeIndex.value = index;
    activeSubMenu.value = null;
  } else {
    // 有子選單，只處理展開/收合
    activeIndex.value = activeIndex.value === index ? null : index;
    activeSubMenu.value = null; // 重設子選單選中狀態
  }
};

// 修改 selectSubMenu 函數以根據訂閱狀態決定導航目標
// 修改 selectSubMenu 函數
const selectSubMenu = (mainIndex, subIndex) => {
  // 處理 My Plan 頁面的特殊導航邏輯
  if (mainIndex === SUBSCRIPTION_PLAN_INDEX && subIndex === MY_PLAN_SUB_INDEX) {
    const targetPath = hasActiveSubscription.value
      ? "/MemberCenter/MyPlanSubscribed"
      : "/MemberCenter/MyPlanVisitor";

    // 先更新狀態，再導航
    activeIndex.value = mainIndex;
    activeSubMenu.value = subIndex;

    // 使用 router.push 的回調確保導航完成後保持選中狀態
    router.push(targetPath).then(() => {
      // 確保導航後選中狀態仍然保持
      activeIndex.value = mainIndex;
      activeSubMenu.value = subIndex;
    });
  } else {
    // 其他子選單的常規導航邏輯
    const subItem = menuItems.value[mainIndex].subItems[subIndex];
    if (subItem.path) {
      // 先更新狀態，再導航
      activeIndex.value = mainIndex;
      activeSubMenu.value = subIndex;
      router.push(subItem.path).then(() => {
        // 確保導航後選中狀態仍然保持
        activeIndex.value = mainIndex;
        activeSubMenu.value = subIndex;
      });
    }
  }
};

const ToMyCloset = () => {
  router.push("/MyCabin/MyColset");
};
</script>

<style scoped>
.member-center {
  display: flex;
  min-width: 0;
}

.right-content {
  flex: 1;
  padding: 50px;
  min-width: 0;
}

.btnTab-list.btnTab-click .text {
  color: #fffdef;
}

.btnTab-list .tab-cross {
  width: 42px;
}

/* 新增過渡動畫 */
.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: all 0.3s ease;
}

.sub-menu-enter-from,
.sub-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.pagination {
  background-color: #153243;
  width: 10px;
  height: auto;
}
</style>