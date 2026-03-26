import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const askChatbot = async (req, res) => {
  try {

    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for ServiceHub. Help users with booking services, payments, and account issues."
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

    console.error(error);

    res.status(500).json({
      reply: "AI service temporarily unavailable."
    });

  }
};