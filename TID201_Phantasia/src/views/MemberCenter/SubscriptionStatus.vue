
// 這是訂閱成功或失敗
// 因為只有內容不一樣，用條件判斷決定顯示的內容


<style scoped>
@import "../../Assets/css/main.css";


.right-content {
  border: none;
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.Successfulmessage{
width: 100% auto;
font-family: 'Fanwood Text';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 26px;
display: flex;
align-items: center;
color: #153243;
margin-bottom: 50px;
}

.Successfulmessage .details-list {
  text-align: left;    /* 文字靠左 */
}

</style>

<template>

        <!-- 右側內容區 -->
        <div class="right-content">
          <AnimatedTitle 
            firstTitle="Subscription"
            middleText="is"
            secondTitle="Successful"
          />
        
          <section class="Successfulmessage">
            <div class="details-list">
              <p>Thank you for subscribing! We are delighted to provide you with enhanced services. Below are some important details; please read them carefully:</p>
              <p>Subscription Period: Your subscription will start on December 1, 2024, and end on December 31, 2024.</p>
              <p>Auto-Renewal: To ensure uninterrupted access to our services, your subscription will automatically renew upon expiration. 
              Please keep your payment information up to date.</p>
              <p>Change or Cancel Subscription: To modify your subscription plan or cancel your subscription, please go to “Member Center” ➡ “Subscription Plan” and follow the instructions.</p>
              <p> you have any questions or need assistance, please feel free to contact our customer support team.</p>
              <p> you again for subscribing, and we wish you a pleasant experience!</p>
            </div>
          </section>

          <div class="btnKey-L dark">
              <p>START READING</p>
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
</template>

<script setup>
import AnimatedTitle from '@/components/MemberCenterAnimatedTitle.vue';
</script>