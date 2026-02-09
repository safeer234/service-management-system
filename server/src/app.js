import express from "express";
import adminRoutes from "./routes/adminRoutes"
import authRoutes from "./routes/authRoutes"
import clientRoutes from "./routes/clientRoutes"
import paymentRoutes from "./routes/paymentRoutes"
import providerRoutes from "./routes/providerRoutes"
const app = express();


app.use(express.json());


app.use("/admin",adminRoutes);
app.use("/auth",authRoutes);
app.use("/client",clientRoutes);
app.use("/payment",paymentRoutes);
app.use("/provider",providerRoutes);

export default app;