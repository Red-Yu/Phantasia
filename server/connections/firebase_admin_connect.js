var admin = require("firebase-admin");

var serviceAccount = require("../phantasia-841b4-firebase-adminsdk-fbsvc-313a484cc2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phantasia-841b4-default-rtdb.firebaseio.com",
});

const db = admin.database();
const auth = admin.auth();

module.exports = { db, auth };
