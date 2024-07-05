const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const moongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const poemRoute = require("./routes/poem");
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

moongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DbConnection Successful"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/poem", poemRoute);

app.listen(5050, () => {
  console.log("Backend Server is running");
});


module.exports = router;
