import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import providerRoutes from "./routes/providerRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js";
const app = express();


app.use(cors({
  origin: "http://localhost:5175",  // allow all localhost ports
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// routes

app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/client",clientRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/provider",providerRoutes);
app.use("/api/services", serviceRoutes);

export default app;