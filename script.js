async function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value;

  if (!text) return;

  addMessage("user", text);
  input.value = "";

  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();

  addMessage("bot", data.reply);
}

function addMessage(type, text) {
  const chat = document.getElementById("chat-box");
  const div = document.createElement("div");

  div.classList.add("message", type);
  div.innerText = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
