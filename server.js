require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const router = require("./routes/index");

const port = process.env.PORT || 3000;

// Connect to database
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
