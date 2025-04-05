<style scoped>
@import "../../Assets/css/products.css";
</style>

<template>
  <SnowflakeEffect />
  <Header type="night" />
  <div class="wrapper3">
    <div class="page-container3">
      <section class="content-section3">
        <div class="content-left3">
          <div class="product-box-container">
            <div class="product-box-holder" ref="bookHolder">
              <div class="product-box--front">
                <div
                  class="pb-color-layer"
                  :style="{ backgroundColor: product.colorCode }"
                ></div>
                <div
                  class="pb-inner-layer"
                  :style="{
                    backgroundImage: `url(${product.innerCoverImage})`,
                  }"
                ></div>
                <div
                  class="pb-outer-layer"
                  :style="{ backgroundImage: `url(${product.coverImage})` }"
                ></div>
              </div>
              <div class="product-box--back">
                <div
                  class="pb-color-layer"
                  :style="{ backgroundColor: product.colorCode }"
                ></div>
                <div
                  class="pb-outer-layer"
                  :style="{ backgroundImage: `url(${product.backImage})` }"
                ></div>
              </div>
              <div class="product-box--side-left">
                <div
                  class="pb-color-layer"
                  :style="{ backgroundColor: product.colorCode }"
                ></div>
                <div
                  class="pb-outer-layer"
                  :style="{ backgroundImage: `url(${product.sideLeftImage})` }"
                ></div>
              </div>
              <div
                class="product-box--side-right"
                :style="{ backgroundImage: `url(${product.sideRightImage})` }"
              ></div>
              <div class="product-box--top"></div>
              <div class="product-box--bottom"></div>
            </div>
          </div>
        </div>
        <div class="content-right3">
          <h1 class="product-title">{{ product.title }}</h1>
          <h2 class="product-subtitle ">{{ product.subtitle }}</h2>
          <div class="info-group3">
            <span class="info-icon3">
              <img src="../../Assets/img/icon/feather.png"  style="width: 25px;height:auto;">
            </span>
            <span class="info-heading3">Brief Introduction</span>
          </div>
          <hr class="info-divider3" />
          <p class="info-description">{{ product.description }}</p>
          <div class="info-group3">
            <span class="info-icon3">
              <img src="../../Assets/img/icon/feather.png"  style="width: 25px;height:auto;">
            </span>
            <span class="info-heading3">Information</span>
          </div>
          <hr class="info-divider3" />
          <p class="info-description">
            Author : {{ product.author }}<br />
            Date Added : {{ product.dateAdded }}<br />
          </p>
          <div class="readButtons">
            <section class="readButtonL">
              <div class="btnKey-L light" @click="goToProductReadPage">
                <p>READ NOW</p>
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
            </section>
            <section class="readButtonR">
              <div class="btnKey-L light" @click="addToShelf">
                <p>ADD TO SHELF</p>
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
            </section>
          </div>
        </div>
      </section>
      <div class="commentTitle">Comments</div>
      <section class="feedback-section3">
        <div class="feedback-box3">
          <div ref="feedbackList" class="feedback-list3">
            <div
              v-for="(comment, index) in sortedComments"
              :key="comment.id"
              class="feedback-entry3"
            >
              <div class="feedback-content3">
                <img
                  :src="comment.userAvatar"
                  alt="User Avatar"
                  class="feedback-icon3 feedback-icon37"
                  @error="handleImageError"
                />
                <div class="feedback-details3">
                  <div class="feedback-stars3">
                    <span
                      v-for="n in 5"
                      :key="n"
                      :class="{ filled: n <= comment.rating }"
                      >★</span
                    >
                  </div>
                  <p>{{ comment.text }}</p>
                  <p>
                    {{ comment.userName }} -
                    {{ comment.timestamp.toLocaleDateString() }}
                  </p>
                </div>
              </div>
              <hr class="feedback-divider3" />
            </div>
          </div>
          <div class="scroll-indicator">
            <span
              v-for="(dot, index) in 10"
              :key="index"
              class="scroll-dot"
              :class="{ active: index === activeDot }"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig"; // Adjust path to your Firebase config
import Header from "@/components/Header.vue";
import SnowflakeEffect from "@/components/SnowflakeEffect.vue";

