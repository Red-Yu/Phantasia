<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="bgc"></div>
      <div class="btn-close" @click="closeModal">
        <OpenCloseButton type="plus" color="dark" />
      </div>
      <!-- mainContent -->
      <div class="mainContent">
        <div class="AddCover">
          <div class="coverView">
            <div class="side frontSide" :style="{ backgroundColor: color }">
              <div v-if="parentImageUrl" class="parent-preview">
                <img class="customImg" :src="parentImageUrl" alt="Uploaded in Parent" />
              </div>
              <img class="coverImg" src="../../../Assets/img/book/封面.png" alt="" />
            </div>
            <div class="side backSide" :style="{ backgroundColor: color }">
              <img class="coverImg" src="../../../Assets/img/book/封底.png" alt="" />
            </div>
          </div>
          <div class="coverSetting">
            <div class="FrontCover">
              <div class="titleGroup">
                <p>Front Cover</p>
                <h2>Upload Your Files</h2>
                <div class="subtitle">
                  <span>File should be</span>
                  <span class="spanBold">JPG , PNG , PDF</span>
                </div>
              </div>
              <div class="inputFileGroup">
                <img src="../../../Assets/img/icon/dark-upload.png" />
                <div class="subtitle">
                  <span>Max. file size</span>
                  <span class="spanBold">5MB</span>
                </div>
                <InputImg @update:image="parentImageUrl = $event" />
              </div>
            </div>
            <div class="backCover">
              <div class="titleGroup">
                <p>Back Cover</p>
                <h2>Setting The colors</h2>
              </div>
              <ColorPicker
                is-widget
                picker-type="chrome"
                disable-alpha
                disableHistory
                v-model:pureColor="color"
                @change="updateColor"
              />
            </div>
            <router-link
              class="FinishBtn"
              to="/Create/CreateInfo/CreateInforMation"
              @click="closeModal"
            >
              <div class="btnKey-M light">
                <p>SAVE</p>
                <div class="icon-L">
                  <div class="white-cross">
                    <div class="cols">
                      <span></span>
                      <span></span>
                    </div>
                    <div class="rows">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import OpenCloseButton from "../../../components/BTN/OpenCloseButton.vue";
import InputImg from "../../../components/Input/InputImg.vue";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
//-----------------------------
// fullscreen
//-----------------------------
// 定義 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

// 定義 emit 事件
const emit = defineEmits(["close"]);

// 關閉彈窗的方法
const closeModal = () => {
  emit("close");
};

//-----------------------------
// 封面上傳父層顯示
//-----------------------------
const parentImageUrl = ref(null);
//-----------------------------
// backCover
//-----------------------------
// 定义颜色变量
const color = ref("#EEAD50"); // 默认颜色

// 更新颜色的方法
const updateColor = (newColor) => {
  color.value = newColor;
};
</script>
