<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps, watch } from "vue";
import { gsap } from "gsap";
import { eventBus } from "@/utils/eventBus";

// props = 接收 templateStore 來的數據
const props = defineProps({
  imageUrl: String, // 背景圖片
  objectUrl: String, // 物件圖片
  text: String, // 文字
  textStyle: Object, // textStyle
  isTemplateAlone: Boolean,
});

/* { 檔案回傳資料給 templateStore }
update:modelValue 用於支援 v-model 雙向綁定
updateData 用於回傳上傳的圖片與文字資料 */

const emit = defineEmits(["updateData", "update:modelValue"]);

// ===========================
// 照片上傳功能 
// ===========================

// 檔案上傳 (基本)
const bgcFileInputRef = ref(null);
const objectFileInputRef = ref(null);

const bgcImageUrl = ref(props.imageUrl || null);    // 使用 ref 儲存圖片狀態
const objectImageUrl = ref(props.objectUrl || null);

const validateFileType = (file) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  return allowedTypes.includes(file.type);
};

const onImageUpload = (event, type) => {
  const file = event.target.files[0];
  if (file && validateFileType(file)) {
    const imageUrl = URL.createObjectURL(file);

    if (type == "bgc") {
      bgcImageUrl.value = imageUrl;
      emit("updateData", { imageUrl }); // 更新 templateStore
    } else if (type == "object") {
      objectImageUrl.value = imageUrl;
      emit("updateData", { objectUrl: imageUrl }); // 更新 templateStore
    }
  } else {
    alert("請上傳有效的圖片檔案 (png, jpeg, jpg, gif)");
  }
};

// 點擊已上傳圖片重新開啟上傳功能
const triggerFileInput = (type) => {
  if (type === "bgc") {
    bgcFileInputRef.value.click();
  } else if (type === "object") {
    objectFileInputRef.value.click();
  }
};

// -----------------------
// 檔案回傳資料給 templateStore 
// -----------------------
// Vue 監聽 props 變化，確保父層 templateStore 資料變更時能同步更新
watch(() => props.imageUrl, (newUrl) => {
  bgcImageUrl.value = newUrl;
});
watch(() => props.objectUrl, (newUrl) => {
  objectImageUrl.value = newUrl;
});


// ===========================
// 文字效果綁定 
// ===========================

// 初值設定
const templateId = `template-${Math.random().toString(36).substr(2, 9)}`; // 產生唯一 ID，確保文字框互不干擾
const textContent = ref(props.text || "Please enter text...");  // textContent 預設接收 props.text，確保能和 templateStore 連動
const textStyle = ref(props.textStyle || {  // 定義 textStyle
  fontFamily: "Arial",
  fontSize: "20px",
  fontWeight: "500",
  textAlign: "center",
  alignItems: "center",
  color: "#153243",
});

// 更新到 templateStore
const emitUpdatedData = () => {
  emit("updateData", { text: textContent.value, textStyle: textStyle.value });
};

// ------- { 文字內容 } ------- 
const updateTextContent = (event) => {
  textContent.value = event.target.innerText;
  emitUpdatedData();    // 即時同步輸入的內容數據
};

// 監聽輸入新內容(textContent)
watch(textContent, (newVal, oldVal) => {
  if (newVal !== oldVal) { // 先監聽有沒有變更在執行
    emitUpdatedData();
  }
});

// 監聽父層 (templateStore) 的變更能同步更新
watch(() => props.text, (newText) => {
  if (newText !== textContent.value) {
    textContent.value = newText;
  }
});
// ------- { 文字 Style } ------- 

// 點擊文字框通知 `AccordionText.vue`
const setActiveText = () => {
  eventBus.emit("setActiveTextInput", templateId); // templateId 避免引響其他框框
};

// 監聽來自 `AccordionText.vue` 的事件，更新當前 templateId
const updateStyle = (style) => {
  textStyle.value = { ...style };
  emitUpdatedData(); 
};

