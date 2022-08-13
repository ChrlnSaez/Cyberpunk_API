const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./src/routes/userRoutes");

(async () => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // For development use local mongodb instance instead of Atlas
  await mongoose.connect("mongodb://localhost:27017/cyberpunk");
  console.log("MongoDB Connected");

  app.use("/api/users", userRoutes);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
