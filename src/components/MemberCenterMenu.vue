<template>
  <div class="member-center">
    <!-- 左側選單 -->
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
import { ref, watch, onMounted, computed, nextTick } from "vue"; // 添加 watch 引入
import { useRouter, useRoute } from "vue-router"; // 添加 useRoute 引入
// import { auth, storage } from "@/firebase/firebaseConfig";
import { useUserAuthState } from "@/stores/userAuthState";
import "@/assets/css/main.css";

const router = useRouter();
const route = useRoute();

// 使用 Pinia store
const userAuthState = useUserAuthState();
const user = userAuthState.user; // 引用全域的用戶資料

// 計算屬性：只有在用戶資料加載完畢後，才會返回頭像 URL
const avatarURL = computed(() => {
  return user && user.photoURL
    ? user.photoURL
    : "/MyColset/character115x409.png"; // 如果沒有 photoURL 則返回預設圖
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