// 監聽 textStyle 新變化
watch(textStyle, () => {
  emitUpdatedData();
}, { deep: true });

// 監聽父層 (templateStore) 的變更能同步更新
watch(() => props.textStyle, (newStyle) => {
  if (newStyle !== textStyle.value) {
    textStyle.value = newStyle;
  }
}, { deep: true });

// 模板[載入]畫面 -> 監聽 (eventBus.on)"updateTextStyle" 事件 -> 執行 updateStyle 函式
onMounted(() => {
  eventBus.on(`updateTextStyle-${templateId}`, updateStyle);
});
// 模板[移除]畫面 -> 停止監聽 "updateTextStyle" 事件 -> 執行 updateStyle 函式
onUnmounted(() => {
  eventBus.off(`updateTextStyle-${templateId}`, updateStyle);
});


// ===========================
// 動畫效果 
// ===========================
const templateRef = ref(null);
const box = ref(null);

// 動畫函數
const templateAnimation = () => {
  // box 動畫
  gsap.fromTo(box.value,{
    delay:3,
    opacity: 0,
    duration: 1.5,
  },{ 
    opacity: 1,
    duration: 1.5,
    x: 50,
    y: -60,
    width: 240,
    height: 240,
    borderRadius: "0%",
    ease: "power2.out",
    onUpdate: function () {
      if (box.value) {
        const scale = this.progress() * 100;
        box.value.style.clipPath = `circle(${scale}% at center)`;
      }
    },
  }
  );
};
onMounted(() => {
  // 初始加載時執行動畫
  templateAnimation();
  // console.log("原始狀況執行動畫");

  // 監聽父層發送的事件，並重新執行動畫
  eventBus.on("startTemplateAnimation", () => {
    console.log("收到startTemplateAnimation，重新執行動畫");
    templateAnimation();
  });
});

</script>


<template>
<div class="template templateBox5" ref="templateRef">
  <!-- 背景 -->
  <div class="templateBgc">
    <div class="BgcTipBox" v-show="!bgcImageUrl">
      <p>
        <div>Files support JPEG, JPG, PNG, and GIF</div>
        <div>with a maximum size of
        <span>2MB</span>and a recommended image ratio of <span>16:9</span></div>
      </p>
      <input ref="bgcFileInputRef" type="file" @change="onImageUpload($event, 'bgc')" />
    </div>
    <img class="bgc" v-show="bgcImageUrl" :src="bgcImageUrl" @click="triggerFileInput('bgc')" />
  </div>
  
  <!-- 物件 -->
  <div ref="box" class="templateObject shape">
    <div class="ObjectTipBox" v-show="!objectImageUrl">
      <p>
        <div>Files support <br>JPEG, JPG, PNG, and GIF</div>
        <div>recommended image ratio of <span>1:1</span></div>
      </p>
      <input ref="objectFileInputRef" type="file" @change="onImageUpload($event, 'object')" />
    </div>
    <img class="ObjectImg" :src="objectImageUrl" @click="triggerFileInput('object')" />
  </div>
  
  <!-- 文字 -->
  <div class="templateText editor">
    <div 
    class="textEditorBox" 
    contenteditable="true" 
    @focus="setActiveText" 
    @input="updateTextContent" 
    @blur="emitUpdatedData"
    :style="textStyle"
  >
      <div style="width: 100%;">{{ textContent }}</div>
    </div>
  </div>
</div>
</template>

<style scoped>
.shape {
  width: 60px;
  height: 60px;
  clip-path: circle(0% at center);
  position: absolute;
  left: 0;
  bottom: 0;
}
.editor {
  width: 250px;
  position: absolute;
  top: 100px;
  right: 50px;
}
.textEditorBox {
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
}
.textEditorBox:hover {
  border: 2px solid #eead50;
}
.textEditorBox:focus {
  border: 2px solid #eead50;
}
</style>
