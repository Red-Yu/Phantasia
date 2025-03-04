<template>
  <div class="ModelBox A">
    <div class="model" @click="addTemplateBox(1)">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model" @click="addTemplateBox(2)">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model" @click="addTemplateBox(3)">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model">
      <img src="../../Assets/img/icon/white-view.png" />
    </div>
    <div class="model">
      <img src="../../Assets/img/icon/white-view.png" />
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
  }

  // 如果選中的模板不為空，則添加到 store 中
  if (selectedTemplateBox) {
    templateStore.addTemplate(selectedTemplateBox);
  }
}
</script>
