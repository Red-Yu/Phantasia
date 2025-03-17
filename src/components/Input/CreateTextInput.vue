<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import { eventBus } from "@/utils/eventBus";

const textContent = ref("請輸入文字..."); // 這個輸入框的內容（每個組件都是獨立的）
const emit = defineEmits(["update:modelValue"]);

// 監聽輸入框內容變化
const updateText = () => {
  emit("update:modelValue", textContent.value);
};

// 監聽文字 style 樣式變化
const textStyle = ref({
  fontFamily: "Arial",
  fontSize: "16px",
  fontWeight: "400",
  textAlign: "start",
  alignItems: "start",
  color: "#000000",
});

// 監聽來自 AccordionText 的事件，更新樣式
const updateStyle = (style) => {
  textStyle.value = { ...style };
};

onMounted(() => {
  eventBus.on("updateTextStyle", updateStyle);
});

onUnmounted(() => {
  eventBus.off("updateTextStyle", updateStyle);
});
</script>

<template>
  <div
    class="textEditorBox"
    contenteditable="true"
    @input="updateText"
    :style="textStyle"
  >
    <div class="p">{{ textContent }}</div>
  </div>
</template>

<style scoped>
.textEditorBox {
  display: flex;
  width: 100%;
  min-height: 100px;
  border: 1px dashed #153243;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  /* 滿版才有辦法控制字體位置 */
  .p {
    width: 100%;
  }
}
.textEditorBox:focus {
  border: 2px solid #eead50;
}
</style>
