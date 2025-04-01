<style scoped>
@import "../../Assets/css/products.css";
.disabled {
  /* 集點部分 */
  pointer-events: none; /* 禁用點擊 */
  opacity: 0.5; /* 顯示為禁用狀態 */
}
.fade-out {
  opacity: 0;
  transition: opacity 1s ease-out;
}
</style>

<template>
  <div class="body3" ref="mainContentRef">
    <div class="webpage-container5" :class="{ 'no-scroll': showPopup }">
      <!-- Custom Scroll Indicator -->
      <div class="scroll-indicator5">
        <span
          v-for="(dot, index) in dots"
          :key="index"
          class="scroll-dot5"
          :class="{ active5: index <= activeDot }"
          @click="scrollToPosition(index)"
        ></span>
        <img
          src="@/assets/img/pics/upArrow.png"
          alt="Back to Top"
          class="back-to-top5"
          @click="scrollToTop"
        />
      </div>

      <!-- Fullscreen Image Sections -->
      <!-- <section
        v-for="(section, index) in sections"
        :key="index"
        :id="'section-' + index"
        class="full-section5"
        :style="{ backgroundImage: `url(${section.image})` }"
      ></section> -->
      <div
        class="readTemplateGroup"
        :style="{ height: 380 * templateStore.templates.length * scale + 'px' }"
      >
        <div class="readTemplateSize" :style="getPreviewStyle" style="width: 680px">
          <div
            class="canvas"
            v-for="(template, i) in templateStore.templates"
            :key="template.data.templateId"
            style="pointer-events: none"
          >
            <component
              :is="template.component"
              v-bind="template.data"
              :mode="preview"
              @updateData="updateTemplateData(i, $event)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="text-container-6">
      <h1 class="title-6">ADD</h1>
      <div class="h3-wrapper-6">
        <div class="line-6"></div>
        <h3 class="subtitle-6">A</h3>
        <div class="line-6"></div>
      </div>
      <h1 class="title-6">REVIEW</h1>
    </div>
    <div class="user-input-wrapper">
      <div class="user-input-container">
        <div class="feedback-content37">
          <img :src="avatarURL" alt="User Avatar" class="feedback-icon37" />
          <div class="feedback-details37">
            <div class="feedback-stars37">
              <span
                v-for="star7 in totalStars7"
                :key="star7"
                @mouseover="hoverStar7(star7)"
                @mouseleave="resetHover7"
                @click="setRating7(star7)"
                :class="{
                  filled: star7 <= currentRating7 || star7 <= hoverRating7,
                }"
                class="star7"
                >&#9733;</span
              >
            </div>
          </div>
        </div>

        <div class="reviewText">
          <p>
            Kindly note that your comments will be publicly visible, so please post
            responsibly.
          </p>
        </div>

        <div class="textarea-wrapper">
          <textarea
            class="user-input-textbox"
            v-model="userInput"
            placeholder="Enter your feedback..."
          ></textarea>
          <span class="char-counter">{{ charCount }}/100</span>
        </div>
        <div class="actionButtonWrapper">
          <div class="action-buttons">
            <div @click="saveData" class="action-button btnLink light">
              <p>Save for now</p>
              <div class="icon-L">
                <div class="light-edit"></div>
              </div>
            </div>

            <div @click="submitData" class="action-button btnKey-L light">
              <p>Submit</p>
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
    <div class="actionButtonWrapper8">
      <div class="action-buttons8">
        <div
          @click="addPoint"
          class="action-button8 btnKey-L light"
          :class="{ disabled: hasClicked }"
        >
          <p>COLLECT YOUR STAMPS</p>
        </div>
        <SuccessModal
          v-if="isSuccessModalVisible"
          class="success-modal"
          :isVisible="isSuccessModalVisible"
          @close="isSuccessModalVisible = false"
        />

        <div @click="navigate('/Products')" class="action-button8 btnLink light">
          <p>Back to books</p>
          <div class="icon-L">
            <div class="light-arrow"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="overlay">
      <div class="popup-box">
        <p>
          YOU’VE REACH THE END OF THE TRIAL <br />
          SUBSCRIBE NOW TO READ MORE
        </p>
        <div class="popup-buttons">
          <div @click="navigate('/Products')" class="action-button btnKey-L light">
            <p>BACK TO BOOKS</p>
          </div>
          <div @click="navigate('/MemberCenter')" class="action-button btnKey-L light">
            <p>SUBSCRIBE</p>
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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../firebase/firebaseConfig"; // Adjust path
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import SuccessModal from "../MyCabin/stampSuccess.vue";
import { useTemplateStore } from "@/stores/template";
import { useElementSize } from "@vueuse/core";

