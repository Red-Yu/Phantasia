<style scoped>
@import "../../Assets/css/products.css";
</style>

<template>
  <div ref="scrollContainer">
    <!-- Original Section (Full Scroll Effect Applies) -->
    <div ref="secSection" class="sec">
      <div class="title">
        <h1>Reading is more than words</h1>
        <h3>An interactive journey of exploration</h3>
      </div>
    </div>

    <!-- Original About Button Section -->
    <div ref="aboutButtonSection" class="aboutButton">
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
  </div>
  <!-- ============================================================== -->
  <div class="carousel-container">
    <div class="carousel">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="carousel-item-container"
        :class="{
          active: index === activeIndex,
          left: index === prevIndex,
          right: index === nextIndex,
          hidden: ![prevIndex, activeIndex, nextIndex].includes(index),
        }"
      >
        <!-- Carousel Item -->
        <div class="carousel-item">
          <div class="box box--front">
            <div class="colorLayer"></div>
            <div
              class="inner-layer"
              :style="{ backgroundImage: `url(${product.innerCoverImage})` }"
            ></div>
            <div
              class="outer-layer"
              :style="{ backgroundImage: `url(${product.coverImage})` }"
            ></div>
          </div>
        </div>

        <div class="text-box-container">
          <h2>{{ product.author }}</h2>
          <!-- Subtitle -->
          <h1>{{ product.name }}</h1>
          <!-- Title -->
          <h3>{{ product.description }}</h3>
          <!-- Description -->
        </div>
      </div>
    </div>
  </div>
  <div class="buttonPlacer">
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
          v-for="(label, key) in sortOptions"
          :key="key"
          @click="sortProducts(key)"
          :class="['pg_controlButton ', { pg_active: currentSort === key }]"
        >
          {{ label }}

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
        <div v-for="product in paginatedProducts" :key="product.id" class="pg_itemCard">
          <div class="container" @click="goToProductPage(product.id)">
            <div class="box-holder">
              <div class="box box--front">
                <div class="colorLayer"></div>
                <div
                  class="inner-layer"
                  :style="{
                    backgroundImage: `url(${product.innerCoverImage})`,
                  }"
                ></div>
                <div
                  class="outer-layer"
                  :style="{ backgroundImage: `url(${product.coverImage})` }"
                ></div>
              </div>
              <div class="box box--back">
                <div class="colorLayer"></div>
                <div
                  class="outer-layer"
                  :style="{ backgroundImage: `url(${product.backImage})` }"
                ></div>
              </div>
              <div class="box box--side-left">
                <div class="colorLayer"></div>
                <div
                  class="outer-layer"
                  :style="{
                    backgroundImage: `url(${product.sideLeftImage})`,
                  }"
                ></div>
              </div>
              <div
                class="box box--side-right"
                :style="{ backgroundImage: `url(${product.sideRightImage})` }"
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
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "vue-router";
import coverImage from "@/assets/img/pics/cover.png";
import backImage from "@/assets/img/pics/backCover.png";
import sideLeftImage from "@/assets/img/pics/spine.png";
import sideRightImage from "@/assets/img/pics/2paper.png";
import innerCoverImage from "@/assets/img/pics/bookImg_2.png";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const router = useRouter();

// --- Scroll Animation Logic ---
const secSection = ref(null);
const aboutButtonSection = ref(null);
const scrollContainer = ref(null);
// Animation state
let isAnimating = false;

// Debounce utility to limit calls to once every 300ms
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Scroll handler with animation control
const handleFullScroll = debounce((direction) => {
  if (isAnimating) return; // Prevent new animations while one is running
  isAnimating = true;

  const targetSection =
    direction === "down" ? aboutButtonSection.value : secSection.value;

  if (targetSection) {
    gsap.to(window, {
      scrollTo: {
        y: targetSection.getBoundingClientRect().top + window.scrollY,
        autoKill: true, // Allow user scrolling to interrupt
      },
      duration: 1,
      ease: "power2.inOut",
      overwrite: "auto", // Kill overlapping animations
      onComplete: () => {
        isAnimating = false; // Reset when animation completes
      },
    });
  }
}, 300); // 300ms debounce

