const express = require("express");
const app = express();
// const messageBoardRoutes = require('./routes/messageBoard');
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
// const userRoutes = require('./routes/user');

app.use(express.json());
// app.use('/api/messageBoard', messageBoardRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/signup", signupRoutes);
// app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
