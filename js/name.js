const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let names = [];
const buttonsState = {};

function createButton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    const button = document.createElement("button");
    button.textContent = alphabet[char];
    buttonsContainer.appendChild(button);
    button.addEventListener("click", () => {
      clickButton("char");
    });
    button.id = `${alphabet[char]}`;
    button.style = "margin  : 10px";
    buttonsState[alphabet[char]] = [];
  }

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  buttonsContainer.appendChild(allBtn);
  allBtn.id = "btn-all";
  allBtn.style = "margin  : 10px";
  allBtn.addEventListener("click", () => {
    clickButton("all");
  });
}
createButton();

function submitName() {
  const inputName = document.getElementById("name").value.trim();

  const uparCase = inputName.toUpperCase();

  const firstchar = uparCase[0];

  buttonsState[firstchar].push(inputName);

  document.getElementById(`${firstchar}`).innerText = `${firstchar} (${buttonsState[firstchar].length})`;

  inputName.value = "";
}

function clickButton(char) {
  const results = document.getElementById("results");
  console.log(buttonsState);

  if (char == "all") {
    results.innerHTML = "";
    names = Object.values(buttonsState).flat();
  } else {
    results.innerHTML = "";
    names = buttonsState[char];
    console.log("g", names);
  }
  console.log(names);
  names.forEach((name) => {
    results.innerHTML += `<li>${name}</li>`;
  });
}
