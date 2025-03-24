const express = require("express");
const cors = require("cors");
const app = express();
// const messageBoardRoutes = require('./routes/messageBoard');
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
// const userRoutes = require('./routes/user');

// 配置 CORS，明確指定允許的來源
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // 允許的來源，包括 Vite 的預設端口
  credentials: true
}));

// 解析 JSON 請求體
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 解析表單提交

// 設定路由
// app.use('/api/messageBoard', messageBoardRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/signup", signupRoutes);
// app.use('/api/user', userRoutes);

// 綠界支付路由 - 修改為 /api/ecpay
const ecpayRoutes = require('./routes/ecpay');
app.use('/api/ecpay', ecpayRoutes);

// 靜態檔案服務（如果需要）
// app.use(express.static('public'));

// 簡單的首頁路由
app.get('/', (req, res) => {
  res.send('Phantasia API Server');
});

// 指定伺服器監聽的端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 在 server.js 中添加這個路由
app.get('/MemberCenter/SubscriptionStatus', (req, res) => {
  // 重定向到前端頁面
  res.redirect('http://localhost:5173/tid201/g1/MemberCenter/SubscriptionStatus?success=true');
});