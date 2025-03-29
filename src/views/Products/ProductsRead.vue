<style scoped>
@import "../../Assets/css/products.css";
.disabled {  /* 集點部分 */
  pointer-events: none; /* 禁用點擊 */
  opacity: 0.5; /* 顯示為禁用狀態 */
}
.fade-out {
  opacity: 0;
  transition: opacity 1s ease-out;
}
</style>

<template>
  <div class="body3">
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
      <section
        v-for="(section, index) in sections"
        :key="index"
        :id="'section-' + index"
        class="full-section5"
        :style="{ backgroundImage: `url(${section.image})` }"
      ></section>
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
          <img
            src="../../Assets/img/pics/Acc icon.png"
            alt="Feedback Icon"
            class="feedback-icon37"
          />
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
          <span class="char-counter">{{ charCount }}/1000</span>
        </div>
        <div class="actionButtonWrapper">
          <div class="action-buttons">
            <div @click="saveData" class="action-button btnLink light">
              <p>Save</p>
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

        <div @click="saveData" class="action-button8 btnLink light">
          <p>Back to shop</p>
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
          <div @click="confirmAction" class="action-button btnKey-L light">
            <p>BACK TO STORE</p>
          </div>
          <div @click="closePopup" class="action-button btnKey-L light">
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

<script>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import axios from "axios";

import { db } from "@/firebase/firebaseConfig"; 
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SuccessModal from "../MyCabin/stampSuccess.vue";



export default {
  components: {
      SuccessModal, // 註冊 SuccessModal 組件
  },
  setup() {
    // Popup logic
    const showPopup = ref(false);

    const preventScrollAction = (event) => {
      if (showPopup.value) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleScroll = () => {
      if (showPopup.value) return; // Prevent scroll handling when popup is active

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollTop / scrollHeight >= 0.95) {
        showPopup.value = true;
        document.body.style.overflow = "hidden"; // Disable scroll when popup appears
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

    // Scroll-related logic
    const sections = ref([
      { image: new URL("@/assets/img/pics/one.png", import.meta.url).href },
      { image: new URL("@/assets/img/pics/two.png", import.meta.url).href },
    ]);
    const dots = ref(new Array(10).fill(null));
    const activeDot = ref(0);

    const scrollToPosition = (index, event) => {
      if (showPopup.value) {
        event.preventDefault(); // Prevent scrolling action if popup is visible
        return; // Stop executing further code
      }

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTo = (scrollHeight / 9) * index;

      // Scroll smoothly to the calculated position
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    };

    const updateActiveDot = () => {
      if (showPopup.value) return; // Prevents updating the scroll indicator when popup is active

      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      activeDot.value = Math.min(
        9,
        Math.floor((scrollTop / scrollHeight) * 10)
      );
    };

    const scrollToTop = (event) => {
      if (showPopup.value) {
        preventScrollAction(event); // Block scroll action if popup is active
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Star rating logic
    const totalStars7 = 5;
    const currentRating7 = ref(0);
    const hoverRating7 = ref(0);

    const hoverStar7 = (star7) => {
      hoverRating7.value = star7;
    };

    const resetHover7 = () => {
      hoverRating7.value = 0;
    };

    const setRating7 = (star7) => {
      currentRating7.value = star7;
    };

    // Character Counter Logic
    const userInput = ref("");
    const charCount = computed(() => userInput.value.length);

    watch(userInput, (newValue) => {
      if (newValue.length > 1000) {
        userInput.value = newValue.slice(0, 1000);
      }
    });

    // Save and Submit logic
    const saveData = () => {
      localStorage.setItem(
        "userFeedback",
        JSON.stringify({
          feedback: userInput.value,
          rating: currentRating7.value,
        })
      );
      alert("Your feedback has been saved locally.");
    };

    const submitData = async () => {
      const feedbackData = {
        feedback: userInput.value,
        rating: currentRating7.value,
      };
      try {
        await axios.post("your-backend-api-url", feedbackData);
        alert("Your feedback has been submitted.");
      } catch (error) {
        alert("An error occurred while submitting your feedback.");
      }
    };


    //集點
    const auth = getAuth();
    const userID = ref(null);
    const points = ref(0);
    const hasClicked = ref(false); // 用於追蹤是否已點擊
    const isSuccessModalVisible = ref(false);


    const fetchPoints = async (uid) => {
      if (!uid) return;
      const userRef = doc(db, 'users', uid);
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
        console.log('isSuccessModalVisible:', isSuccessModalVisible.value);
      } catch (error) {
        console.error("更新點數時發生錯誤:", error);
        hasClicked.value = false; // 如果更新失敗，重置點擊狀態
      }

      // 設置定時器，3秒後關閉成功彈窗
      setTimeout(() => {
        const modal = document.querySelector('.success-modal');
        if (modal) {
          modal.classList.add('fade-out');
          setTimeout(() => {
            isSuccessModalVisible.value = false;
          }, 1000); 
        }
      }, 2000); 
    };


    // Lifecycle Hooks
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("scroll", updateActiveDot);

      //辨識為會員才在資料庫紀錄點數
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userID.value = user.uid;
          fetchPoints(user.uid);
        }
      });

      // isSuccessModalVisible.value = true;
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", updateActiveDot);
      document.body.style.overflow = "";
    });

    return {
      showPopup,
      closePopup,
      confirmAction,
      sections,
      dots,
      activeDot,
      scrollToPosition,
      scrollToTop,
      totalStars7,
      currentRating7,
      hoverRating7,
      hoverStar7,
      resetHover7,
      setRating7,
      userInput,
      charCount,
      saveData,
      submitData,
      points, 
      addPoint,
      hasClicked,
      isSuccessModalVisible
    };
  },
};
</script>
