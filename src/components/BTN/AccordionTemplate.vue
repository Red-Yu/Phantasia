<style scoped>
.modelsPreview {
  pointer-events: none;
}
</style>

<template>
  <div class="ModelBox A">
    <div class="model" @click="addTemplateBox(1)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox1></TemplateBox1>
      </div>

      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(2)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox2></TemplateBox2>
      </div>

      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(3)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox3></TemplateBox3>
      </div>

      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(4)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox4></TemplateBox4>
      </div>
      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(5)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox5></TemplateBox5>
      </div>
      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(6)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox6></TemplateBox6>
      </div>
      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(7)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox7></TemplateBox7>
      </div>
      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
    <div class="model" @click="addTemplateBox(8)">
      <div class="modelsPreview" :style="getPreviewStyle()">
        <TemplateBox8></TemplateBox8>
      </div>
      <!-- <img src="../../Assets/img/icon/white-view.png" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 引入 template store
import { useTemplateStore } from "@/stores/template";

// 使用 Pinia store
const templateStore = useTemplateStore();

// 可選擇的 TemplateBoxes
import TemplateBox1 from "../../components/TemplateBoxes/TemplateBox1.vue";
import TemplateBox2 from "../../components/TemplateBoxes/TemplateBox2.vue";
import TemplateBox3 from "../../components/TemplateBoxes/TemplateBox3.vue";
import TemplateBox4 from "../../components/TemplateBoxes/TemplateBox4.vue";
import TemplateBox5 from "../../components/TemplateBoxes/TemplateBox5.vue";
import TemplateBox6 from "../../components/TemplateBoxes/TemplateBox6.vue";
import TemplateBox7 from "../../components/TemplateBoxes/TemplateBox7.vue";
import TemplateBox8 from "../../components/TemplateBoxes/TemplateBox8.vue";

// 用於縮放預覽樣式的函數
function getPreviewStyle() {
  return {
    transform: `scale(0.15)`, // 這裡調整縮放比例
    transformOrigin: "top left", // 縮放基準點，從左上角開始縮放
  };
}

// 用來存放選擇的 template
// const canvasList = ref([]);

// 根據索引選擇要加載的 template
function addTemplateBox(i) {
  let selectedTemplateBox = null;

  if (i === 1) {
    selectedTemplateBox = TemplateBox1;
  } else if (i === 2) {
    selectedTemplateBox = TemplateBox2;
  } else if (i === 3) {
    selectedTemplateBox = TemplateBox3;
  } else if (i === 4) {
    selectedTemplateBox = TemplateBox4;
  } else if (i === 5) {
    selectedTemplateBox = TemplateBox5;
  } else if (i === 6) {
    selectedTemplateBox = TemplateBox6;
  } else if (i === 7) {
    selectedTemplateBox = TemplateBox7;
  } else if (i === 8) {
    selectedTemplateBox = TemplateBox8;
  }

  // 如果選中的模板不為空，則添加到 store 中
  if (selectedTemplateBox) {
    templateStore.addTemplate(selectedTemplateBox);
  }
}
</script>
