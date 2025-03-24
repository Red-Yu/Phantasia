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
    <div ref="boxref" class="templateObject shape">
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
        <div style="width: 100%">{{ textContent }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  mode: {
    type: String,
    default: 'edit',
  },
});

const templateRef = ref(null);
const boxref = ref(null);

watch(
  () => props.mode,
  (newMode) => {
    nextTick(() => {
      if (!templateRef.value) return;

      if (newMode === 'preview') {
        const wrapperEl = templateRef.value?.parentElement;
        if (!wrapperEl) return;

        wrapperEl.__startInnerAnimation = () => {
          console.log('✅ 預覽動畫執行');

          gsap.fromTo(
            templateRef.value,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 }
          );

          gsap.fromTo(
            boxref.value,
            { delay: 3, opacity: 0, duration: 1.5 },
            {
              opacity: 1,
              duration: 1.5,
              x: 50,
              y: -60,
              width: 240,
              height: 240,
              borderRadius: '0%',
              ease: 'power2.out',
              onUpdate: function () {
                if (boxref.value) {
                  const scale = this.progress() * 100;
                  boxref.value.style.clipPath = `circle(${scale}% at center)`;
                }
              },
            }
          );
        };

        console.log('✅ 動畫函式已掛到 wrapper：', wrapperEl);
      }

      if (newMode === 'edit' || newMode === 'thumbnail') {
        console.log('▶️ 立即播放編輯／縮圖動畫');
        gsap.fromTo(
          templateRef.value,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 }
        );
        gsap.fromTo(
          boxref.value,
          { delay: 3, opacity: 0, duration: 1.5 },
          {
            opacity: 1,
            duration: 1.5,
            x: 50,
            y: -60,
            width: 240,
            height: 240,
            borderRadius: '0%',
            ease: 'power2.out',
            onUpdate: function () {
              if (boxref.value) {
                const scale = this.progress() * 100;
                boxref.value.style.clipPath = `circle(${scale}% at center)`;
              }
            },
          }
        );
      }
    });
  },
  { immediate: true }
);
</script>
