<template>
  <div class="titleGroup">
    <p class="top">{{ firstTitle }}</p>
    <p class="mid">——— {{ middleText }} ———</p>
    <p class="btm">{{ secondTitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    firstTitle: {
      type: String,
    },
    middleText: {
      type: String,
    },
    secondTitle: {
      type: String,
    },
  },
};
</script>

<style scoped>
.titleGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
p {
  font-family: "Fanwood Text";
  font-variant: small-caps;
  letter-spacing: 0.8px;
  color: #153243;
  font-weight: 600;
  line-height: 1;
}
.top {
  font-size: 14vh;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0s;
}
.mid {
  font-size: 8vh;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0.6s;
}
.btm {
  font-size: 14vh;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
