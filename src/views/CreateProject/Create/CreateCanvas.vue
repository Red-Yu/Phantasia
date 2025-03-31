<template>
  <div class="CreateCanvas" id="CreateCanvasElement">
    <!-- FunctionBar -->
    <div class="FunctionBar">
      <div class="Zoom">
        <span class="btn" @click="zoomOut">–</span>
        <span> {{ zoomLevel }}% </span>
        <span class="btn" @click="zoomIn">+</span>
      </div>
      <!-- <div class="stepGroup">
        <div class="step">
          <div class="last" @click="undo"></div>
        </div>
        <div class="step">
          <div class="next" @click="redo"></div>
        </div>
      </div> -->
    </div>
    <!-- Canvas Group，綁定縮放 -->
    <div
      class="canvasGroup"
      :style="{
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: 'top center',
      }"
    >
    <h1 v-if="selectedFile.id">編輯檔案 (ID: {{ selectedFile.id }})</h1>
    <h1 v-else>創建新檔案</h1>

      <div class="canvas" v-for="(template, i) in templateStore.templates" :key="template.data.templateId">
        <component
          :is="template.component"
          v-bind="template.data"
          :mode="main"
          @updateData="updateTemplateData(i, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref ,onMounted } from "vue";
import { throttle } from "lodash";
// 引入 template store
import { useTemplateStore } from "@/stores/template";
import { useFileStore } from "@/stores/fileStore";


// =================
// 使用 Pinia store
// =================
const templateStore = useTemplateStore();
const fileStore = useFileStore();

// =================
// 縮放比例
// =================
const zoomLevel = ref(90);
// 放大
const zoomIn = throttle(() => {
  if (zoomLevel.value < 120) zoomLevel.value += 5;
}, 1000);
// 縮小
const zoomOut = throttle(() => {
  if (zoomLevel.value > 50) zoomLevel.value -= 5;
}, 1000);

// =================
// 監聽子組件 updateData 事件
// =================
const updateTemplateData = (index, newData) => {
  console.log("更新的索引:", index, "更新的資料:", newData);

  // 更新對應的 template.data
  templateStore.templates[index].data = {
    ...templateStore.templates[index].data,
    ...newData,
  };
};

// =================
// 判斷是否為舊檔案
// =================
const selectedFile = fileStore.selectedFile; // 從 Pinia 讀取選中的檔案資料
const templates = ref([]);
const main = 'edit'; // 模式設定，假設為編輯模式

function loadTemplates() {
  if (selectedFile.id) {
    templateStore.loadTemplatesFromFirebase(selectedFile.id); // 根據選中的檔案載入資料
    templates.value = templateStore.templates;
  } else {
    createNewFile();
  }
}

function createNewFile() {
  templates.value = []; // 如果是新檔案，初始化空模板
}

onMounted(() => {
  loadTemplates(); // 頁面加載時根據檔案資料載入模板
});
</script>
