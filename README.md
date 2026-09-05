# ✦ AI Marketing Strategist

An AI-powered marketing strategist that turns a simple business description into a practical marketing plan.

## ✨ What it does

Tell the app about your business and it generates:

- 🎯 Target Audience
- 🪻 Campaign Ideas
- ✿ Instagram Content Ideas
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