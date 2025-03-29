<style scoped>
@import "../../Assets/css/main.css";

.faq-item {
  margin-bottom: 60px;
  color: #153243;
}

.faq-question {
  font-family: "Fanwood Text";
  font-variant: small-caps;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #153243;
  padding-bottom: 8px;
  position: relative;
  cursor: pointer;
}

.faq-question:hover .dark-cross .cols {
  display: flex;
  transform: translateX(4%);
}

.faq-question:hover .dark-cross .cols span:nth-child(2) {
  display: none;
}

.faq-answer {
  font-family: "Fanwood Text";
  font-size: 28px;
  line-height: 1.6;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s ease-out;
}

.faq-answer.show {
  max-height: 300px;
  opacity: 1;
  margin-top: 8px;
}

.roman-numeral {
  min-width: 30px;
}

.i {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<template>
  <!-- 測試 -->
  <!-- 右側內容區 -->
  <!-- 大標題 -->
  <AnimatedTitle
    firstTitle="Frequently"
    middleText="asked"
    secondTitle="Questions"
  />
  <!-- 問答區 -->
  <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
    <div class="faq-question" @click="toggleFaq(index)">
      <span class="roman-numeral">{{ toRoman(index + 1) }}.</span>
      <span>{{ faq.question }}</span>

      <div class="i">
        <div class="dark-cross" :class="{ expanded: faq.isOpen }">
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
    <div class="faq-answer" :class="{ show: faq.isOpen }">
      <p>{{ faq.answer }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AnimatedTitle from "@/components/MemberCenterAnimatedTitle.vue";

const faqs = ref([
  {
    question: "How do I subscribe to the e-book service?",
    answer:
      "You can register for an account on our website and select your preferred subscription plan (annual, quarterly, or monthly).",
    isOpen: false,
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time, but there will be no refund for the remaining subscription period. Your membership benefits will cease at the end of the current subscription cycle.",
    isOpen: false,
  },
  {
    question: "Can I change my subscription plan?",
    answer:
      "Absolutely, you can upgrade or downgrade your subscription plan at any time. The change will take effect at the start of the next subscription cycle.",
    isOpen: false,
  },
  {
    question: "How do I update my payment method?",
    answer:
      "You can log into your account and update your payment method on the subscription management page.",
    isOpen: false,
  },
  {
    question: "What is included in the subscription fee?",
    answer:
      "The subscription fee includes unlimited access to all our e-books, monthly curated book lists, priority notification of new releases.",
    isOpen: false,
  },
  {
    question: "Can I use the subscription service on multiple devices?",
    answer:
      "Yes, you can log in and use your subscription service on multiple devices at no extra cost.",
    isOpen: false,
  },
  {
    question: "Are new books added during my subscription included?",
    answer:
      "Yes, all books added during your subscription period are included, and you can read them at any time.",
    isOpen: false,
  },
  {
    question: "How can I know when my subscription expires?",
    answer:
      "You can log into your account and check your subscription status, including the expiration date.",
    isOpen: false,
  },
]);

const toRoman = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  for (const [letter, value] of romanNumerals) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result;
};

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>
