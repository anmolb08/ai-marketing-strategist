require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

app.post("/generate", async (req, res) => {

    const business = req.body.business;

    const prompt = `
You are a creative, practical marketing strategist.

Analyze this business:

${business}

Create a concise but genuinely useful marketing strategy.

Return ONLY the following format:

TARGET AUDIENCE:
Write 2-3 sentences describing the ideal customer.

CAMPAIGN IDEA:
Give the campaign a memorable name and explain the concept in 2-3 sentences.

CONTENT IDEAS:
Give exactly 3 specific Instagram content ideas. Number them 1, 2, 3.

SAMPLE AD COPY:
Write one short Instagram ad/caption.

GROWTH SUGGESTIONS:
Give exactly 3 practical growth suggestions. Number them 1, 2, 3.

Keep the tone creative, modern and specific to the business.
Do not add any other sections.
`;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },

                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(data);

            return res.status(500).json({
                error: "AI service error."
            });
        }

        res.json({
            strategy: data.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Could not connect to the AI model."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});