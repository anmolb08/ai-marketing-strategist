const express = require("express");

const app = express();
const PORT = 3000;

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

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "llama3.2:3b",
                prompt: prompt,
                stream: false
            })
        });

        const data = await response.json();

        res.json({
            strategy: data.response
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Could not connect to the AI model."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});