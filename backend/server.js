const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

const allowedOrigins = [
  "https://task-manager-app-nu-orpin.vercel.app/",
  `http://localhost:${process.env.FRONTEND_PORT || 5173}`,
  `http://localhost:${process.env.PORT || 5000}`
];


const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   if (req.path.startsWith("/api")) {
//     return res.status(404).send("API route not found");
//   }
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on :", `http://localhost:${PORT}`);
});
