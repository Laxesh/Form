const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const names = [];
const buttonsState = {};

const namesStartWithFirstCharacters = {};

function createButton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    const button = document.createElement("button");
    button.textContent = alphabet[char];
    buttonsContainer.appendChild(button);
    button.id = `btn-${alphabet[char]}`;
    button.style = "margin  : 10px";
  }
}

createButton();

function submitName() {
  const name = document.getElementById("name").value;

  if(!name.trim()) throw new Error("Please enter a name!!!");

  const firstCharacter = name[0]; // getting the first character of the name

  if(!(firstCharacter in namesStartWithFirstCharacters)) {
    namesStartWithFirstCharacters[firstCharacter] = [name];
  }else{
    namesStartWithFirstCharacters[firstCharacter].push(name);
  }

  document.getElementById(`btn-${alphabet[char]}`).innerText = `${firstCharacter} (${namesStartWithFirstCharacters[firstCharacter].length})`;

  names.push(name);
  localStorage.setItem("names", JSON.stringify(names));
}