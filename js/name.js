const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const names = [];
const buttonsState = {};

function createButton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    const button = document.createElement("button");
    button.textContent = alphabet[char];
    buttonsContainer.appendChild(button);
    button.id = `btn-${char}`;
    button.style = "margin  : 10px";
  }
}
createButton();

function submitName() {
  const name = document.getElementById("name").value;

  names.push(name);
  localStorage.setItem("names", JSON.stringify(names));
}
