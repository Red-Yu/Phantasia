<template>
  <div class="inputGroups" :class="{ none: isNone('CreateCover') }">
    <div class="infoGroup">
      <div class="Group ContentIntroduction">
        <h3>Content introduction</h3>
        <div class="inputBox Title">
          <p>Title</p>
          <TextInput :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox Subtitle">
          <p>Subtitle</p>
          <TextInput :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox Summary">
          <p>Summary</p>
          <TextInput :maxLength="1000" :rows="5" />
        </div>
      </div>
      <!--  -->
      <div class="Group AboutTheAuthor">
        <h3>About the author</h3>
        <div class="inputBox Author">
          <p>Title</p>
          <TextInput :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox Illustrator">
          <p>Illustrator</p>
          <TextInput :maxLength="10" :rows="1" />
        </div>
        <div class="inputBox authorBio">
          <p>Author Bio</p>
          <TextInput :maxLength="300" :rows="5" />
        </div>
      </div>
      <!--  -->
      <div class="Group Information">
        <h3>Information</h3>
        <div class="inputBox Publication-Date">
          <p>Publication Date</p>
          <input class="OtherInput" type="date" />
        </div>
        <div class="inputBox language">
          <p>language</p>
          <select class="OtherInput" name="language">
            <option value="en">English</option>
            <option value="zh">Chinese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
          <div class="selectIcon">
            <div class="cross">
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
        <div class="inputBox age">
          <p>Suitable Reading Age</p>
          <select class="OtherInput" name="age">
            <option value="5">3-5</option>
            <option value="12">5-12</option>
            <option value="16">12-16</option>
          </select>
          <div class="selectIcon">
            <div class="cross">
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
    <!--  -->
    <div class="StepFunction">
      <div class="back">
        <!-- Preview -->
        <router-link to="" class="btnLink dark">
          <div class="icon-M">
            <div class="dark-view"></div>
          </div>
          <p>Live Preview</p>
        </router-link>
        <!-- Design Editor -->
        <router-link to="/Create" class="btnLink dark">
          <div class="icon-M">
            <div class="dark-edit"></div>
          </div>
          <p>Design Editor</p>
        </router-link>
      </div>
      <router-link to="/Create/CreateInfo/CreateConfirm" class="next">
        <div class="btnKey-M dark-border">
          <p>Next</p>
          <div class="icon-M">
            <div class="dark-cross">
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
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextInput from "../../../components/Input/TextInput.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isNone = (stepName) => {
  return route.name === stepName;
};
</script>
