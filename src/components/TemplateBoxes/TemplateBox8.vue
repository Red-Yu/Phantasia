<script>
export default {
  name: 'TemplateBox8'
}
</script>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { eventBus } from "@/utils/eventBus";

// props = 接收 templateStore 來的數據
const props = defineProps({
  imageUrl: String, // 背景圖片
  objectUrl: String, // 物件圖片
  text: String, // 文字
  textStyle: Object, // textStyle
  isTemplateAlone: Boolean,
  mode: {
    type: String,
    default: 'edit', // 外部傳入的 mode 控制 : edit|thumbnail|preview 
  },
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
  fontSize: "32px",
  fontWeight: "600",
  textAlign: "start",
  alignItems: "start",
  color: "#153243",
});

// 回傳到 templateStore
const emitUpdatedData = () => {
  emit("updateData", { text: textContent.value, textStyle: textStyle.value });
};

// ------- { 文字內容 } ------- 
const updateTextContent = (event) => {
  textContent.value = event.target.innerText;
  emitUpdatedData();    // 即時同步輸入的內容數據
};

const editableBox = ref(null);

// 初始設定內容
onMounted(() => {
  if (editableBox.value) {
    editableBox.value.innerText = textContent.value;
  }
});

// 監聽父層 (templateStore) 的變更能同步更新
watch(() => props.text, (newText) => {
  if (newText !== textContent.value) {
    textContent.value = newText;
    // 同步更新至畫面內容 (editableBox)
    if (editableBox.value && editableBox.value.innerText !== newText) {
      editableBox.value.innerText = newText;
    }
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



// ========================
// 動畫效果
// ========================
// 定義物件 ref
const templateRef = ref(null); // 模組本人
const boxRef = ref(null);  

// 根據 mode 控制動畫行為
watch(
  () => props.mode,
  (newMode) => {
    nextTick(() => {
      if (!templateRef.value) return; // 確保 DOM 已經渲染完成

      if (newMode === 'preview') {
        const wrapperEl = templateRef.value?.parentElement; // 外層為 .modelPreview
        if (!wrapperEl) return;

        // 自定義動畫函式供外部觸發 , createPreview 呼叫他 
        wrapperEl.__startInnerAnimation = () => {
          const tl = gsap.timeline();
          tl.from(boxRef.value, { y: "100%", rotation: 20, duration: 0.18 })
          tl.to(boxRef.value, { y: 0, rotation: -20, duration: 0.4  })
          tl.to(boxRef.value, { rotation: 0, duration: 0.25  })
        };
        // console.log('動畫函式已掛到 wrapper：', wrapperEl);
      }

      // 一般和縮圖：載入時立即播放動畫
      if (newMode === 'edit' || newMode === 'thumbnail') {
        gsap.set(boxRef.value,{ transformOrigin: "left"  })
        const tl = gsap.timeline();
        tl.from(boxRef.value, { y: "100%", rotation: 20, duration: 0.18 })
        tl.to(boxRef.value, { y: 0, rotation: -20, duration: 0.4  })
        tl.to(boxRef.value, { rotation: 0, duration: 0.25  })
      }
    });
  },
  { immediate: true }
);
</script>



















<template>
  <div class="template templateBox3" ref="templateRef">
    <!-- 背景區塊 -->
    <div class="templateBgc">
      <div class="BgcTipBox" v-show="!bgcImageUrl">
        <div class="Tip-info">
          <p>Files support JPEG, JPG, PNG, and GIF</p>
          <p>with a maximum size of
          <span>2MB</span>and <br> a recommended image ratio of <span>16:9</span></p>
        </div>
        <input ref="bgcFileInputRef" type="file" @change="onImageUpload($event, 'bgc')" />
      </div>
      <img class="bgc" v-show="bgcImageUrl" :src="bgcImageUrl" @click="triggerFileInput('bgc')" />
    </div>

    <!-- 物件區塊 -->
    <div ref="boxRef" class="templateObject shape">
      <div class="ObjectTipBox" v-show="!objectImageUrl">
        <div class="Tip-info">
          <p>recommended <br> image ratio of <span>1:1</span></p>
        </div>
        <input ref="objectFileInputRef" type="file" @change="onImageUpload($event, 'object')" />
      </div>
      <img class="ObjectImg" v-show="objectImageUrl" :src="objectImageUrl" @click="triggerFileInput('object')" style="width: 100%;height: 100%;"/>
    </div>

    <!-- 文字區塊 -->
    <div class="templateText editor">
      <div 
        class="textEditorBox" 
        contenteditable="true" 
        @focus="setActiveText" 
        @input="updateTextContent" 
        @blur="emitUpdatedData"
        :style="textStyle"
        ref="editableBox"
      ></div>
    </div>
  </div>
</template>













<style scoped>
.shape {
  width: 380px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  clip-path: polygon(100% 0%, 20% 0%, 0% 100%, 100% 100%); 
  /*梯形遮罩*/
}
.templateBgc {
  .BgcTipBox {
    width: 680px;
    height: 150px;
    background-color: #dee2e6;
    border: #dee2e6 2px solid;
    top: 230px;
    right: 0;
    .Tip-info { 
      width: 340px;
      padding-left: 25px;
      text-align: start;
      align-items: start;
    }
  }
}
.editor {
  width: 250px;
  position: absolute;
  top: 30px;
  left: 25px;
}
.textEditorBox {
  width: 100%;
  min-height: 50px;
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
