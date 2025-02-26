<!-- AnimatedTitle.vue -->
<template>
  <div class="content-center">
    <p class="title">{{ firstTitle }}</p>
    <p class="subtitle">——— {{ middleText }} ———</p>
    <p class="title">{{ secondTitle }}</p>
  </div>
</template>

<script>
export default {
  name: "AnimatedTitle",
  props: {
    firstTitle: {
      type: String,
      default: "Current",
    },
    middleText: {
      type: String,
      default: "your",
    },
    secondTitle: {
      type: String,
      default: "Subscription",
    },
  },
};
</script>

<style scoped>
.content-center {
  font-variant: small-caps;
  text-align: center;
  color: #153243;
  margin-bottom: 50px;
}

.content-center .title {
  font-family: "Fanwood Text", serif;
  font-size: 100px;
  margin: 0;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

.content-center .subtitle {
  font-family: "Fanwood Text", serif;
  font-size: 50px;
  margin: 0;
  opacity: 0;
  animation: simpleFade 0.5s ease forwards 0.3s;
}

.content-center .title:first-child {
  animation-delay: 0s;
}

.content-center .title:last-child {
  animation-delay: 0.6s;
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

@keyframes simpleFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
