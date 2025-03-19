<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
import { eventBus } from "@/utils/eventBus";

// 接收從父層傳入的 uniqueId（這是用來區分不同輸入框的唯一識別碼）
const props = defineProps({
  templateId: String,
});

const textContent = ref("請輸入文字...");
const textStyle = ref({
  fontFamily: "Arial",
  fontSize: "16px",
  fontWeight: "400",
  textAlign: "start",
  alignItems: "start",
  color: "#000000",
});

// 定義 emits（如果這個輸入框需要 v-model 綁定 textContent）
const emit = defineEmits(["update:modelValue"]);

// 監聽輸入框內容變化
const updateText = () => {
  emit("update:modelValue", textContent.value);
};

// 監聽來自 AccordionText 的事件，更新樣式
const updateStyle = (style) => {
  textStyle.value = { ...style };
};

// 當輸入框被點擊時，告訴 AccordionText 它是當前目標
const setActive = () => {
  eventBus.emit("setActiveTextInput", props.templateId);
};

// 只監聽與自己 `templateId` 相符的樣式變更事件
onMounted(() => {
  eventBus.on(`updateTextStyle-${props.templateId}`, updateStyle);
});

onUnmounted(() => {
  eventBus.off(`updateTextStyle-${props.templateId}`, updateStyle);
});
</script>

<template>
  <div
    class="textEditorBox"
    contenteditable="true"
    @input="updateText"
    @focus="setActive"
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
}

.textEditorBox:focus {
  border: 2px solid #eead50;
}
</style>
