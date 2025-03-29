import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    avatarURL: null, // 用來存儲頭像 URL
  }),
  actions: {
    setAvatarURL(url) {
      this.avatarURL = url;
    },
  },
});