// Popup logic
const showPopup = ref(false);
// Route setup
const route = useRoute();
const bookId = route.params.id; // e.g., "abc123xyz"
// Reactive data
const avatarURL = ref("");
const userId = ref(null); // Store authenticated user ID
const isSubscribed = ref(false); // Subscription status

const loading = ref(true); // New loading state

// Use Vue Router
const router = useRouter();

// Define the navigate function (same as footer) using replace
function navigate(link) {
  if (link.startsWith("http")) {
    window.location.href = link; // External link
  } else {
    router
      .replace(link)
      .then(() => {
        // Reset state and force update after navigation
        resetState();
        forcePopupUpdate().catch((err) =>
          console.error("Force update error after navigate:", err)
        );
      })
      .catch((err) => console.error("Navigation error:", err));
  }
}

const collectStamps = () => {
  router
    .replace("/MyCabin/MyRewardCard")
    .then(() => {
      // Reset state and force update after navigation
      resetState();
      forcePopupUpdate().catch((err) =>
        console.error("Force update error after collectStamps:", err)
      );
    })
    .catch((err) => console.error("Navigation error:", err));
};

// Reset state when navigating or re-entering
const resetState = () => {
  showPopup.value = false;
  document.body.style.overflow = "";
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 200);
};

// Firebase Auth setup and subscription check
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userID.value = user.uid;
    fetchPoints(user.uid);
  }

  if (user) {
    avatarURL.value = user.photoURL || "/MyColset/character115x409.png";
    userId.value = user.uid;

    // Check subscription status in Firestore
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", userId.value)
    );
    const querySnapshot = await getDocs(ordersQuery);
    isSubscribed.value = querySnapshot.docs.some((doc) => {
      const endDate = new Date(doc.data().endDate);
      return endDate > new Date(); // Active subscription if endDate is in the future
    });
  } else {
    avatarURL.value = "/MyColset/character115x409.png";
    userId.value = null;
    isSubscribed.value = false; // Not logged in, so not subscribed
  }
  loading.value = false; // Set loading false after checks
  await forcePopupUpdate().catch((err) =>
    console.error("Force update error after auth:", err)
  );
});

// Star rating logic
const totalStars7 = 5;
const currentRating7 = ref(0);
const hoverRating7 = ref(0);
const userInput = ref("");

// Collect points
const userID = ref(null);
const points = ref(0);
const hasClicked = ref(false); // Track if button has been clicked
const isSuccessModalVisible = ref(false);

const fetchPoints = async (uid) => {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    points.value = userSnap.data().points || 0;
  } else {
    await setDoc(userRef, { points: 0 });
  }
};

const addPoint = async () => {
  if (hasClicked.value || !userID.value) return; // If already clicked or not logged in, return
  hasClicked.value = true; // Mark as clicked
  const userRef = doc(db, "users", userID.value);
  try {
    await updateDoc(userRef, {
      points: points.value + 1,
    });
    points.value++; // Ensure points increase after successful DB update
    isSuccessModalVisible.value = true;
    console.log("isSuccessModalVisible:", isSuccessModalVisible.value);
  } catch (error) {
    console.error("Error updating points:", error);
    hasClicked.value = false; // Reset click state if update fails
  }

  // Set timer to close success modal after 3 seconds
  setTimeout(() => {
    const modal = document.querySelector(".success-modal");
    if (modal) {
      modal.classList.add("fade-out");
      setTimeout(() => {
        isSuccessModalVisible.value = false;
      }, 1000);
    }
  }, 2000);
};

// Load from sessionStorage on mount
onMounted(() => {
  resetState(); // Reset state on mount
  loadTemplates(); // Load templates on page load
  const savedData = sessionStorage.getItem(`feedback-${bookId}`);
  if (savedData) {
    const { rating, feedback } = JSON.parse(savedData);
    currentRating7.value = rating || 0;
    userInput.value = feedback || "";
  }
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", updateActiveDot);
  window.addEventListener("popstate", handlePopState); // Handle back/forward navigation
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", updateActiveDot);
  window.removeEventListener("popstate", handlePopState);
  document.body.style.overflow = ""; // Ensure body scroll is restored
  showPopup.value = false; // Reset popup on unmount
});

// Handle browser back/forward navigation
const handlePopState = () => {
  resetState(); // Reset state when user navigates back
  forcePopupUpdate().catch((err) =>
    console.error("Force update error on popstate:", err)
  );
  router
    .replace(route.path)
    .then(() => {
      loadTemplates(); // Reload templates to ensure data is fresh
    })
    .catch((err) => console.error("Router replace error on popstate:", err));
};

