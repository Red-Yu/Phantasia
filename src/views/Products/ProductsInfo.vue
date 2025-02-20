<style scoped>
@import "../../Assets/css/products.css";
</style>

<template>
  <!-- <header></header> -->
  <div class="wrapper3">
    <div class="whiteLine">
      <div class="page-container3">
        <section class="hero-section3">
          <div class="oneonesix">
            <div class="whirl-container" :style="bookStyle">
              <div class="whirl-box-holder">
                <div
                  class="whirl-box whirl-front"
                  :style="{ backgroundImage: `url(${coverImage})` }"
                ></div>
                <div
                  class="whirl-box whirl-side-left"
                  :style="{ backgroundImage: `url(${sideLeftImage})` }"
                ></div>
                <div
                  class="whirl-box whirl-side-right"
                  :style="{ backgroundImage: `url(${sideRightImage})` }"
                ></div>
                <div
                  class="whirl-box whirl-back"
                  :style="{ backgroundImage: `url(${backImage})` }"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section3">
          <div class="content-left3">
            <div class="destination-div" ref="destinationRef"></div>
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
              In a forgotten era, Perciliurs Khan was a cunning and fearless
              warrior who led an army of exiles against the tyrannical Empire of
              Velmont. Born into poverty and cast out for a crime he didn’t
              commit, Perciliurs rose to power through his unmatched intellect
              and charisma, uniting outlaws, farmers, and forgotten tribes under
              his banner. His legend was cemented when he allegedly tamed the
              mythical shadow beast, Xarnath, using only his voice, making him
              invincible in battle. <br /><br />
              The story tells of his greatest feat: a daring raid on the
              Imperial Vault, where he stole the fabled Amulet of Aeons, said to
              control time itself. With it, he turned the tide of war,
              liberating his people and carving his name into history. However,
              as whispers of his power grew, some questioned if Perciliurs Khan
              truly existed or if he was a myth, crafted to inspire hope in dark
              times.
              <br /><br />
              The tale ends with a mysterious twist: a traveler in the present
              day uncovers a hidden artifact—an ancient blade inscribed with the
              words “Khan will rise again.”
            </p>

            <div class="info-group3">
              <span class="info-icon3">🔹</span>
              <span class="info-heading3">Information</span>
            </div>
            <hr class="info-divider3" />
            <p>
              Author : Melinda Wenner<br />
              Illustrator: Ho Hsueh-Yi<br />
              Publication Date:Melinda Wenner<br />
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
            <div
              ref="feedbackList"
              class="feedback-list3"
              @scroll="updateActiveDot"
            >
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import coverImage from "@/Assets/img/pics/cover.png";
import backImage from "@/Assets/img/pics/backCover.png";
import sideLeftImage from "@/Assets/img/pics/spine.png";
import sideRightImage from "@/Assets/img/pics/spine2.png";

const router = useRouter();
const scrollPosition = ref(0);
const destinationRef = ref(null);
const viewportHeight = window.innerHeight;

const goToProductReadPage = (productId) => {
  router.push(`/Products/${productId}/read`);
};

const handleScroll = () => {
  const triggerPoint = viewportHeight / 4; // When animation should start
  const destinationPoint =
    destinationRef.value?.offsetTop - viewportHeight / 1.5;

  if (window.scrollY > triggerPoint) {
    scrollPosition.value = Math.min(
      (window.scrollY - triggerPoint) / (destinationPoint - triggerPoint),
      1
    );
  }
};

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

const activeDot = ref(0);
const feedbackList = ref(null);

const updateActiveDot = () => {
  if (!feedbackList.value) return;
  const list = feedbackList.value;
  const scrollPercentage =
    list.scrollTop / (list.scrollHeight - list.clientHeight);
  activeDot.value = Math.floor(scrollPercentage * 10);
};

onMounted(() => {
  if (feedbackList.value) {
    feedbackList.value.addEventListener("scroll", updateActiveDot);
  }
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  if (feedbackList.value) {
    feedbackList.value.removeEventListener("scroll", updateActiveDot);
  }
  window.removeEventListener("scroll", handleScroll);
});

const bookStyle = computed(() => {
  const rotation = scrollPosition.value * 360; // Full rotation (360°)
  const moveX = scrollPosition.value * -30; // Move to the left (-50vw)
  const moveY = scrollPosition.value * 1000; // Move down (500px)

  return {
    transform: `translate(${moveX}vw, ${moveY}px) rotateY(${rotation}deg)`,
    transition: "transform 0.2s ease-out",
  };
});
</script>
