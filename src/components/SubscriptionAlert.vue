<!-- SubscriptionAlert.vue -->
<template>
    <transition name="fade">
      <div v-if="show" class="alert-overlay" @click="handleOverlayClick">
        <div class="alert-container">
          <div class="alert-content">
            <div class="alert-header">
              <h3 class="alert-title">{{ title }}</h3>
            </div>
            <div class="alert-body">
              <p class="alert-message">{{ message }}</p>
            </div>
            <div class="alert-footer">
              <div class="btnKey-L light" @click="onClose">
                <p>OK</p>
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
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>
  
<script setup>
  defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Hint'
    },
    message: {
      type: String,
      default: 'Please select a subscription plan and payment method'
    }
  });
  
  const emit = defineEmits(['close']);
  
  const onClose = () => {
    emit('close');
  };
  
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('alert-overlay')) {
      emit('close');
    }
  };
</script>
  
<style scoped>
  .alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(21, 50, 67, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .alert-container {
    background-image: url("/src/Assets/img/membercenter/cancle.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 450px;  /* 縮小寬度 */
    height: 300px; /* 縮小高度 */
    position: relative;
    padding: 60px 80px; /* 調整內邊距 */
    animation: slideIn 0.3s ease-out;
  }
  
  .alert-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 100%;
  }
  
  .alert-header {
    background-color: transparent;
    margin-bottom: 10px; /* 減少間距 */
  }
  
  .alert-title {
    font-family: "Aleo", serif;
    font-weight: 700;
    font-size: 26px;
    color: #153243;

    text-align: center;
    line-height: 1.2;
  }
  
  .alert-body {
    flex: 1;
    overflow: hidden;
  }
  
  .alert-message {
    font-family: "Fanwood Text", serif;
    font-size: 20px;
    color: #153243;
    margin: 0;
    text-align: center;
    line-height: 1.4;
    max-width: 100%;
    word-wrap: break-word;
  }
  
  .alert-footer {
    margin-top: auto;
    padding-top: 15px; /* 減少間距 */
    display: flex;
    justify-content: center;
  }
  
  /* Animation */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .btnKey-L {
    cursor: pointer;
  }
</style>