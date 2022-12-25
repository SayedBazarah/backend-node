//Express
const express = require("express");
const app = express();

//Essential Middle Wares & Enviroment
var cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Database Connection Setup
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL, {
    // Recovery
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("Error in DB Connectin" + err));

//Routes
const UserRoute = require("./route/userRoute");

app.use("/api/user", UserRoute);

//PORT
const PORT = process.env.PORT || 3009;

//Server RUNNING
app.listen(PORT, () =>
  console.log(`Server run on PORT http://localhost:${PORT}`)
);
