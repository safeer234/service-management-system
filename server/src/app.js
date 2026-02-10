import express from "express";
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import providerRoutes from "./routes/providerRoutes.js"
const app = express();


app.use(express.json());


app.use("/admin",adminRoutes);
app.use("/auth",authRoutes);
app.use("/client",clientRoutes);
app.use("/payment",paymentRoutes);
app.use("/provider",providerRoutes);

export default app;