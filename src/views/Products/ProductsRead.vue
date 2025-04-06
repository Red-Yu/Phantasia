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
        <div
          class="readTemplateSize"
          :style="getPreviewStyle"
          style="width: 680px"
        >
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
            Kindly note that your comments will be publicly visible, so please
            post responsibly.
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

        <div
          @click="navigate('/Products')"
          class="action-button8 btnLink light"
        >
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
          <div
            @click="navigate('/Products')"
            class="action-button btnKey-L light popUpActionButton"
          >
            <p>BACK TO BOOKS</p>
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
          <div
            @click="navigate('/MemberCenter')"
            class="action-button btnKey-L light popUpActionButton"
          >
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

// Define the navigate function (same as footer)
function navigate(link) {
  if (link.startsWith("http")) {
    window.location.href = link; // External link
  } else {
    router.push(link); // Internal route
  }
}

const collectStamps = () => {
  router.push("/MyCabin/MyRewardCard");
};

// 辨識為會員才在資料庫紀錄點數
// onAuthStateChanged(auth, (user) => {
//         if (user) {
//           userID.value = user.uid;
//           fetchPoints(user.uid);
//         }
//       });
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
});

// Star rating logic
const totalStars7 = 5;
const currentRating7 = ref(0);
const hoverRating7 = ref(0);
const userInput = ref("");

//集點

const userID = ref(null);
const points = ref(0);
const hasClicked = ref(false); // 用於追蹤是否已點擊
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
  if (hasClicked.value || !userID.value) return; // 如果已點擊或未登入則返回
  hasClicked.value = true; // 標記為已點擊
  const userRef = doc(db, "users", userID.value);
  try {
    await updateDoc(userRef, {
      points: points.value + 1,
    });
    points.value++; // 確保資料庫更新成功後再增加點數
    // 集點成功後顯示提示
    // alert("集點成功！");
    isSuccessModalVisible.value = true;
    console.log("isSuccessModalVisible:", isSuccessModalVisible.value);
  } catch (error) {
    console.error("更新點數時發生錯誤:", error);
    hasClicked.value = false; // 如果更新失敗，重置點擊狀態
  }

  // 設置定時器，3秒後關閉成功彈窗
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
  setTimeout(() => {
    loading.value = false; // Set loading to false after a short delay
  }, 200); // Adjust the delay as needed
  loadTemplates(); // 頁面加載時根據檔案資料載入模板
  const savedData = sessionStorage.getItem(`feedback-${bookId}`);
  if (savedData) {
    const { rating, feedback } = JSON.parse(savedData);
    currentRating7.value = rating || 0;
    userInput.value = feedback || "";
  }
  // Existing scroll event listeners
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", updateActiveDot);
});

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
    alert("Your feedback has been submitted.");

    // Clear sessionStorage and reset form after submission
    sessionStorage.removeItem(`feedback-${bookId}`);
    currentRating7.value = 0;
    userInput.value = "";
  } catch (error) {
    console.error("Error submitting feedback to Firestore:", error);
    alert("An error occurred while submitting your feedback.");
  }
};
// -------------------------import pinia-----------------------
const templates = ref([]);
const templateStore = useTemplateStore();
const pathSegments = window.location.pathname.split("/").filter(Boolean);
const productId = pathSegments[3];

function loadTemplates() {
  if (bookId) {
    templateStore.loadBooksTemplatesFromFirebase(bookId); // 根據選中的檔案載入資料
    templates.value = templateStore.templates;
  }
}
const mainContentRef = ref(null); // 預覽主區塊容器
const { width } = useElementSize(mainContentRef); // 動態監聽容器寬度變化
const baseWidth = 680; // 設計稿的寬度基準
// const scale = ref(1)

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

// =================
// IntersectionObserver 設定：模組進入畫面時觸發動畫
// 這段是用來判斷進入視窗重新撥放動畫 但因為結構問題沒有辦法處理
// =================
// const modelRefs = ref([]); // 收集所有模組區塊的 DOM 參考

// 判斷元素是否進入可視區域 50%
// function isElementInViewport(el) {
//   const rect = el.getBoundingClientRect();
//   return (
//     rect.top >= 0 && // 元素頂部大於等於視窗頂部
//     rect.left >= 0 && // 元素左邊大於等於視窗左邊
//     rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.5 && // 元素頂部小於等於視窗的一半
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth) // 元素右邊小於等於視窗的右邊界
//   );
// }

// function checkScroll() {
//   console.log('檢查滾動...');
//   modelRefs.value.forEach(el => {
//     if (el && isElementInViewport(el)) {
//       console.log('觸發動畫', el);
//       el.__startInnerAnimation?.();
//     }
//   });
// }

// // 監聽全域的滾動事件
// onMounted(() => {
//   window.addEventListener('scroll', checkScroll);
//   // 初次檢查一次
//   checkScroll();
// });

// // 在元件卸載時移除滾動事件監聽器
// onUnmounted(() => {
//   window.removeEventListener('scroll', checkScroll);
// });

// -------------------------import pinia-----------------------

// readTemplateGroup
// Existing Scroll-related logic (unchanged)
const sections = ref([
  { image: new URL("@/assets/img/pics/one.png", import.meta.url).href },
  { image: new URL("@/assets/img/pics/two.png", import.meta.url).href },
]);
const dots = ref(new Array(10).fill(null));
const activeDot = ref(0);

const preventScrollAction = (event) => {
  if (showPopup.value) {
    event.preventDefault();
    event.stopPropagation();
  }
};

const handleScroll = () => {
  if (showPopup.value || loading.value) return; // Exit if loading
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollTop / scrollHeight;

  // Show popup if not logged in OR logged in but not subscribed, at 95% scroll
  if (
    scrollPercentage >= 0.55 &&
    (!userId.value || (userId.value && !isSubscribed.value))
  ) {
    showPopup.value = true;
    document.body.style.overflow = "hidden";
  }
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
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollTo = (scrollHeight / 9) * index;
  window.scrollTo({ top: scrollTo, behavior: "smooth" });
};

const updateActiveDot = () => {
  if (showPopup.value) return;
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
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
