<style scoped>
@import "../../Assets/css/products.css";
</style>

<template>
  <SnowflakeEffect />
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
      <div class="x btnKey-L light" @click="navigate('/about')">
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

  <div class="header-wrapper" ref="headerWrapper">
    <Header type="night" />
  </div>
  <div class="blankSpace"></div>
  <!-- Carousel Section -->
  <div class="carousel-container">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="carousel-item-container"
      :class="{
        active: index === activeIndex,
        leftC: index === prevIndex,
        rightC: index === nextIndex,
        hidden: ![prevIndex, activeIndex, nextIndex].includes(index),
      }"
    >
      <div class="carousel-content-wrapper">
        <div
          class="carousel-item"
          :class="{ clickable: index === activeIndex }"
          @click="index === activeIndex ? goToProductPage(product.id) : null"
        >
          <div class="box box--front">
            <div class="colorLayer" :style="{ backgroundColor: product.colorCode }"></div>
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
          <h1>{{ product.name }}</h1>
          <h3>{{ product.description }}</h3>
        </div>
      </div>
    </div>
  </div>

  <!-- end of carousel -->
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
  <!-- Product Grid Section -->
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
          <div class="icon-M">
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
                <div
                  class="colorLayer"
                  :style="{ backgroundColor: product.colorCode || 'orange' }"
                ></div>
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
                <div
                  class="colorLayer"
                  :style="{ backgroundColor: product.colorCode || 'orange' }"
                ></div>
                <div
                  class="outer-layer"
                  :style="{ backgroundImage: `url(${product.backImage})` }"
                ></div>
              </div>
              <div class="box box--side-left">
                <div
                  class="colorLayer"
                  :style="{ backgroundColor: product.colorCode || 'orange' }"
                ></div>
                <div
                  class="outer-layer"
                  :style="{ backgroundImage: `url(${product.sideLeftImage})` }"
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
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import Header from "@/components/Header.vue";
import SnowflakeEffect from "@/components/SnowflakeEffect.vue";

// Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const router = useRouter();
function navigate(link) {
  if (link.startsWith("http")) {
    window.location.href = link; // External link
  } else {
    router.push(link); // Internal route
  }
}

// Scroll Animation Logic
const secSection = ref(null);
const aboutButtonSection = ref(null);
const scrollContainer = ref(null);
const headerWrapper = ref(null); // Ref for header wrapper visibility control

let isAnimating = false;

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleFullScroll = debounce((direction) => {
  if (isAnimating) return;
  isAnimating = true;

  const targetSection =
    direction === "down" ? aboutButtonSection.value : secSection.value;

  if (targetSection) {
    gsap.to(window, {
      scrollTo: {
        y: targetSection.getBoundingClientRect().top + window.scrollY,
        autoKill: true,
      },
      duration: 1,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        isAnimating = false;
      },
    });
  }
}, 300);

// Product Logic
const products = ref([]);

