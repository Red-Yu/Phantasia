import { defineStore } from "pinia";
import { ref } from "vue";

export const useCoverStore = defineStore("cover", () => {
    // 用來存儲使用者上傳的圖片 URL
    const UserCoverImageUrl = ref(null);
    
    // 用來存儲使用者選擇的封面色號
    const color = ref("#EEAD50");
  
    // 更新圖片的方法
    const setImageUrl = (url) => {
        UserCoverImageUrl.value = url;
    };
  
    // 更新顏色的方法
    const setColor = (newColor) => {
      color.value = newColor;
    };
  
    return { UserCoverImageUrl, color, setImageUrl, setColor };
  });