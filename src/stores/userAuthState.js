import { defineStore } from "pinia";
import { ref, onBeforeMount, watch, nextTick } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useUserAuthState = defineStore("userAuthState", () => {
  const user = ref(null);
  const auth = getAuth(); // 獲取 auth 實例
  const avatarURL = ref(null); // avatarURL 來儲存頭像

  // 在 store 中監聽身份變化
  onBeforeMount(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser; // 用戶已登錄，儲存用戶資料
        avatarURL.value = currentUser.photoURL; // 初始化頭像
      } else {
        user.value = null; // 用戶未登錄，清除用戶資料
        avatarURL.value = null; // 清除頭像
      }
    });
  });

  // 更新頭像 URL
  const setAvatarURL = (url) => {
    avatarURL.value = url; // 更新頭像 URL
  };

  // 監聽 user.photoURL 的變化，當用戶頭像更新時會更新狀態
  watch(
    () => user?.photoURL,
    async (newPhotoURL) => {
      if (newPhotoURL) {
        console.log("User avatar updated:", newPhotoURL);

        // 更新 avatarURL，這樣會觸發相應的 UI 更新
        avatarURL.value = newPhotoURL;

        await nextTick(); // 等待下一次更新循環
      }
    }
  );

  return {
    user,
    avatarURL,
    setAvatarURL,
  };
});
