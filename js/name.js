const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const names = [];
const buttonsState = {};

document.addEventListener("DOMContentLoaded", () => {
  // Create alphabet buttons
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (let char of alphabet) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "m-1");
    button.textContent = char;
    button.id = `btn-${char}`;
    button.addEventListener("click", () => handleAlphabetButtonClick(char));
    buttonsContainer.appendChild(button);
    buttonsState[char] = false;
  }

  // Create "ALL" button
  const allButton = document.createElement("button");
  allButton.textContent = "ALL";
  allButton.classList.add("btn", "btn-primary", "m-1");
  allButton.addEventListener("click", () => handleAllButtonClick());
  buttonsContainer.appendChild(allButton);
});

function submitName() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();
  if (name) {
    names.push(name);
    updateButtonsState();
    nameInput.value = "";
  }
}

function updateButtonsState() {
  const allButtons = document.querySelectorAll("#buttonsContainer button");
  // Reset all button states
  allButtons.forEach((button) => {
    button.classList.remove("highlight");
    button.classList.remove("disabled");
  });

  // Update buttons state based on submitted names
  const startingLetters = new Set(names.map((name) => name[0].toUpperCase()));
  for (let char of alphabet) {
    const button = document.getElementById(`btn-${char}`);
    if (startingLetters.has(char)) {
      button.disabled = false;
    } else {
      button.disabled = true;
      button.classList.add("disabled");
    }
  }
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

  displayNames();
}

function handleAllButtonClick() {
  const allButtons = document.querySelectorAll("#buttonsContainer button");
  allButtons.forEach((button) => {
    button.classList.remove("highlight");
  });

  // Clear all selections
  for (let char of alphabet) {
    buttonsState[char] = false;
  }

  displayNames();
}

function displayNames() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  // Collect names to display based on the buttons clicked
  const displayList = [];
  for (let char of alphabet) {
    if (buttonsState[char]) {
      const namesForChar = names.filter((name) => name[0].toUpperCase() === char);
      displayList.push(...namesForChar);
    }
  }

  if (buttonsState["ALL"]) {
    displayList.push(...names);
  }

  // Display names
  displayList.forEach((name) => {
    const p = document.createElement("p");
    p.textContent = name;
    resultsDiv.appendChild(p);
  });
}
