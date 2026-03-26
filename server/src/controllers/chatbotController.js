import Groq from "groq-sdk";
import Service from "../models/Service.js";
import ServiceRequests from "../models/ServiceRequests.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const lowerMsg = message.toLowerCase();

    // 🔥 STEP 1: Fetch services
    const services = await Service.find({ isActive: true }).limit(10);

    // =========================================
    // ✅ STEP 2: BOOK SERVICE
    // =========================================
    if (lowerMsg.includes("book")) {

      const service = await Service.findOne({
        name: { $regex: message, $options: "i" }
      });

      if (!service) {
        return res.json({
          reply: "❌ Service not found. Please specify a valid service."
        });
      }

      const newRequest = await ServiceRequests.create({
        client: userId,
        category: service.category,
        serviceType: service.name,
        serviceAddress: "Default Address (Update Later)",
        preferredDate: new Date(),
        estimatedPrice: service.price,
        description: "Booked via AI chatbot"
      });

      return res.json({
        reply: `✅ ${service.name} booked successfully!\nBooking ID: ${newRequest._id}`
      });
    }

    // =========================================
    // ❌ STEP 3: CANCEL SERVICE
    // =========================================
    if (lowerMsg.includes("cancel")) {

      const request = await ServiceRequests.findOne({
        client: userId,
        status: "pending"
      });

      if (!request) {
        return res.json({
          reply: "❌ No active booking found to cancel."
        });
      }

      request.status = "cancelled";
      await request.save();

      return res.json({
        reply: "✅ Your booking has been cancelled successfully."
      });
    }

    // =========================================
    // 📋 STEP 4: SHOW SERVICES
    // =========================================
    if (lowerMsg.includes("services") || lowerMsg.includes("available")) {

      const serviceList = services
        .map((s, i) => `${i + 1}. ${s.name} - ₹${s.price}`)
        .join("\n");

      return res.json({
        reply: `📋 Available Services:\n${serviceList}`
      });
    }

    // =========================================
    // 🤖 STEP 5: AI RESPONSE (FALLBACK)
    // =========================================
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant for ServiceHub.

Available services:
${services.map(s => `${s.name} - ₹${s.price}`).join("\n")}

You can:
- Help users book services
- Help users cancel services
- Answer questions about services
- Be short and clear
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Chatbot Error:", error);

    return res.status(500).json({
      reply: "⚠️ AI service temporarily unavailable."
    });
  }
};