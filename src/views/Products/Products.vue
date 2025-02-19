<style scoped>
@import "../../Assets/css/products.css";
</style>

<template>
  <div class="productsWrapper">
    <div class="sec">
      <div class="title">
        <h1>Reading is more than words</h1>
        <h3>An Interactive Journey of Exploration</h3>
      </div>
      <div class="x btnKey-L light">
        <p>ABOUT US</p>
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
    <!-- ============================================================== -->

    <div class="carousel-container">
      <div class="carousel">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel-item-container"
          :class="{
            active: index === activeIndex,
            left: index === prevIndex,
            right: index === nextIndex,
            hidden: ![prevIndex, activeIndex, nextIndex].includes(index),
          }"
        >
          <div class="text-box-container">
            <h2>{{ item.subtitle }}</h2>
            <!-- Subtitle -->
            <h1>{{ item.title }}</h1>
            <!-- Title -->
            <h3>{{ item.description }}</h3>
            <!-- Description -->
          </div>

          <!-- Carousel Item -->
          <div class="carousel-item">
            <img :src="item.image" alt="Item Image" class="item-image" />
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="prev" class="left-button">
          <img src="../../Assets/img/pics/circleBtn_L.png" alt="Left Button" />
        </button>
        <button @click="next" class="right-button">
          <img src="../../Assets/img/pics/circleBtn_R.png" alt="Right Button" />
        </button>
      </div>
    </div>

    <!-- ======================================================== -->
    <div class="pg_wrapper">
      <div class="pg_sortWrapper">
        <div class="pg_controlsBar">
          <button
            @mouseover="isHovered = true"
            @mouseleave="isHovered = false"
            v-for="(label, key) in sortOptions"
            :key="key"
            @click="sortProducts(key)"
            :class="['pg_controlButton ', { pg_active: currentSort === key }]"
          >
            {{ label }}

            <div class="icon-L">
              <div :class="isHovered ? 'orange-cross' : 'white-cross'">
                <div class="cols">
                  <span></span>
                  <span></span>
                </div>
                <div class="rows">
                  <span></span>
                </div>
              </div>
            </div>
          </button>
          <button
            @click="toggleDateSort"
            :class="[
              'pg_controlButton',
              {
                'pg_active-newest': currentSort === 'newest',
                'pg_active-oldest': currentSort === 'oldest',
              },
            ]"
          >
            {{ dateSortLabel }}
            <div class="icon-L">
              <div :class="isHovered ? 'orange-cross' : 'white-cross'">
                <div class="cols">
                  <span></span>
                  <span></span>
                </div>
                <div class="rows">
                  <span></span>
                </div>
              </div>
            </div>
          </button>

          <div class="pg_searchWrapper">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search"
              class="pg_searchInput"
            />
            <span class="pg_searchIconWrapper">
              <img
                src="../../Assets/img/pics/arcticons_xiaoyuan-search.png"
                alt="Search Icon"
                class="pg_searchIcon"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="pg_mainContainer">
        <div class="pg_itemsGrid">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="pg_itemCard"
          >
            <div class="container" @click="goToProductPage(product.id)">
              <div class="box-holder">
                <div
                  class="box box--front"
                  :style="{ backgroundImage: `url(${product.coverImage})` }"
                ></div>
                <div
                  class="box box--back"
                  :style="{ backgroundImage: `url(${product.backImage})` }"
                ></div>
                <div
                  class="box box--side-left"
                  :style="{
                    backgroundImage: `url(${product.sideLeftImage})`,
                  }"
                ></div>
                <div
                  class="box box--side-right"
                  :style="{
                    backgroundImage: `url(${product.sideRightImage})`,
                  }"
                ></div>
              </div>
            </div>
            <p class="pg_itemAuthor">{{ product.author }}</p>
            <h3 class="pg_itemTitle">{{ product.name }}</h3>
          </div>
        </div>

        <div class="pg_paginationBar">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="pg_pageButton"
          >
            <img
              src="../../Assets/img/pics/circleBtn_L.png"
              alt="Previous"
              class="pg_arrowIcon"
            />
          </button>
          <span class="pg_pageCount">{{ currentPage }}/{{ totalPages }}</span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="pg_pageButton"
          >
            <img
              src="../../Assets/img/pics/circleBtn_R.png"
              alt="Next"
              class="pg_arrowIcon"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import coverImage from "@/Assets/img/pics/cover.png";
import backImage from "@/Assets/img/pics/backCover.png";
import sideLeftImage from "@/Assets/img/pics/spine.png";
import sideRightImage from "@/Assets/img/pics/spine2.png";

const router = useRouter();
const isHovered = ref(false);

const goToProductPage = (productId) => {
  router.push(`/Products/${productId}`);
};

