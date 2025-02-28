const express = require("express");
const router = express.Router();
const { auth } = require("../connections/firebase_admin_connect");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    await auth.createUser({
      email,
      password,
    });
    res.send("註冊成功");
  } catch (why) {
    res.status(400).send(`註冊失敗: ${why.message}`);
  }
});
module.exports = router;
