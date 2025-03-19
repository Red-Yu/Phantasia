<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps, watch } from "vue";
import { gsap } from "gsap";
import { eventBus } from "@/utils/eventBus";

// 1️⃣ **定義 props，接收 templateStore 來的數據**
const props = defineProps({
  imageUrl: String, // 背景圖片
  objectUrl: String, // 物件圖片
  text: String, // 文字
});

// 2️⃣ **定義 emits，讓上傳的圖片 & 文字能回傳到 templateStore**
const emit = defineEmits(["updateData", "update:modelValue"]);

// 3️⃣ **使用 ref 儲存圖片狀態**
const bgcImageUrl = ref(props.imageUrl || null);
const objectImageUrl = ref(props.objectUrl || null);

// 讓 Vue 監聽 props 變化，確保父層 templateStore 資料變更時能同步更新
watch(() => props.imageUrl, (newUrl) => {
  bgcImageUrl.value = newUrl;
});
watch(() => props.objectUrl, (newUrl) => {
  objectImageUrl.value = newUrl;
});

// 4️⃣ **處理檔案上傳**
const bgcFileInputRef = ref(null);
const objectFileInputRef = ref(null);

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
      emit("updateData", { imageUrl }); // 🚀 **通知 templateStore 更新**
    } else if (type == "object") {
      objectImageUrl.value = imageUrl;
      emit("updateData", { objectUrl: imageUrl }); // 🚀 **通知 templateStore 更新**
    }
  } else {
    alert("請上傳有效的圖片檔案 (png, jpeg, jpg, gif)");
  }
};

const triggerFileInput = (type) => {
  if (type === "bgc") {
    bgcFileInputRef.value.click();
  } else if (type === "object") {
    objectFileInputRef.value.click();
  }
};

// 5️⃣ **動畫效果**
const templateRef = ref(null);
const box = ref(null);

onMounted(() => {
  gsap.fromTo(
    templateRef.value,
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );

  gsap.to(box.value, {
    duration: 1.5,
    delay: 1.0,
    x: 50,
    y: -60,
    width: 240,
    height: 240,
    borderRadius: "0%",
    ease: "power2.out",
    onUpdate: function () {
      const scale = this.progress() * 100;
      box.value.style.clipPath = `circle(${scale}% at center)`;
    },
  });
});

// 6️⃣ **文字輸入框**

// 產生唯一 ID，確保不同 `template.vue` 內的文字框互不干擾
const templateId = `template-${Math.random().toString(36).substr(2, 9)}`;

const textContent = ref("請輸入文字...");
const textStyle = ref({
  fontFamily: "Arial",
  fontSize: "16px",
  fontWeight: "400",
  textAlign: "start",
  alignItems: "start",
  color: "#000000",
});

// **當使用者點擊文字框時，通知 `AccordionText.vue` 目前選中的是這個 `templateId`**
const setActiveText = () => {
  eventBus.emit("setActiveTextInput", templateId);
};

// **監聽來自 `AccordionText.vue` 的事件，僅更新當前 `templateId` 的樣式**
const updateStyle = (style) => {
  textStyle.value = { ...style };
};

onMounted(() => {
  eventBus.on(`updateTextStyle-${templateId}`, updateStyle);
});

onUnmounted(() => {
  eventBus.off(`updateTextStyle-${templateId}`, updateStyle);
});
</script>

<template>
  <!-- 背景 -->
  <div ref="templateRef" class="templateBgc">
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
      :style="textStyle"
    >
      <div class="p">{{ textContent }}</div>
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
