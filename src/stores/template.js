import { defineStore } from "pinia";
import { reactive, shallowRef } from "vue";
import { nanoid } from 'nanoid';
// import { eventBus } from "@/utils/eventBus"; // 引入 mitt 事件總線

// 模板 store，用來存放選中的模板組件
  export const useTemplateStore = defineStore("template", () => {
  
  const templates = reactive([]);
  // const history = reactive([]);   // 存放歷史快照（Undo 用）
  // const redoStack = reactive([]); // 存放重做快照（Redo 用）

  // **儲存當前狀態**
  // function saveState() {
  //   const snapshot = templates.map(t => ({
  //     component: t.component, // 直接存原始的 shallowRef，不做 JSON 序列化
  //     data: JSON.parse(JSON.stringify(t.data)), // 深拷貝 data
  //   }));

  //   history.push(snapshot);
  //   redoStack.length = 0; // 只要有新操作，就清空 redoStack
  //   if (history.length > 20) history.shift(); // 限制歷史紀錄數量
  // }


  function addTemplate(templateComponent, templateData = {}) {
    if (templates.length < 12) {
      const clonedTemplate = {
        component: shallowRef(templateComponent), // 存儲組件
        data: {
          ...JSON.parse(JSON.stringify(templateData)), // 深拷貝數據
          templateId: nanoid(), // 加上唯一 ID，供動畫判斷用
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
    templates = 0;
  }

  //  // **返回上一步 (Undo)**
  //  function undo() {
  //   if (history.length > 0) {
  //     redoStack.push(templates.map(t => ({
  //       component: t.component,
  //       data: JSON.parse(JSON.stringify(t.data)),
  //     }))); // 先存當前狀態，確保 redo 有作用

  //     const lastState = history.pop(); // 取出上一個狀態
  //     if (lastState && Array.isArray(lastState)) {
  //       templates.splice(0, templates.length, ...lastState.map(t => ({
  //         component: shallowRef(t.component), // 重新包裝 shallowRef，防止 Vue 響應式丟失
  //         data: JSON.parse(JSON.stringify(t.data)), // 確保 data 正確還原
  //       })));
  //     }
  //   }
  // }

  // // **往後一步 (Redo)**
  // function redo() {
  //   if (redoStack.length > 0) {
  //     history.push(templates.map(t => ({
  //       component: t.component,
  //       data: JSON.parse(JSON.stringify(t.data)),
  //     }))); // 先存當前狀態，確保可以再次 Undo

  //     const nextState = redoStack.pop();
  //     if (nextState && Array.isArray(nextState)) {
  //       templates.splice(0, templates.length, ...nextState.map(t => ({
  //         component: shallowRef(t.component), // 重新包裝 shallowRef
  //         data: JSON.parse(JSON.stringify(t.data)), // 確保 data 正確還原
  //       })));
  //     }
  //   }
  // }


  return {
    templates,
    addTemplate,
    removeTemplate,
    resetTemplates,
    updateTemplateData,
  };
});
