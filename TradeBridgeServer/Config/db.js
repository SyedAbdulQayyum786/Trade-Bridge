const mongoose = require("mongoose");

const pass = encodeURIComponent("affan116203");
const dbname = "tradebridge";
const uri = `mongodb+srv://qizah03:${pass}@cluster0.pxynyg9.mongodb.net/${dbname}`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});

const db = mongoose.connection;

db.on('error', (e) => {
  console.error("MongoDB connection error:", e);
});

module.exports = mongoose;
