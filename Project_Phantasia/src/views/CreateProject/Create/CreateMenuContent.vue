<template>
  <!-- <div class="CreateMenuContent">
    <div class="tabGroup">
      <Accordion
        v-for="accordionItem in accordionItems"
        :key="accordionItem"
        :title="accordionItem.title"
      >
        <component :is="accordionItem.content" @updateStyle="updateTextStyle" />
      </Accordion>
    </div>
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import Accordion from "../../../components/BTN/Accordion.vue";
import AccordionTemplate from "../../../components/BTN/AccordionTemplate.vue";
import AccordionText from "../../../components/BTN/AccordionText.vue";

// const emit = defineEmits(["updateTextStyle"]);

// const accordionItems = ref([
//   { title: "Template", content: AccordionTemplate },
//   { title: "Text", content: AccordionText },
// ]);
</script>