const items = ref([
  {
    name: "Item 1",
    title: "Charlie Chick Learns to Fly1", // Title
    subtitle: "Nick Denchfield", // Subtitle
    description:
      "Centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", // Description
    image: new URL("../../Assets/img/pics/Banner.png", import.meta.url).href,
  },
  {
    name: "Item 2",
    title: "Charlie Chick Learns to Fly2", // Title
    subtitle: "Nick Denchfield", // Subtitle
    description:
      "Centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", // Description
    image: new URL("../../Assets/img/pics/Banner.png", import.meta.url).href,
  },
  {
    name: "Item 3",
    title: "Charlie Chick Learns to Fly3", // Title
    subtitle: "Nick Denchfield", // Subtitle
    description:
      "Centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", // Description
    image: new URL("../../Assets/img/pics/Banner.png", import.meta.url).href,
  },
  {
    name: "Item 4",
    title: "Charlie Chick Learns to Fly4", // Title
    subtitle: "Nick Denchfield", // Subtitle
    description:
      "Centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", // Description
    image: new URL("../../Assets/img/pics/Banner.png", import.meta.url).href,
  },
  {
    name: "Item 5",
    title: "Charlie Chick Learns to Fly5", // Title
    subtitle: "Nick Denchfield", // Subtitle
    description:
      "Centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", // Description
    image: new URL("../../Assets/img/pics/Banner.png", import.meta.url).href,
  },
]);

const activeIndex = ref(1);

const prevIndex = computed(
  () => (activeIndex.value - 1 + items.value.length) % items.value.length
);
const nextIndex = computed(() => (activeIndex.value + 1) % items.value.length);

const prev = () => {
  activeIndex.value = prevIndex.value;
};

const next = () => {
  activeIndex.value = nextIndex.value;
};
// ==================================================================
const currentSort = ref("all");
const dateSortOrder = ref("newest");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 9;

const sortOptions = {
  all: "All",
  age1_6: "Age 1-6",
  age7_12: "Age 7-12",
  hot: "Hot",
};

const products = [
  {
    id: 1,
    name: "Wooden Blocks",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-01-15",
    ageGroup: "1-6",
  },
  {
    id: 2,
    name: "Science Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-01",
    ageGroup: "7-12",
  },
  {
    id: 3,
    name: "Meth Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-13",
    ageGroup: "1-6",
  },
  {
    id: 4,
    name: "Meat Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-22",
    ageGroup: "7-12",
  },
  {
    id: 5,
    name: "Leg Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-03-22",
    ageGroup: "1-6",
  },
  {
    id: 6,
    name: "Booden Wlocks",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-01-15",
    ageGroup: "1-6",
  },
  {
    id: 7,
    name: "Kcience Sit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-01",
    ageGroup: "7-12",
  },
  {
    id: 8,
    name: "Keth Mit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-13",
    ageGroup: "1-6",
  },
  {
    id: 9,
    name: "Leat Nit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-22",
    ageGroup: "7-12",
  },
  {
    id: 10,
    name: "Legssss JJt",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-03-22",
    ageGroup: "1-6",
  },
  {
    id: 11,
    name: "Dooden Locks",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-01-15",
    ageGroup: "1-6",
  },
  {
    id: 12,
    name: "Yience Uit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-01",
    ageGroup: "7-12",
  },
  {
    id: 13,
    name: "Metheeaad",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-13",
    ageGroup: "1-6",
  },
  {
    id: 14,
    name: "Seeeeeeetttyyyaa",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-22",
    ageGroup: "7-12",
  },
  {
    id: 15,
    name: "Peg Sit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-03-22",
    ageGroup: "1-6",
  },
];
const filteredProducts = computed(() => {
  let result = [...products];

  switch (currentSort.value) {
    case "newest":
      result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    case "oldest":
      result.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      break;
    case "age1_6":
      result = result.filter((p) => p.ageGroup === "1-6");
      break;
    case "age7_12":
      result = result.filter((p) => p.ageGroup === "7-12");
      break;
    case "hot":
      result.sort((a, b) => a.name.length - b.name.length);
      break;
  }

  if (searchQuery.value.trim() !== "") {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(query));
  }

  return result;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const dateSortLabel = computed(() => {
  return dateSortOrder.value === "newest"
    ? "Newest to Oldest"
    : "Oldest to Newest";
});

const toggleDateSort = () => {
  dateSortOrder.value = dateSortOrder.value === "newest" ? "oldest" : "newest";
  currentSort.value = dateSortOrder.value;
};

const sortProducts = (criteria) => {
  currentSort.value = criteria;
  currentPage.value = 1;
};

const purchase = (product) => {
  alert(`Purchasing ${product.name}`);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>
