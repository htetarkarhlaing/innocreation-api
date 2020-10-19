//instances
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

//dotenv
require('dotenv').config();

//mongodb setup
const dbUrl = process.env.DB;

mongoose.connect( dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected');
}).catch((err)=>{
  console.log(err);
});

//custom importing
const routes = require("./routes/routes");

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views'))

//routes
app.get("/", (req, res) => {
    res.sendFile('index.html');
  })
app.use("/api", routes);

//server process
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`)
})