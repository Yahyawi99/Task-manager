require("dotenv").config();

const express = require("express");
const app = express();

const { notFound } = require("./middlewares");

// Routes
const TaskRoutes = require("./routes/taskRoutes");

// client
app.use(express.static("./public"));

// middlewares
app.use(express.json());

// db
const connectDB = require("./db/connect");

// ***************************
app.use("/api/v1/tasks", TaskRoutes);

app.use(notFound);

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
