<template>
  <div class="CreateCanvas">
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
      <div class="canvas" v-for="(template, i) in templateStore.templates" :key="i">
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

// =================
// 使用 Pinia store
// =================
const templateStore = useTemplateStore();

// const undo = () => {
//   templateStore.undo();
// };
// const redo = () => {
//   templateStore.redo();
// };

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
</script>
