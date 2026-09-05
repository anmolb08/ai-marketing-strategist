const input = document.getElementById("businessInput");
const button = document.getElementById("generateBtn");
const result = document.getElementById("result");

button.addEventListener("click", async function () {

    const business = input.value;

    if (business.trim() === "") {
        result.innerHTML = "<p>Please tell me about your business first ✦</p>";
        return;
    }

    result.innerHTML = `
        <div class="loading">
            ✦ Creating your strategy...
        </div>
    `;

    try {

        const response = await fetch("/generate", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                business: business
            })
        });

        const data = await response.json();

        if (data.error) {
            result.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        const text = data.strategy;

        const targetAudience = extractSection(
            text,
            "TARGET AUDIENCE:",
            "CAMPAIGN IDEA:"
        );

        const campaign = extractSection(
            text,
            "CAMPAIGN IDEA:",
            "CONTENT IDEAS:"
        );

        const content = extractSection(
            text,
            "CONTENT IDEAS:",
            "SAMPLE AD COPY:"
        );

        const adCopy = extractSection(
            text,
            "SAMPLE AD COPY:",
            "GROWTH SUGGESTIONS:"
        );

        const growth = extractSection(
            text,
            "GROWTH SUGGESTIONS:",
            null
        );

        result.innerHTML = `

            <div class="result-heading">
                <span>✦</span>
                <h2>Your strategy is ready</h2>
                <span>✦</span>
            </div>

            <div class="strategy-grid">

                <div class="strategy-card lavender">
                    <div class="card-icon">🌙</div>
                    <div class="card-label">YOUR AUDIENCE</div>
                    <div class="card-content">
                        ${formatText(targetAudience)}
                    </div>
                </div>

                <div class="strategy-card sage">
                    <div class="card-icon">🪻</div>
                    <div class="card-label">BIG CAMPAIGN IDEA</div>
                    <div class="card-content">
                        ${formatText(campaign)}
                    </div>
                </div>

                <div class="strategy-card cream">
                    <div class="card-icon">✿</div>
                    <div class="card-label">CONTENT TO TRY</div>
                    <div class="card-content">
                        ${formatList(content)}
                    </div>
                </div>

                <div class="strategy-card blush">
                    <div class="card-icon">♡</div>
                    <div class="card-label">SAMPLE AD COPY</div>
                    <div class="card-content ad-copy">
                        ${formatText(adCopy)}
                    </div>
                </div>

                <div class="strategy-card lavender full-width">
                    <div class="card-icon">🌿</div>
                    <div class="card-label">GROWTH SUGGESTIONS</div>
                    <div class="card-content">
                        ${formatList(growth)}
                    </div>
                </div>

            </div>

            <button class="copy-button" onclick="copyStrategy()">
                ♡ Copy my strategy
            </button>
        `;

        window.currentStrategy = text;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p>
                Something went wrong ✦
                Make sure your server and Ollama are running.
            </p>
        `;
    }
});


function extractSection(text, start, end) {

    const startIndex = text.indexOf(start);

    if (startIndex === -1) {
        return "No response generated.";
    }

    const contentStart = startIndex + start.length;

    const endIndex = end
        ? text.indexOf(end, contentStart)
        : text.length;

    return text
        .substring(
            contentStart,
            endIndex === -1 ? text.length : endIndex
        )
        .trim();
}


function formatText(text) {

    return text
        .replace(/\n/g, "<br>")
        .trim();
}


function formatList(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    return lines.map((line, index) => {

        const cleaned = line.replace(/^\d+[\.\)]\s*/, "");

        return `
            <div class="list-item">
                <span>0${index + 1}</span>
                <p>${cleaned}</p>
            </div>
        `;

    }).join("");
}


function copyStrategy() {

    navigator.clipboard.writeText(window.currentStrategy);

    const button = document.querySelector(".copy-button");

    button.innerText = "✓ Copied!";

    setTimeout(() => {
        button.innerText = "♡ Copy my strategy";
    }, 2000);
}