// Setup ScrollTrigger on mount
onMounted(async () => {
  await nextTick(); // Ensure DOM is rendered

  if (!secSection.value || !aboutButtonSection.value) {
    console.error("Refs not found:", secSection.value, aboutButtonSection.value);
    return;
  }

  ScrollTrigger.create({
    trigger: secSection.value,
    start: "top top", // When top of secSection hits top of viewport
    end: "bottom top", // When bottom of secSection hits top of viewport
    onEnter: () => handleFullScroll("down"),
    onEnterBack: () => handleFullScroll("up"),
    once: false, // Allow repeated triggers
    // markers: true, // Uncomment for debugging trigger points
  });
});

// --- Product Listing Logic ---
// Navigation to product page
const goToProductPage = (productId) => {
  router.push(`/Products/${productId}`);
};

// Carousel-related variables (potentially unused in current setup)
const activeIndex = ref(1);

const prevIndex = computed(
  () => (activeIndex.value - 1 + products.length) % products.length
);
const nextIndex = computed(() => (activeIndex.value + 1) % products.length);

const prev = () => {
  activeIndex.value = prevIndex.value;
};

const next = () => {
  activeIndex.value = nextIndex.value;
};

// Product listing variables
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
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-01-15",
    ageGroup: "1-6",
    description:
      "1A wonderful wooden block set that enh1A wonderful wooden block set that enh1A wonderful wooden block set that enh1A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 2,
    name: "Science Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-01",
    ageGroup: "7-12",
    description:
      "2A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 3,
    name: "Meth Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-13",
    ageGroup: "1-6",
    description:
      "3A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 4,
    name: "Meat Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-22",
    ageGroup: "7-12",
    description:
      "4A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 5,
    name: "Leg Kit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-03-22",
    ageGroup: "1-6",
    description:
      "5A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 6,
    name: "Booden Wlocks",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-01-15",
    ageGroup: "1-6",
    description:
      "6A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 7,
    name: "Kcience Sit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-01",
    ageGroup: "7-12",
    description:
      "7A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 8,
    name: "Keth Mit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-13",
    ageGroup: "1-6",
    description:
      "8A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 9,
    name: "Leat Nit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-22",
    ageGroup: "7-12",
    description:
      "9A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 10,
    name: "Legssss JJt",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-03-22",
    ageGroup: "1-6",
    description:
      "A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 11,
    name: "Dooden Locks",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-01-15",
    ageGroup: "1-6",
    description:
      "A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 12,
    name: "Yience Uit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-01",
    ageGroup: "7-12",
    description:
      "A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 13,
    name: "Metheeaad",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-13",
    ageGroup: "1-6",
    description:
      "A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 14,
    name: "Seeeeeeetttyyyaa",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-02-22",
    ageGroup: "7-12",
    description:
      "A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
  {
    id: 15,
    name: "Peg Sit",
    author: "Nick Denchfield",
    coverImage: coverImage,
    innerCoverImage: innerCoverImage,
    backImage: backImage,
    sideLeftImage: sideLeftImage,
    sideRightImage: sideRightImage,
    dateAdded: "2024-03-22",
    ageGroup: "1-6",
    description:
      "A wonderful wooden block set that enhances creativity and motor skills for young children.",
  },
];

// Computed properties for product filtering and pagination
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
  return dateSortOrder.value === "newest" ? "Newest to Oldest" : "Oldest to Newest";
});

// Methods for product interactions
const toggleDateSort = () => {
  dateSortOrder.value = dateSortOrder.value === "newest" ? "oldest" : "newest";
  currentSort.value = dateSortOrder.value;
};

const sortProducts = (criteria) => {
  if (criteria !== "newest" && criteria !== "oldest") {
    dateSortOrder.value = "newest"; // Reset dateSortOrder when a non-date sort is selected
  }
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
