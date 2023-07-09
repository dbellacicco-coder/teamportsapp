import express from "express";
import connectionDB from "./config/db.js";
import userRoutes from "./routes/api/userRoutes.js";

const app = express();

//CONNECT TO DATABASE
connectionDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Routing

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
