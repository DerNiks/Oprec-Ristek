require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const tryoutRoutes = require("./routes/tryoutRoutes");
const swaggerDocs = require("./config/swagger");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
swaggerDocs(app); 

app.use("/api/auth", authRoutes);
app.use("/api/tryouts", tryoutRoutes);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
      swaggerDocs(app);
    });
  })
  .catch((err) => console.log(err));
