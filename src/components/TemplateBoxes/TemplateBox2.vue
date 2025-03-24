<!-- SimpleModule.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  mode: {
    type: String,
    default: 'edit', // 'edit' | 'thumbnail' | 'preview'
  },
});

const boxRef = ref(null);

onMounted(() => {
  if (props.mode == 'edit' || props.mode == 'thumbnail') {
    console.log('目前在edit');
    gsap.fromTo(
      boxRef.value,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1 }
    );
  }

  if (props.mode == 'preview') {
    console.log('目前在preview');
    
    ScrollTrigger.create({
      trigger: boxRef.value,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          boxRef.value,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      },
      once: true,
    });
  }
});

</script>

<template>
  <div
    ref="boxRef"
    class="box"
  >
   <input type="text">
  </div>
</template>

<style scoped>
.box{
  width:680px;
  height: 380px;
  background-color: #000;
  color: aliceblue;
}
</style>