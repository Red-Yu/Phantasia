<script setup>
import { ref, watch } from "vue";
import { eventBus } from "@/utils/eventBus"; // 引入 mitt 事件總線
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

// 追蹤當前選中的輸入框 ID
const activeTextInputId = ref(null);

const fontFamily = ref("Arial");
const fontSize = ref("26");
const fontWidth = ref("400");
const textAlign = ref("left");
const alignItems = ref("end");
const fontColor = ref("#000000"); // 預設顏色為黑色

// 監聽來自 CreateTextInput 的選中事件
eventBus.on("setActiveTextInput", (id) => {
  activeTextInputId.value = id;
});

// 當用戶變更字體樣式時，發送事件 **只發送給當前選中的輸入框**
const updateTextStyle = () => {
  if (activeTextInputId.value) {
    eventBus.emit(`updateTextStyle-${activeTextInputId.value}`, {
      fontFamily: fontFamily.value,
      fontSize: fontSize.value + "px",
      fontWeight: fontWidth.value,
      textAlign: textAlign.value,
      alignItems: alignItems.value,
      color: fontColor.value,
    });
  }
};

watch(fontColor, updateTextStyle);
</script>

<template>
  <div class="AccordionText">
    <div class="TextStyle">
      <div class="inputBox Typography">
        <select v-model="fontFamily" @change="updateTextStyle" class="OtherInput">
          <option value="placeholder" class="placeholder">Typography</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Tahoma">Tahoma</option>
          <option value="fantasy">fantasy</option>
          <option value="system-ui">system-ui</option>
          <option value="Aleo">Aleo</option>
          <option value="Fanwood Text">Fanwood Text</option>
          
        </select>
        <div class="selectIcon">
          <div class="cross">
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
      <div class="secondRow">
        <div class="inputBox fontSize">
          <select v-model="fontSize" @change="updateTextStyle" class="OtherInput">
            <option value="18">18</option>
            <option value="20">22</option>
            <option value="22">26</option>
            <option value="24">30</option>
            <option value="26">34</option>
            <option value="28">38</option>
            <option value="30">42</option>
            <option value="32">46</option>
          </select>
          <div class="selectIcon">
            <div class="cross">
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
        <div class="inputBox fontWidth">
          <select v-model="fontWidth" @change="updateTextStyle" class="OtherInput">
            <option value="100">Thin</option>
            <option value="300">Regular</option>
            <option value="400">Medium</option>
            <option value="600">Bold</option>
            <option value="800">Block</option>
          </select>
          <div class="selectIcon">
            <div class="cross">
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
      <div class="thirdRow">
        <button
          @click="
            textAlign = 'center';
            updateTextStyle();
          "
          class="format text-align-center"
        >
          <img src="../../Assets/img/icon/text-align-center.png" alt="" />
        </button>
        <button
          @click="
            textAlign = 'end';
            updateTextStyle();
          "
          class="format text-align-end"
        >
          <img src="../../Assets/img/icon/text-align-end.png" alt="" />
        </button>
        <button
          @click="
            textAlign = 'start';
            updateTextStyle();
          "
          class="format text-align-start"
        >
          <img src="../../Assets/img/icon/text-align-start.png" alt="" />
        </button>
        <button
          @click="
            textAlign = 'justify';
            updateTextStyle();
          "
          class="format text-align-justify"
        >
          <img src="../../Assets/img/icon/text-align-justify.png" alt="" />
        </button>
      </div>
      <div class="fourRow">
        <ColorPicker
          is-widget
          picker-type="chrome"
          disable-alpha
          disableHistory
          v-model:pureColor="fontColor"
        />
      </div>
    </div>
  </div>
</template>
