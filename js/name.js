const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const names = [];
const buttonsState = {};

function createbutton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    const button = document.createElement("button");
    button.textContent = alphabet[char];
    buttonsContainer.appendChild(button);
    button.id = `btn-${char}`;
    button.style = "margin  : 10px";
    button.addEventListener("click", () => handleAlphabetButtonClick(char));
  }
}
createbutton();

function submitName() {
  const name = document.getElementById("name").value;

  names.push(name);
  localStorage.setItem("names", JSON.stringify(names));
}

function handleAlphabetButtonClick(char) {
  const button = document.getElementById(`btn-${char}`);
  const isActive = button.classList.contains("highlight");

  // Toggle button state
  if (isActive) {
    button.classList.remove("highlight");
    buttonsState[char] = false;
  } else {
    button.classList.add("highlight");
    buttonsState[char] = true;
  }
}
