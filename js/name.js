const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const names = [];
const buttonsState = {};

function createButton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    const button = document.createElement("button");
    button.textContent = alphabet[char];
    buttonsContainer.appendChild(button);
    button.addEventListener("click", () => {
      clickButton(char);
    });
    button.id = `btn-${alphabet[char]}`;
    button.style = "margin  : 10px";
    buttonsState[char] = false;
  }

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  buttonsContainer.appendChild(allBtn);
  allBtn.id = "btn-all";
  allBtn.style = "margin  : 10px";
}
createButton();

function submitName() {
  const inputName = document.getElementById("name").value.trim();
  if (inputName) {
    names.push(inputName);
    inputName.value = " ";
  }
  localStorage.setItem("names", JSON.stringify(names));

  console.log(names);
  console.log(buttonsState);
}

function handleAllButtonClick() {
  const allButtons = document.querySelectorAll("#buttonsContainer button");
}

function clickButton(char) {
  const button = document.getElementById(`btn-${char}`);
  const results = document.getElementById("results");

  names.forEach((name) => {
    if (name.includes(char)) {
      results.innerHTML += `<p>${name}</p>`;
    }
  });
}

console.log(names);
console.log(buttonsState);
