require("dotenv").config();

const express = require("express");
const app = express();

// db
const connectDB = require("./db/connect");

// Start
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`App listening on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
