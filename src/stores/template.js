import { defineStore } from "pinia";
import { reactive, shallowRef } from "vue";
import { nanoid } from 'nanoid';
// import { eventBus } from "@/utils/eventBus"; // 引入 mitt 事件總線

// 模板 store，用來存放選中的模板組件
  export const useTemplateStore = defineStore("template", () => {
  
  const templates = reactive([]);   // 儲存所有模板
  const storyName = reactive({ name: '' }); // 儲存專案名稱

  // 設置專案名稱
  function setStoryName(name) {
    storyName.name = name;  // 設置創建簡報名稱
  }
  
  function addTemplate(templateComponent, templateData = {}) {
    if (templates.length < 12) {
      const clonedTemplate = {
        component: shallowRef(templateComponent), // 存儲組件
        data: {
          ...JSON.parse(JSON.stringify(templateData)), // 深拷貝數據
          templateId: nanoid(), // 加上唯一 ID，給文字樣式判斷用
          projectName: storyName.name, // 把專案名稱儲存進模板中
          }
      };
      // console.log("原始 templateComponent:", templateComponent);
      // console.log("拷貝後 clonedTemplate:",clonedTemplate );
      templates.push(clonedTemplate);
    }
  }

  // 更新某個模板的數據
  function updateTemplateData(i, newData) {
    if (templates[i]) {
      templates[i].data = { ...templates[i].data, ...newData };
      console.log(`模板 ${i} 更新後的數據:`, templates[index]); // ✅ 檢查這裡
    }
  }

  // 刪除模板
  function removeTemplate(i) {
    if (templates[i]) {
      templates.splice(i, 1);
    }
  }

  // 清空所有模板
  function resetTemplates() {
    templates.splice(0, templates.length); // 清空陣列
  }


  return {
    templates,
    storyName,
    setStoryName,
    addTemplate,
    removeTemplate,
    resetTemplates,
    updateTemplateData,
  };
});
