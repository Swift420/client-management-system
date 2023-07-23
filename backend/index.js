const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/clientRoute");
const contactrouter = require("./routes/contactRoute");
dotenv.config();
const cors = require("cors");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/client", router);
app.use("/api/contact", contactrouter);
// app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to the Database"))
  .catch((e) => console.log(e));

app.listen("5000", () => {
  console.log("Backend is running");
});
