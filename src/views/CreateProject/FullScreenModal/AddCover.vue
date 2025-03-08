<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="bgc"></div>
      <button class="btm-close" @click="closeModal">關閉彈窗</button>
      <!-- mainContent -->
      <div class="mainContent AddCover">
        <div class="coverView">
          <div class="side"></div>
          <div class="side"></div>
        </div>
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
            <div class="inputFile">
              <div class="btnKey-M light-border">
                <p>Select File</p>
                <div class="icon-M">
                  <div class="light-cross">
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
            </div>
          </div>
        </div>
        <div class="backCover">
          <div class="titleGroup">
            <p>Back Cover</p>
            <h2>Setting The colors</h2>
          </div>
          <div class="inputColorGroup">
            <input type="color" />
            <img src="" alt="" />
          </div>
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
</template>

<script setup>
import router from "../../../router";

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
</script>
