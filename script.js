const apiUrl = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large";
const apiKey = "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"; // Replace with your API key

document.getElementById("generateBtn").addEventListener("click", () => {
    const textInput = document.getElementById("textInput").value;
    const loadingMessage = document.getElementById("loadingMessage");
    const outputImage = document.getElementById("outputImage");

    if (!textInput.trim()) {
        alert("Please enter a description!");
        return;
    }

    loadingMessage.style.display = "block";
    outputImage.style.display = "none";

    fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: textInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error in API response");
        }
        return response.blob();
    })
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        outputImage.src = imageUrl;
        outputImage.style.display = "block";
        loadingMessage.style.display = "none";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to generate image. Please try again!");
        loadingMessage.style.display = "none";
    });
});
