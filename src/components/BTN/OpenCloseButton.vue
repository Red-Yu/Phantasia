<template>
    <div class="open-close-btn" v-if="type === 'plus'" :class="color">
        <span class="cols right" :class="color"></span>
        <span class="cols left" :class="color"></span>
        <span class="rows" :class="color"></span>
    </div>

    <div class="open-close-btn" v-else :class = "color">
        <span class="line top" :class="color"></span>
        <span class="line mid" :class="color"></span>
        <span class="line btm" :class="color"></span>
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ['plus', 'hamburger'].includes(value), // 限制只能傳入 'plus' 或 'hamburger'
    },
    color:{
        type: String,
        required: true,
        validator: (value) => ['dark', 'light'].includes(value), // 限制只能傳入 'dark' 或 'light'
    }
});
</script>