<template>
  <div class="TextInput">
    <textarea
      :maxlength="maxLength"
      :rows="rows"
      v-model="inputValue"
      @input="handleInput"
    />

    <div class="char-counter">
      <span class="currentChars">{{ currentChars }}</span>
      <span> / </span>
      <span class="remainingChars">{{ remainingChars }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  computed: {
    // 計算已輸入字數
    currentChars() {
      return this.inputValue.length;
    },
    // 計算剩餘字數
    remainingChars() {
      return this.maxLength - this.inputValue.length;
    },
  },
  watch: {
    // 監聽 modelValue 的變化，同步到 inputValue
    modelValue(newValue) {
      this.inputValue = newValue;
    },
  },
  methods: {
    // 處理輸入事件
    handleInput(event) {
      this.inputValue = event.target.value;
      this.$emit("update:modelValue", this.inputValue); // 更新父組件的 v-model
    },
  },
};
</script>
