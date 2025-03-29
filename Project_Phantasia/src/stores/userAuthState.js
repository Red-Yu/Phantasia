import { defineStore } from "pinia";
import { ref, onBeforeMount, watch, nextTick } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const useUserAuthState = defineStore("userAuthState", () => {
  const user = ref(null);
  const auth = getAuth(); // 獲取 auth 實例
  const avatarURL = ref(null); // 儲存頭像
  const partnerURL = ref(null); // 儲存小精靈

  // 在 store 中監聽身份變化
  onBeforeMount(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser; // 用戶已登錄，儲存用戶資料
        avatarURL.value = currentUser.photoURL; // 初始化頭像
      } else {
        user.value = null; // 用戶未登錄，清除用戶資料
        avatarURL.value = null; // 清除頭像
        partnerURL.value = null; // 清除小精靈圖片
      }
    });
  });

  // 更新頭像 URL
  const setAvatarURL = (url) => {
    avatarURL.value = url; // 更新頭像 URL
  };

  // 更新小精靈圖片 URL
  const setPartnerURL = (url) => {
    partnerURL.value = url; // 更新小精靈圖片 URL
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

  // 登出方法
  const logout = async () => {
    try {
      await signOut(auth); // 使用 Firebase 的 signOut 方法登出
      user.value = null; // 清除 store 中的用戶資料
      avatarURL.value = null; // 清除頭像
      partnerURL.value = null; // 清除小精靈圖片
      console.log("User successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    user,
    avatarURL,
    partnerURL,
    setAvatarURL,
    setPartnerURL,
    logout,
  };
});