// Router and Route setup
const router = useRouter();
const route = useRoute();
const bookId = route.params.id; // e.g., "abc123xyz"

// Reactive product and comments data
const product = ref({});
const comments = ref([]); // Initialize as empty array instead of hardcoded comments

const handleImageError = (event) => {
  event.target.src = new URL(
    "../../Assets/Day/myColset/avatarDefault.png",
    import.meta.url
  ); // Fallback image path
};

// Computed property to sort comments by timestamp in descending order
const sortedComments = computed(() => {
  return [...comments.value].sort((a, b) => b.timestamp - a.timestamp);
});

// Fetch book data and comments on mount
onMounted(async () => {
  try {
    // Fetch book data from Firestore
    const bookRef = doc(db, "books", bookId);
    const bookSnap = await getDoc(bookRef);

    if (bookSnap.exists()) {
      const bookData = { id: bookSnap.id, ...bookSnap.data() };
      product.value = bookData;
      product.value.innerCoverImage = bookData.imagePath;

      // Fetch fixed image URLs from Firebase Storage with individual error handling
      product.value.coverImage = await getDownloadURL(
        storageRef(storage, "images/common/cover.png")
      ).catch((error) => {
        console.error("Error fetching cover.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      });
      product.value.backImage = await getDownloadURL(
        storageRef(storage, "images/common/backCover.png")
      ).catch((error) => {
        console.error("Error fetching backCover.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      });
      product.value.sideLeftImage = await getDownloadURL(
        storageRef(storage, "images/common/spine.png")
      ).catch((error) => {
        console.error("Error fetching spine.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      });
      product.value.sideRightImage = await getDownloadURL(
        storageRef(storage, "images/common/2paper.png")
      ).catch((error) => {
        console.error("Error fetching 2paper.png:", error);
        return "https://via.placeholder.com/150"; // Fallback placeholder
      });
    } else {
      console.error("No such book found!");
    }

    // Fetch comments from Firestore
    const commentsQuery = query(
      collection(db, "comments"),
      where("bookId", "==", bookId)
    );
    const commentsSnapshot = await getDocs(commentsQuery);
    comments.value = commentsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        rating: data.rating,
        userId: data.userId,
        timestamp: new Date(data.timestamp), // Convert timestamp string to Date object
      };
    });

    // Get unique userIds (emails) from comments
    const userIds = [
      ...new Set(comments.value.map((comment) => comment.userId)),
    ];

    if (userIds.length > 0) {
      // Fetch user data from the 'users' collection
      const usersQuery = query(
        collection(db, "users"),
        where("__name__", "in", userIds)
      );
      const usersSnapshot = await getDocs(usersQuery);

      // Create a map of userId to user data
      const userMap = {};
      usersSnapshot.forEach((doc) => {
        userMap[doc.id] = {
          name: doc.data().name || "Unknown",
          avatarURL:
            doc.data().avatarURL ||
            new URL(
              "../../Assets/Day/myColset/avatarDefault.png",
              import.meta.url
            ),
        };
      });

      // Attach userName and userAvatar to each comment
      comments.value.forEach((comment) => {
        const user = userMap[comment.userId] || {
          name: "Unknown",
          avatarURL: new URL(
            "../../Assets/Day/myColset/avatarDefault.png",
            import.meta.url
          ),
        };
        comment.userName = user.name;
        comment.userAvatar = user.avatarURL;
      });
    }
  } catch (error) {
    console.error("Error fetching comments or user data:", error);
  }
  // Event listeners for feedback and book dragging
  if (feedbackList.value) {
    feedbackList.value.addEventListener("scroll", updateActiveDot);
  }
  if (bookHolder.value) {
    bookHolder.value.addEventListener("mousedown", bookStartDragging);
    document.addEventListener("mousemove", bookDrag);
    document.addEventListener("mouseup", bookStopDragging);
    bookHolder.value.addEventListener("touchstart", bookTouchStart);
    document.addEventListener("touchmove", bookTouchMove);
    document.addEventListener("touchend", bookTouchEnd);
  }
});

// Navigation function
const goToProductReadPage = () => {
  if (product.value.id) {
    router.push(`/Products/${product.value.id}/read`);
  }
};

// Placeholder for adding to shelf
const addToShelf = () => {
  router.push({ name: "MyBookcase" });
};

// Feedback list scroll logic
const activeDot = ref(0);
const feedbackList = ref(null);

const updateActiveDot = () => {
  if (!feedbackList.value) return;
  const list = feedbackList.value;
  const scrollPercentage =
    list.scrollTop / (list.scrollHeight - list.clientHeight);
  activeDot.value = Math.floor(scrollPercentage * 10); // Maps to 0-9 for 10 comments
};

// 3D book dragging logic
const bookHolder = ref(null);
const bookIsDragging = ref(false);
const bookPreviousX = ref(0);
const bookPreviousY = ref(0);
const bookRotateY = ref(0);
const bookRotateX = ref(16);

const bookStartDragging = (e) => {
  bookIsDragging.value = true;
  bookPreviousX.value = e.clientX;
  bookPreviousY.value = e.clientY;
  bookHolder.value.style.cursor = "grabbing";
  bookHolder.value.style.animation = "none"; // 停止動畫
  e.preventDefault();
};

const bookDrag = (e) => {
  if (!bookIsDragging.value) return;
  const bookCurrentX = e.clientX;
  const bookCurrentY = e.clientY;
  const bookDeltaX = bookCurrentX - bookPreviousX.value;
  const bookDeltaY = bookCurrentY - bookPreviousY.value;

  bookRotateY.value += bookDeltaX * 0.5;
  bookRotateX.value -= bookDeltaY * 0.5;
  bookRotateX.value = Math.max(-90, Math.min(90, bookRotateX.value));

  bookHolder.value.style.transform = `rotateX(${bookRotateX.value}deg) rotateY(${bookRotateY.value}deg)`;
  bookPreviousX.value = bookCurrentX;
  bookPreviousY.value = bookCurrentY;
};

// const bookStopDragging = () => {
//   bookIsDragging.value = false;
//   bookHolder.value.style.cursor = "grab";
//   bookHolder.value.style.animation = "bookFloat 15s ease-in-out infinite alternate"; // 重新啟動動畫
// };

const bookStopDragging = () => {
  bookIsDragging.value = false;
  if (bookHolder.value) {
    bookHolder.value.style.cursor = "grab";
    bookHolder.value.style.animation =
      "bookFloat 15s ease-in-out infinite alternate";
  } else {
    console.error("bookHolder.value is null in bookStopDragging");
  }
};

const bookTouchStart = (e) => {
  bookIsDragging.value = true;
  bookPreviousX.value = e.touches[0].clientX;
  bookPreviousY.value = e.touches[0].clientY;
  e.preventDefault();
};

const bookTouchMove = (e) => {
  if (!bookIsDragging.value) return;
  const bookCurrentX = e.touches[0].clientX;
  const bookCurrentY = e.touches[0].clientY;
  const bookDeltaX = bookCurrentX - bookPreviousX.value;
  const bookDeltaY = bookCurrentY - bookPreviousY.value;

  bookRotateY.value += bookDeltaX * 0.5;
  bookRotateX.value -= bookDeltaY * 0.5;
  bookRotateX.value = Math.max(-90, Math.min(90, bookRotateX.value));

  bookHolder.value.style.transform = `rotateX(${bookRotateX.value}deg) rotateY(${bookRotateY.value}deg)`;
  bookPreviousX.value = bookCurrentX;
  bookPreviousY.value = bookCurrentY;
  e.preventDefault();
};

const bookTouchEnd = () => {
  bookIsDragging.value = false;
};

// Cleanup event listeners on unmount
onUnmounted(() => {
  if (feedbackList.value) {
    feedbackList.value.removeEventListener("scroll", updateActiveDot);
  }
  if (bookHolder.value) {
    bookHolder.value.removeEventListener("mousedown", bookStartDragging);
    document.removeEventListener("mousemove", bookDrag);
    document.removeEventListener("mouseup", bookStopDragging);
    bookHolder.value.removeEventListener("touchstart", bookTouchStart);
    document.removeEventListener("touchmove", bookTouchMove);
    document.removeEventListener("touchend", bookTouchEnd);
  }
});
</script>
