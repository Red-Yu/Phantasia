const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
// const messageBoardRoutes = require('./routes/messageBoard');
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
// const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());
// app.use('/api/messageBoard', messageBoardRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/signup", signupRoutes);
// app.use('/api/user', userRoutes);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
