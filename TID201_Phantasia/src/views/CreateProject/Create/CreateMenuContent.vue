<template>
  <div class="CreateMenuContent">
    <!-- <div class="bookInfoBox">
      <h1 class="title">Project Name 01010</h1>
      <h3 class="subTitle">Drafts</h3>
    </div> -->
    <div class="tabGroup">
      <Accordion
        v-for="accordionItem in accordionItems"
        :key="accordionItem"
        :title="accordionItem.title"
      >
        <component :is="accordionItem.content" />
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Accordion from "../../../components/BTN/Accordion.vue";
import AccordionModel from "../../../components/BTN/AccordionModel.vue";
import AccordionTemplate from "../../../components/BTN/AccordionTemplate.vue";
import AccordionText from "../../../components/BTN/AccordionText.vue";

const accordionItems = ref([
  { title: "Template", content: AccordionTemplate },
  { title: "Model", content: AccordionModel },
  { title: "Text", content: AccordionText },
]);
</script>
