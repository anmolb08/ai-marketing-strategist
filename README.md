# ✦ AI Marketing Strategist

An AI-powered marketing strategist that turns a simple business description into a practical marketing plan.

## ✨ What it does

Tell the app about your business and it generates:

- 🎯 Target Audience
- 🪻 Campaign Ideas
- ✿ Instagram Content Ideas<img width="947" height="434" alt="Screenshot 2026-09-05 175558" src="https://github.com/user-attachments/assets/824aecce-2387-4156-a295-f596ac5c70a2" />
<img width="947" height="439" alt="Screenshot 2026-09-05 175534" src="https://github.com/user-attachments/assets/32d88d75-ac0f-4025-917e-f9eb5f8362ea" />
<img width="947" height="428" alt="Screenshot 2026-09-05 175454" src="https://github.com/user-attachments/assets/5317b0b5-8357-4ea6-991d-6803bf70ffa8" />

- ♡ Sample Ad Copy
- 🌿 Growth Suggestions

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Ollama
- Llama 3.2

## 🧠 How it works

The user enters a description of their business.

The frontend sends the information to an Express.js backend.

The backend creates a marketing prompt and sends it to a locally running Llama 3.2 model through Ollama.

The AI-generated strategy is then returned to the frontend and displayed as interactive strategy cards.

## 🚀 How to run it locally

### 1. Clone the repository

```bash
git clone https://github.com/anmolb08/ai-marketing-strategist.git
cd ai-marketing-strategist
