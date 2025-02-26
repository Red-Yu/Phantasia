<style scoped>
@import "../../Assets/css/main.css";


.directions {
  background-color: #DEE2E6;
  padding: 20px;
  color: #153243;
  margin-bottom: 50px;
  gap: 20px;
}

.directions-title {
  font-family: "Aleo", bold;
  font-size: 24px;
  font-weight: 500;
  margin: 8px 0;
}

.directions-desc {
  font-family: "Fanwood Text", serif;
  font-size: 20px;
  margin-bottom: 20px;
}

.CREATE-link{
  color: #153243;
  text-decoration: none;
  display: block;
  text-align: right;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
}

.search-section {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 44px;
}

.search-container {
  margin: 0 auto;
  border-bottom: 2px solid #153243;
  padding: 8px 0;
  width: 100%;
}

.search-input-wrapper {
  display: flex;
  position: relative;
}

.search-input {
  border: none;          /* 移除邊框 */
  outline: none;         /* 移除點擊時的外框 */
  background: none;      /* 移除背景色 */
  width: 100%;
  color: #999999;
  font-size: 20px;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
}

.remove-button {
  font-family: "Fanwood Text", serif;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: right;
  color: #153243;
  gap: 15px;
  cursor: pointer;
}

.remove-button .img{
  height: 24px;

}

.table-title {
  font-family: "Aleo", bold;
  font-size: 24px;
  color: #EEAD50;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-align: center;
  margin: 62px 0 13px 0;

}

.projects-table {
  width: 100%;
  font-family: "Fanwood Text";
  font-size: 20px;
  justify-content: space-between;
  gap: 13px;
  border-collapse: separate;
  border-spacing: 0;
  
}

.projects-table thead {
  border-bottom: 1px solid #7A7A7A;
}
  

.projects-table thead td {
  color: #EEAD50;
  border-bottom: 1px solid #7A7A7A;
}

.projects-table thead tr {
  align-items: center;
}

.projects-table tbody tr {
 margin: 13px 0 0 0;
 display: table-row;
 height: 13px;
 vertical-align: middle;
}

.projects-table tbody td {
 margin: 50px 0;
}

.project-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 13px 5px;
  gap: 27px;
  margin: 0 auto;
  
}

.project-name {
  font-family: "Fanwood Text";
  font-variant: small-caps;
  font-size: 28px;
  color: #153243;
  font-weight: 500;
}

.project-subtitle {
  font-family: "Fanwood Text";
  font-variant: small-caps;
  font-size: 18px;
  color: #7A7A7A;
}

.project-date {
  font-family: "Fanwood Text";
  color: #7A7A7A;
  font-size: 18px;
}

.more-info {
  font-family: "Fanwood Text";
  color: #153243;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
  margin-top: 30px;
  cursor: pointer;
}



</style>

<template>

        <!-- 頂部說明區域 -->
        <div class="directions">
          <div class="directions-title">Published Works Management Guide</div>
              <div class="directions-desc">This section is for viewing information about published works and performing unpublishing
                actions only. To modify a work, please return to the creator's page.</div>
              <div class="CREATE-link">
                  <p style="font-size: 20px">Back to CREATE STORY</p>
                <div class="i">
                <div class="dark-arrow"></div>
              </div>
          </div>
        </div>
        <!-- 搜尋和移除按鈕區域 -->
        <div class="search-section">
          <div class="search-container">
            <div class="search-input-wrapper">
              <input type="search" class="search-input" placeholder="Search" required />
              <div class="search-icon"><img :src="search" alt="search" /></div>
            </div>
          </div>
          <div class="remove-button">
            <img :src="remove" alt="remove" />
            <p>Remove</p>
          </div>
        </div>

        <!-- 表格標題 -->
        <p class="table-title">PUBLISHED PROJECTS</p>
        
        <!-- 項目表格 -->
        <table class="projects-table">
          <thead>
            <tr>
              <td>Project Name</td>
              <td>Date ∧</td>
              <td>Info ∧</td>
            </tr>
          </thead>

          

          <tbody>
            <tr v-for="(project, index) in projects" :key="index">
              <td>
                <div class="project-info">
                  <div class="projectdeleteicon">
                    <img :src="projectdeleteicon" alt="projectdeleteicon" />
                  </div>
                  <div class="project-image">
                    <img :src="projectIcon" alt="project" />
                  </div>
                  <div class="project-text">
                    <div class="project-name">{{ project.name }}</div>
                    <div class="project-subtitle">{{ project.subtitle }}</div>
                  </div>
                </div>
              </td>
              <td class="project-date">{{ project.date }}</td>
              <td class="more-info">
                More
                <div class="i">
                  <div class="dark-view"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
</template>

<script setup>
import projectIcon from "@/assets/img/membercenter/project.svg";
import remove from "@/assets/img/membercenter/remove.svg";
import search from "@/assets/img/membercenter/search.svg";
import projectdeleteicon from "@/assets/img/membercenter/projectdeleteicon.svg";

const projects = [
        {
          name: 'First project',
          subtitle: '• Amsterdam Amsterdam',
          date: 'Nov 18, 2024 2:00 AM'
        },
        {
          name: 'First project',
          subtitle: '• Amsterdam Amsterdam',
          date: 'Nov 18, 2024 2:00 AM'
        },
        {
          name: 'First project',
          subtitle: '• Amsterdam Amsterdam',
          date: 'Nov 18, 2024 2:00 AM'
        },
        {
          name: 'First project',
          subtitle: '• Amsterdam Amsterdam',
          date: 'Nov 18, 2024 2:00 AM'
        },
        {
          name: 'First project',
          subtitle: '• Amsterdam Amsterdam',
          date: 'Nov 18, 2024 2:00 AM'
        },
        {
          name: 'First project',
          subtitle: '• Amsterdam Amsterdam',
          date: 'Nov 18, 2024 2:00 AM'
        }
];
</script>



