const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const names = [];
const buttonsState = {};

function createButton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    const button = document.createElement("button");
    button.textContent = alphabet[char];
    buttonsContainer.appendChild(button);
    button.id = `btn-${alphabet[char]}`;
    button.style = "margin  : 10px";
    buttonsState[char] = false;
  }
}

createButton();

function submitName() {
  const inputName = document.getElementById("name").value.trim();

  if (inputName) {
    names.push(inputName);
  }

  localStorage.setItem("names", JSON.stringify(names));
  inputName.value = "";
}
