<style scoped>
@import "../../Assets/css/products.css";
</style>

<template>
  <div class="wrapper3">
    <div class="page-container3">
      <section class="content-section3">
        <div class="content-left3">
          <div class="product-box-container">
            <div class="product-box-holder" ref="bookHolder">
              <div class="product-box--front">
                <div class="pb-color-layer"></div>
                <div
                  class="pb-inner-layer"
                  :style="{ backgroundImage: `url(${product.innerCoverImage})` }"
                ></div>
                <div
                  class="pb-outer-layer"
                  :style="{ backgroundImage: `url(${product.coverImage})` }"
                ></div>
              </div>
              <div class="product-box--back">
                <div class="pb-color-layer"></div>
                <div
                  class="pb-outer-layer"
                  :style="{ backgroundImage: `url(${product.backImage})` }"
                ></div>
              </div>
              <div class="product-box--side-left">
                <div class="pb-color-layer"></div>
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
          <h1>The Legend of Perciliurs Khan</h1>
          <h2>“Perciliurs Khan, the man, the legend!”</h2>

          <div class="info-group3">
            <span class="info-icon3">🔹</span>
            <span class="info-heading3">Brief Introduction</span>
          </div>
          <hr class="info-divider3" />
          <p>
            In a forgotten era, Perciliurs Khan was a cunning and fearless warrior who led
            an army of exiles against the tyrannical Empire of Velmont. Born into poverty
            and cast out for a crime he didn’t commit, Perciliurs rose to power through
            his unmatched intellect and charisma, uniting outlaws, farmers, and forgotten
            tribes under his banner. His legend was cemented when he allegedly tamed the
            mythical shadow beast, Xarnath, using only his voice, making him invincible in
            battle. <br /><br />
            The story tells of his greatest feat: a daring raid on the Imperial Vault,
            where he stole the fabled Amulet of Aeons, said to control time itself. With
            it, he turned the tide of war, liberating his people and carving his name into
            history. However, as whispers of his power grew, some questioned if Perciliurs
            Khan truly existed or if he was a myth, crafted to inspire hope in dark times.
            <br /><br />
            The tale ends with a mysterious twist: a traveler in the present day uncovers
            a hidden artifact—an ancient blade inscribed with the words “Khan will rise
            again.”
          </p>

          <div class="info-group3">
            <span class="info-icon3">🔹</span>
            <span class="info-heading3">Information</span>
          </div>
          <hr class="info-divider3" />
          <p>
            Author : Melinda Wenner<br />
            Illustrator: Ho Hsueh-Yi<br />
            Publication Date: Melinda Wenner<br />
            Language: English
          </p>
          <section class="readButton">
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
        </div>
      </section>

      <section class="feedback-section3">
        <div class="feedback-box3">
          <!-- Scrollable Review List -->
          <div ref="feedbackList" class="feedback-list3" @scroll="updateActiveDot">
            <div
              v-for="(comment, index) in comments"
              :key="index"
              class="feedback-entry3"
            >
              <div class="feedback-content3">
                <img
                  src="../../Assets/img/pics/Acc icon.png"
                  alt="Feedback Icon"
                  class="feedback-icon3"
                />
                <div class="feedback-details3">
                  <div class="feedback-stars3">⭐⭐⭐⭐⭐</div>
                  <p>{{ comment.line1 }}</p>
                  <p>{{ comment.line2 }}</p>
                </div>
              </div>
              <hr class="feedback-divider3" />
            </div>
          </div>

          <!-- Custom Dot Scroll Indicator -->
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
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import coverImage from "@/assets/img/pics/cover.png";
import backImage from "@/assets/img/pics/backCover.png";
import sideLeftImage from "@/assets/img/pics/spine.png";
import sideRightImage from "@/assets/img/pics/2paper.png";
import innerCoverImage from "@/assets/img/pics/bookImg_2.png";

// Router for navigation
const router = useRouter();
const destinationRef = ref(null); // Reference for a DOM element (e.g., content-left3)

// Product data
const product = ref({
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
    "A wonderful wooden block set that enhances creativity and motor skills for young children.",
});

// Navigation function
const goToProductReadPage = (productId) => {
  router.push(`/Products/${productId}/read`);
};

// Comments for feedback list
const comments = ref([
  {
    line1:
      "A thought-provoking masterpiece that challenges conventional wisdom with wit and charm.",
    line2: "— Dr. Emily Carter",
  },
  { line1: "Loved it!", line2: "— Dr. Emily Carter" },
  { line1: "Amazing quality.", line2: "— Dr. Emily Carter" },
  { line1: "Fast shipping!", line2: "— Dr. Emily Carter" },
  { line1: "Excellent service.", line2: "— Dr. Emily Carter" },
  { line1: "Superb craftsmanship.", line2: "— Dr. Emily Carter" },
  { line1: "Great value for money.", line2: "— Dr. Emily Carter" },
  { line1: "Will buy again!", line2: "— Dr. Emily Carter" },
  { line1: "Highly recommend.", line2: "— Dr. Emily Carter" },
  { line1: "Perfect!", line2: "— Dr. Emily Carter" },
]);

// Feedback list scroll logic
const activeDot = ref(0);
const feedbackList = ref(null);

const updateActiveDot = () => {
  if (!feedbackList.value) return;
  const list = feedbackList.value;
  const scrollPercentage = list.scrollTop / (list.scrollHeight - list.clientHeight);
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

const bookStopDragging = () => {
  bookIsDragging.value = false;
  bookHolder.value.style.cursor = "grab";
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

// Lifecycle hooks for event listeners
onMounted(() => {
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
