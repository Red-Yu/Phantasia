import { defineStore } from "pinia";
import { ref } from "vue";

// 模板 store，用來存放選中的模板組件
export const useTemplateStore = defineStore("template", () => {
  const templates = ref([]); // 用來存儲選中的模板組件

  // 添加模板到 templates
  function addTemplate(templateComponent) {
    if (templates.value.length < 12) {
      templates.value.push(templateComponent); // 將模板組件推入數組
    }
  }

  // 刪除模板
  function removeTemplate(i) {
    templates.value.splice(i, 1); // 刪除對應的模板
  }

  // 清空所有模板
  function resetTemplates() {
    templates.value = [];
  }

  return {
    templates,
    addTemplate,
    removeTemplate,
    resetTemplates,
  };
});
