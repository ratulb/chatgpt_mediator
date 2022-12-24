import bot from "./assets/robot.webp";
import user from "./assets/person.jpg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  return `id-${Date.now()}-${Math.random().toString(16)}`;
}

function chatStripe(isAlchemist, value, uniqueId) {
  return `
      <div class="wrapper ${isAlchemist && "ai"}">
        <div class="chat">
          <div class="profile">
          <img src="${isAlchemist ? bot : user}"  
          alt="${isAlchemist ? "bot" : "user"}"/>
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div

    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  //User's query
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
  form.reset();
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  chatContainer.scrollTop += chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
  try {
    const response = await fetch("https://chatgptmediator.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.get("prompt"),
      }),
    });
    clearInterval(loadInterval);
    messageDiv.innerHTML = "";
    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim();
      typeText(messageDiv, parsedData);
    } else {
      try {
        const err = await response.text();
        console.log(err);
        alert(
          "Communication failure due to heavy traffic! Please try after a moment!"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Communication failure due to heavy traffic! Please try after a moment!!"
        );
      }
    }
  } catch (accessError) {
    console.log(accessError);
    alert(
      "Communication failure due to heavy traffic! Please try after a moment!!!"
    );
  }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleSubmit(e);
  }
});