// Fetch Firestore and Storage Data
const fetchFirestoreData = async () => {
  try {
    const fetchedProducts = [];

    // Step 1: Fetch all books from "books" collection
    const booksCollectionRef = collection(db, "books");
    const querySnapshot = await getDocs(booksCollectionRef);

    if (querySnapshot.empty) {
      console.warn("No documents found in 'books' collection");
      products.value = []; // Empty array if no data
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Doc Data:", data); // Check raw Firestore data
      fetchedProducts.push({
        id: doc.id, // Firebase-generated ID
        name: data.title,
        author: data.author,
        colorCode: data.colorCode,
        innerCoverImage: data.imagePath, // Map imagePath to innerCoverImage
        dateAdded: data.dateAdded,
        ageGroup: data.ageGroup,
        description: data.description,
        userId: data.userId, // Optional, if needed
      });
    });

    // Step 2: Fetch all comments to calculate total ratings
    const commentsCollectionRef = collection(db, "comments");
    const commentsSnapshot = await getDocs(commentsCollectionRef);
    const ratingMap = {};

    commentsSnapshot.forEach((doc) => {
      const comment = doc.data();
      const bookId = comment.bookId;
      const rating = comment.rating;

      if (!ratingMap[bookId]) {
        ratingMap[bookId] = 0;
      }
      ratingMap[bookId] += rating;
    });

    // Step 3: Add totalRating to each product
    fetchedProducts.forEach((product) => {
      product.totalRating = ratingMap[product.id] || 0;
    });

    // Step 4: Fetch fixed image URLs from Storage
    const fixedImages = {
      coverImage: await getDownloadURL(
        storageRef(storage, "images/common/cover.png")
      ).catch((error) => {
        console.error("Error fetching cover.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      }),
      backImage: await getDownloadURL(
        storageRef(storage, "images/common/backCover.png")
      ).catch((error) => {
        console.error("Error fetching backCover.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      }),
      sideLeftImage: await getDownloadURL(
        storageRef(storage, "images/common/spine.png")
      ).catch((error) => {
        console.error("Error fetching spine.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      }),
      sideRightImage: await getDownloadURL(
        storageRef(storage, "images/common/2paper.png")
      ).catch((error) => {
        console.error("Error fetching 2paper.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      }),
    };

    // Step 5: Combine fetched products with fixed images and totalRating
    products.value = fetchedProducts.map((product) => ({
      ...product,
      ...fixedImages,
    }));

    console.log("Fetched products from Firestore:", products.value);
  } catch (error) {
    console.error("Error in fetchFirestoreData:", error);
    products.value = []; // Empty array on error
  }
};

// Mount Hook
onMounted(async () => {
  await fetchFirestoreData();
  console.log("Products after fetch:", products.value); // Debug here
  await nextTick();

  if (!secSection.value || !aboutButtonSection.value || !headerWrapper.value) {
    console.error("Refs not found:", {
      secSection: secSection.value,
      aboutButtonSection: aboutButtonSection.value,
      headerWrapper: headerWrapper.value,
    });
    return;
  }

  ScrollTrigger.create({
    trigger: secSection.value,
    start: "top top",
    end: "bottom top",
    onEnter: () => handleFullScroll("down"),
    onEnterBack: () => handleFullScroll("up"),
    once: false,
  });

  // Header Visibility Control
  ScrollTrigger.create({
    trigger: secSection.value,
    start: "bottom top", // When bottom of secSection hits top of viewport (scrolling down)
    end: "top bottom", // When top of secSection hits bottom of viewport (scrolling up)
    onEnter: () => {
      console.log("onEnter triggered - showing header");
      if (headerWrapper.value) {
        headerWrapper.value.classList.add("visible"); // Show header when scrolling past secSection
      } else {
        console.error("headerWrapper is null in onEnter");
      }
    },
    onEnterBack: () => {
      console.log("onEnterBack triggered - hiding header");
      if (headerWrapper.value) {
        headerWrapper.value.classList.remove("visible"); // Hide header when scrolling back into secSection
      } else {
        console.error("headerWrapper is null in onEnterBack");
      }
    },
  });
});

// Carousel Logic
const activeIndex = ref(1); // Start at 1 as per the new carousel code
const prevIndex = computed(() =>
  products.value.length
    ? (activeIndex.value - 1 + products.value.length) % products.value.length
    : 0
);
const nextIndex = computed(() =>
  products.value.length ? (activeIndex.value + 1) % products.value.length : 0
);

const prev = () => {
  if (products.value.length) activeIndex.value = prevIndex.value;
};

const next = () => {
  if (products.value.length) activeIndex.value = nextIndex.value;
};

// Product Listing Variables
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

const filteredProducts = computed(() => {
  let result = [...products.value];

  switch (currentSort.value) {
    case "newest":
      result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    case "oldest":
      result.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      break;
    case "age1_6":
      result = result.filter((p) => p.ageGroup === "1-6" || p.ageGroup === "1~6");
      break;
    case "age7_12":
      result = result.filter((p) => p.ageGroup === "7-12");
      break;
    case "hot":
      result.sort((a, b) => {
        if (b.totalRating !== a.totalRating) {
          return b.totalRating - a.totalRating; // Sort by totalRating descending
        }
        return new Date(b.dateAdded) - new Date(a.dateAdded); // Then by dateAdded descending
      });
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
  return Math.ceil(filteredProducts.value.length / itemsPerPage) || 1;
});

const dateSortLabel = computed(() => {
  return dateSortOrder.value === "newest" ? "Newest to Oldest" : "Oldest to Newest";
});

// Methods
const toggleDateSort = () => {
  dateSortOrder.value = dateSortOrder.value === "newest" ? "oldest" : "newest";
  currentSort.value = dateSortOrder.value;
};

const sortProducts = (criteria) => {
  if (criteria !== "newest" && criteria !== "oldest") {
    dateSortOrder.value = "newest";
  }
  currentSort.value = criteria;
  currentPage.value = 1;
};

const goToProductPage = (productId) => {
  router.push(`/Products/${productId}`);
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
