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

    // =========================
    // 1. GET SERVICES FROM DB
    // =========================
    const services = await Service.find({ isActive: true });

    // =========================
    // 2. AI INTENT DETECTION
    // =========================
    const intentResponse = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
Extract user intent and return ONLY JSON:

{
  "action": "book | cancel | query",
  "service": "service name or null"
}
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    let intent;

    try {
      intent = JSON.parse(intentResponse.choices[0].message.content);
    } catch {
      intent = { action: "query", service: null };
    }

    console.log("AI INTENT:", intent);

    // =========================
    // 3. BOOK SERVICE
    // =========================
    if (intent.action === "book") {

      if (!intent.service) {
        return res.json({
          reply: "❓ Which service do you want to book?"
        });
      }

      const service = await Service.findOne({
        name: { $regex: intent.service, $options: "i" }
      });

      if (!service) {
        return res.json({
          reply: "❌ Service not found. Try like: cleaning, plumbing, AC repair."
        });
      }

      const newRequest = await ServiceRequests.create({
        client: userId,
        category: service.category,
        serviceType: service.name,
        serviceAddress: "Default Address",
        preferredDate: new Date(),
        estimatedPrice: service.price,
        description: "Booked via AI chatbot"
      });

      return res.json({
        reply: `✅ ${service.name} booked successfully!`
      });
    }

    // =========================
    // 4. CANCEL SERVICE
    // =========================
    if (intent.action === "cancel") {

      const request = await ServiceRequests.findOne({
        client: userId,
        status: "pending"
      });

      if (!request) {
        return res.json({
          reply: "❌ No active booking found"
        });
      }

      request.status = "cancelled";
      await request.save();

      return res.json({
        reply: "✅ Your booking has been cancelled"
      });
    }

    // =========================
    // 5. AI RESPONSE (SMART Q&A)
    // =========================
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant for ServiceHub.

Platform:
- Service booking system
- Payment via Razorpay
- Invoice via email

Available services:
${services.map(s => `${s.name} - ₹${s.price}`).join("\n")}

Rules:
- Answer clearly
- Use real services
- Help users navigate website
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      reply: "AI service temporarily unavailable."
    });
  }
};