<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import CreateTextInput from "../Input/CreateTextInput.vue";
// ====================
// 檔案上傳
// ====================
const templateRef = ref(null);
const box = ref(null);

// 分開存放圖片 URL
const bgcImageUrl = ref(null); // 背景圖片
const objectImageUrl = ref(null); // 物件圖片

const bgcFileInputRef = ref(null);
const objectFileInputRef = ref(null);

// 定義圖片上傳類別
const validateFileType = (file) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  return allowedTypes.includes(file.type);
};

// 處理圖片上傳（接收 type 來判斷是哪個上傳框）
const onImageUpload = (event, type) => {
  const file = event.target.files[0];
  if (file && validateFileType(file)) {
    // 釋放之前的 URL，避免記憶體累積
    if (type == "bgc" && bgcImageUrl.value) {
      URL.revokeObjectURL(bgcImageUrl.value);
    } else if (type == "object" && objectImageUrl.value) {
      URL.revokeObjectURL(objectImageUrl.value);
    }

    // JavaScript API，建立本地檔案的臨時 URL
    if (type == "bgc") {
      bgcImageUrl.value = URL.createObjectURL(file);
    } else if (type == "object") {
      objectImageUrl.value = URL.createObjectURL(file);
    }
  } else {
    alert("請上傳有效的圖片檔案 (png, jpeg, jpg, gif)");
  }
};

// 讓點擊背景圖片時，打開上傳框
const triggerFileInput = (type) => {
  if (type === "bgc") {
    bgcFileInputRef.value.click();
  } else if (type === "object") {
    objectFileInputRef.value.click();
  }
};

// ====================
// 動畫效果
// ====================

onMounted(() => {
  // 引入動畫
  gsap.fromTo(
    templateRef.value,
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );
  // 物件動畫
  gsap.to(box.value, {
    duration: 1.5,
    delay: 1.0, // 這個動畫會比前面的晚 1 秒開始
    x: 50, // 向右移動
    y: -60, // 向上移動
    width: 240,
    height: 240,
    borderRadius: "0%", // 變成方形
    ease: "power2.out",
    onUpdate: function () {
      const scale = this.progress() * 100; // 取得動畫進度
      box.value.style.clipPath = `circle(${scale}% at center)`; // 使用 clip-path 遮罩
    },
  });
  // 字體動畫;
});

</script>

<template>
  <!-- 外層還有一個 canvas -->
  <!-- 背景 -->
  <div ref="templateRef" class="templateBgc">
    <div class="BgcTipBox" v-show="!bgcImageUrl">
      <p>
        <div>Files support JPEG, JPG, PNG, and GIF</div>
        <div>with a maximum size of <span>2MB</span> and a recommended image ratio of <span>16:9</span> </div>
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
        <div>recommended image ratio of <span>1:1</span> </div>
      </p>
      <input
        id="please"
        type="file"
        ref="objectFileInputRef"
        @change="onImageUpload($event, 'object')"
      />
    </div>
    <img class="ObjectImg" :src="objectImageUrl" @click="triggerFileInput('object')" />
  </div>
  <!-- 文字 -->
  <div class="templateText editor">
    <CreateTextInput />
  </div>
</template>

<style>
/* template 共用版面配置 ==> CreateTemplate.scss */
@import "@/Assets/css/main.css";
</style>

<style scoped>
.shape {
  width: 60px;
  height: 60px;
  clip-path: circle(0% at center); /* 初始遮罩為最小 */
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
</style>
