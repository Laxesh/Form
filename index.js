const promptTextarea = document.getElementById("promptTextarea");
const submitBtn = document.getElementById("submitBtn");
const promptResponse = document.getElementById("response");

submitBtn.addEventListener("click", async () => {
  try {
    const prompt = promptTextarea.value.trim();
    if (!prompt) throw new Error("invaild Prompt");

    const url = "https://chatgpt-42.p.rapidapi.com/chatgpt";

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "8e49421f3cmshcc8b4197043075ep1183dfjsn9c9a13e5ba43",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        web_access: false,
      }),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    promptResponse.innerHTML = result.result;
  } catch (error) {
    promptResponse.innerHTML = error;
  }
});
