import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const askChatbot = async (req, res) => {

  try {

    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for a home service platform called ServiceHub. Help users with booking services like plumbing, electrician, AC repair, payment issues and account problems."
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
    res.status(500).json({ message: "AI error" });
  }

};