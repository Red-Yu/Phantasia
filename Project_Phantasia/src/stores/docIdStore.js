import { defineStore } from "pinia";

export const useDocIdStore = defineStore("docId", {
  state: () => ({
    docId: null, // 用來儲存 docId
  }),

  // 使用 state 來直接取得 docId
  getters: {
    getDocId: (state) => state.docId, // 用來獲取 docId，這可以當作變數使用
  },

  actions: {
    // 設置 docId
    setDocId(docId) {
      this.docId = docId;
    },

    // 清除 docId
    clearDocId() {
      this.docId = null; // 清除 docId
    },
  },
});
