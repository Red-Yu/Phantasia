const express = require("express");
const router = express.Router();
const { auth } = require("../connections/firebase_admin_connect");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    res.send("登入成功");
  } catch (why) {
    res.status(401).send(`登入失敗: 電子郵件或密碼錯誤`);
  }
});
module.exports = router;
