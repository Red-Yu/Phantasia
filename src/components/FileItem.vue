<template>
  <div :class="['file-item', mode]">
    <!-- 塊狀檢視 -->
    <div v-if="mode === 'grid'" class="grid-view">
      <div class="file-img">
        <img v-if="file.type.startsWith('image')" :src="file.url" />
        <div v-else class="file-icon">📄</div>
      </div>
      <div class="file-info">
        <h3 class="file-name">{{ file.name }}</h3>
        <li class="file-time">{{ file.time }}</li>
      </div>
    </div>

    <!-- 條列式檢視 -->
    <div v-else-if="mode === 'list'" class="list-view">
      <div class="file-img">
        <img v-if="file.type.startsWith('image')" :src="file.url" />
        <div v-else class="file-icon">📄</div>
      </div>
      <p class="file-name">{{ file.name }}</p>
      <p class="file-time">{{ file.time }}</p>
    </div>

    <!-- 作品集檢視 -->
    <div v-else="mode === 'draft'" class="draft-view">
      <div class="file-img">
        <img v-if="file.type.startsWith('image')" :src="file.url" />
        <div v-else class="file-icon">📄</div>
      </div>
      <p class="file-name">{{ file.name }}</p>
      <p class="file-time">{{ file.time }}</p>
      <a :href="file - link" class="more-button">
        <div class="btnLink dark">
          <div class="viewIcon"></div>
          <p>More</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      default: "grid", // 預設為塊狀檢視
      validator: (value) => ["grid", "list"].includes(value), // 只允許 'grid' 或 'list'
    },
  },
};
</script>
