import { defineStore } from "pinia";
import { reactive, shallowRef } from "vue";
// 模板 store，用來存放選中的模板組件
export const useTemplateStore = defineStore("template", () => {
  
  const templates = reactive([]);

  function addTemplate(templateComponent, templateData = {}) {
    if (templates.length < 12) {
      const clonedTemplate = {
        component: shallowRef(templateComponent), // 存儲組件
        data: JSON.parse(JSON.stringify(templateData)), // 深拷貝存儲數據
      };
      console.log("原始 templateComponent:", templateComponent);
      console.log("拷貝後 clonedTemplate:",clonedTemplate );
      templates.push(clonedTemplate);
    }
  }

  // 更新某個模板的數據
  function updateTemplateData(index, newData) {
    if (templates[index]) {
      templates[index].data = { ...templates[index].data, ...newData };
      console.log(`模板 ${index} 更新後的數據:`, templates[index]); // ✅ 檢查這裡
    }
  }

  // 刪除模板
  function removeTemplate(i) {
    templates.splice(i, 1); // 刪除對應的模板
  }

  // 清空所有模板
  function resetTemplates() {
    templates = 0;
  }

  return {
    templates,
    addTemplate,
    removeTemplate,
    resetTemplates,
    updateTemplateData,
  };
});
