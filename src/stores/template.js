import { defineStore } from "pinia";
import { ref, markRaw } from "vue";
import cloneDeep from "lodash/cloneDeep";

// 模板 store，用來存放選中的模板組件
export const useTemplateStore = defineStore("template", () => {
  const templates = ref([]); // 用來存儲選中的模板組件

  // 用複製的方式添加模板到 templates
  function addTemplate(templateComponent) {
    if (templates.value.length < 12) {
      // 使用 cloneDeep 深拷貝，確保不影響原始組件
      const clonedTemplate = markRaw(cloneDeep(templateComponent));

      console.log("是否為不同物件:", templateComponent !== clonedTemplate);
      console.log("是否為不同物件 (Object.is):", !Object.is(templateComponent, clonedTemplate));

      templates.value.push(clonedTemplate);
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
