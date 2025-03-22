const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();

// 綠界提供的 SDK
const ecpay_payment = require('ecpay_aio_nodejs');

const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

// SDK 提供的範例，初始化
// https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
const options = {
  OperationMode: 'Test', //Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
};

// 處理前端發送的支付請求
router.post('/create-payment', (req, res) => {
  const { planType, amount, paymentMethod, orderId } = req.body;
  
  // 設定交易日期
  const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  
  // 生成訂單編號 - 確保長度不超過20位
  let MerchantTradeNo;
  if (orderId && orderId.includes('_')) {
    // 如果從前端傳來訂單 ID，使用其中的時間戳部分
    const timestamp = orderId.split('_')[1].slice(-12);
    MerchantTradeNo = 'P' + timestamp;
  } else {
    // 原有的生成方式
    const timestamp = new Date().getTime().toString().slice(-12);
    MerchantTradeNo = 'P' + timestamp;
  }

  // 基本參數
  let base_param = {
    MerchantTradeNo,
    MerchantTradeDate,
    TotalAmount: amount,
    TradeDesc: `${planType} Subscription`,
    ItemName: `Phantasia ${planType}`,
    ReturnURL: `${HOST}/api/ecpay/return?orderId=${orderId || ''}`,
    ClientBackURL: `${HOST}/api/ecpay/clientReturn?orderId=${orderId || ''}`,
  };

  const create = new ecpay_payment(options);
  
  // 根據支付方式生成不同的表單
  let htmlForm;
  switch(paymentMethod) {
    case 'CREDIT':
      htmlForm = create.payment_client.aio_check_out_credit_onetime(base_param);
      break;
    case 'LINE':
      base_param.ChoosePayment = 'WebATM';
      htmlForm = create.payment_client.aio_check_out_all(base_param);
      break;
      case 'JKO':
        // 不使用特定的 CVS 方法，改用通用方法
        base_param.ChoosePayment = 'CVS';
        htmlForm = create.payment_client.aio_check_out_all(base_param);
      break;
    default:
      htmlForm = create.payment_client.aio_check_out_all(base_param);
  }
  
  // 將 HTML 表單回傳給前端
  res.json({ success: true, htmlForm });
});

// 原有的基本路由，提供基本表單頁面
router.get('/', (req, res) => {
  const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  
  const TradeNo = 'test' + new Date().getTime();
  
  let base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    TotalAmount: '100',
    TradeDesc: '測試交易描述',
    ItemName: '測試商品等',
    ReturnURL: `${HOST}/api/ecpay/return`,
    ClientBackURL: `${HOST}/api/ecpay/clientReturn`,
  };
  
  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);
  
  res.render('index', {
    title: 'Express',
    html,
  });
});

// 後端接收綠界回傳的資料
router.post('/return', async (req, res) => {
  console.log('綠界回傳資料:', req.body);
  
  // 獲取訂單 ID (如果有)
  const orderId = req.query.orderId || '';
  console.log('訂單 ID:', orderId);

  const { CheckMacValue, MerchantTradeNo, RtnCode } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  // 驗證交易
  const isValid = CheckMacValue === checkValue;
  console.log('交易驗證:', isValid ? '成功' : '失敗', CheckMacValue, checkValue);
  
  if (isValid && RtnCode === '1') {
    // 交易成功，更新用戶訂閱狀態
    console.log('交易成功，訂單號:', MerchantTradeNo);
    
    if (orderId) {
      try {
        // 這裡可以添加更新 Firebase 中訂單狀態的代碼
        // 例如使用 Firebase Admin SDK 更新訂單狀態為 'completed'
        console.log('需要更新訂單:', orderId);
        
        // 計算訂閱結束日期代碼可在此處添加
        // 範例:
        // const db = admin.database();
        // const orderRef = db.ref(`orders/${orderId}`);
        // const snapshot = await orderRef.once('value');
        // if (snapshot.exists()) {
        //   const orderData = snapshot.val();
        //   const endDate = calculateEndDate(orderData.planType);
        //   await orderRef.update({
        //     status: 'active',
        //     paymentCompleted: true,
        //     paymentDate: new Date().toISOString(),
        //     endDate: endDate.toISOString()
        //   });
        // }
      } catch (error) {
        console.error('更新訂單狀態錯誤:', error);
      }
    }
  }

  // 交易成功後，需要回傳 1|OK 給綠界
  res.send('1|OK');
});

// 用戶交易完成後的轉址
router.get('/clientReturn', (req, res) => {
  // 獲取訂單 ID 和其他參數
  const orderId = req.query.orderId || '';
  const RtnCode = req.query.RtnCode;
  const isSuccess = RtnCode === '1';
  
  console.log('用戶返回:', req.query);
  console.log('訂單 ID:', orderId);
  
  // 重定向到前端頁面，帶上訂單 ID 和成功狀態
  res.redirect(`http://localhost:5173/tid201/g1/MemberCenter/SubscriptionStatus?success=true&orderId=${orderId}`);
});

// 計算訂閱結束日期的輔助函數
function calculateEndDate(planType) {
  const now = new Date();
  let endDate = new Date(now);
  
  if (planType.includes('Monthly')) {
    endDate.setMonth(now.getMonth() + 1);
  } else if (planType.includes('Quarterly')) {
    endDate.setMonth(now.getMonth() + 3);
  } else if (planType.includes('Annual')) {
    endDate.setFullYear(now.getFullYear() + 1);
  }
  
  return endDate;
}

module.exports = router;