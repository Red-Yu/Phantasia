import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserCreateStore = defineStore("userCreate", () => {
  const UserBgcUrl = ref(""); // 預設值設為空字串
  const UserImgUrl = ref(""); 
  
  const setBgcUrl = (url) => {
    console.log("背景圖片 URL 更新:", url); // 除錯
    UserBgcUrl.value = url;
  };
  
    // 更新背景的方法
    const setImageUrl = (url) => {
      UserImgUrl.value = url;
    };

    return { UserBgcUrl,UserImgUrl ,setBgcUrl, setImageUrl };
  });