const hoverStar7 = (star7) => {
  hoverRating7.value = star7;
};

const resetHover7 = () => {
  hoverRating7.value = 0;
};

const setRating7 = (star7) => {
  currentRating7.value = star7;
  saveToSessionStorage(); // Save rating immediately when set
};

// Character Counter Logic
const charCount = computed(() => userInput.value.length);

watch(userInput, (newValue) => {
  if (newValue.length > 100) {
    userInput.value = newValue.slice(0, 100);
  }
  saveToSessionStorage(); // Save comment as user types
});

// Session Storage Functions
const saveToSessionStorage = () => {
  sessionStorage.setItem(
    `feedback-${bookId}`,
    JSON.stringify({
      rating: currentRating7.value,
      feedback: userInput.value,
    })
  );
};

const saveData = () => {
  saveToSessionStorage();
  alert("Your feedback has been saved temporarily.");
};

const submitData = async () => {
  if (!userId.value) {
    alert("Please log in to submit your feedback.");
    return;
  }

  const feedbackData = {
    text: userInput.value,
    rating: currentRating7.value,
    userId: userId.value,
    bookId: bookId,
    timestamp: new Date().toISOString(),
  };
  try {
    await addDoc(collection(db, "comments"), feedbackData);
    alert("Your feedback has been submitted to Firestore.");

    // Clear sessionStorage and reset form after submission
    sessionStorage.removeItem(`feedback-${bookId}`);
    currentRating7.value = 0;
    userInput.value = "";
  } catch (error) {
    console.error("Error submitting feedback to Firestore:", error);
    alert("An error occurred while submitting your feedback.");
  }
};

// Pinia integration
const templates = ref([]);
const templateStore = useTemplateStore();
const pathSegments = window.location.pathname.split("/").filter(Boolean);
const productId = pathSegments[3];

function loadTemplates() {
  if (bookId) {
    templateStore
      .loadBooksTemplatesFromFirebase(bookId)
      .catch((err) => console.error("Error loading templates:", err));
    templates.value = templateStore.templates;
  }
}

const mainContentRef = ref(null); // Preview main content container
const { width } = useElementSize(mainContentRef); // Dynamically monitor container width
const baseWidth = 680; // Design draft width baseline

const getPreviewStyle = computed(() => {
  const scale = Math.min(width.value / baseWidth);
  return {
    transform: `scale(${scale})`,
    transformOrigin: "0 0",
  };
});

const scale = computed(() => {
  const scale = Math.min(width.value / baseWidth);
  return scale;
});

// Scroll-related logic
const sections = ref([
  { image: new URL("@/assets/img/pics/one.png", import.meta.url).href },
  { image: new URL("@/assets/img/pics/two.png", import.meta.url).href },
]);
const dots = ref(new Array(10).fill(null));
const activeDot = ref(0);

// Force update helper
const forcePopupUpdate = async () => {
  await nextTick(); // Wait for DOM to update
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollTop / scrollHeight;

  // Show popup if not logged in OR logged in but not subscribed, at 55% scroll
  if (
    scrollPercentage >= 0.55 &&
    (!userId.value || (userId.value && !isSubscribed.value))
  ) {
    showPopup.value = true;
    document.body.style.overflow = "hidden";
  } else {
    showPopup.value = false;
    document.body.style.overflow = "";
  }
};

// Watch for changes in user authentication or subscription
watch([userId, isSubscribed], async () => {
  await forcePopupUpdate().catch((err) => console.error("Watch update error:", err));
});

const preventScrollAction = (event) => {
  if (showPopup.value) {
    event.preventDefault();
    event.stopPropagation();
  }
};

const handleScroll = () => {
  if (loading.value) return; // Exit if loading
  forcePopupUpdate().catch((err) => console.error("Scroll update error:", err));
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = "";
};

const confirmAction = () => {
  alert("Confirmed!");
  closePopup();
};

const scrollToPosition = (index, event) => {
  if (showPopup.value || loading.value) {
    event.preventDefault();
    return;
  }
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollTo = (scrollHeight / 9) * index;
  window.scrollTo({ top: scrollTo, behavior: "smooth" });
};

const updateActiveDot = () => {
  if (showPopup.value) return;
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  activeDot.value = Math.min(9, Math.floor((scrollTop / scrollHeight) * 10));
};

const scrollToTop = (event) => {
  if (showPopup.value || loading.value) {
    preventScrollAction(event);
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", updateActiveDot);
  document.body.style.overflow = "";
});
</script>
