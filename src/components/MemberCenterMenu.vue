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
import { ref, watch, onMounted } from "vue"; // 添加 watch 引入
import { useRouter, useRoute } from "vue-router"; // 添加 useRoute 引入
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
      avatarURL.value =
        user.photoURL ||
        new URL("../Assets/Day/myColset/avatarDefault.png", import.meta.url)
          .href;
    } else {
      avatarURL.value = new URL(
        "../Assets/Day/myColset/avatarDefault.png",
        import.meta.url
      ).href;
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

// 優化子選單點擊處理
const selectSubMenu = (mainIndex, subIndex) => {
  const subItem = menuItems.value[mainIndex].subItems[subIndex];

  // 先更新選中狀態
  activeIndex.value = mainIndex;
  activeSubMenu.value = subIndex;

  // 然後進行導航
  if (subItem.path) {
    router.push(subItem.path);
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
