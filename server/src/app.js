import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import providerRoutes from "./routes/providerRoutes.js"
const app = express();


app.use(express.json());
app.use(cors())

app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/client",clientRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/provider",providerRoutes);

export default app;