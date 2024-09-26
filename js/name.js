const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let namesStartWithFirstCharacters = {}; // Object to store all the names that start with each first character

/**
 * Retrieves a value from localStorage. If the value does not exist, an empty
 * object is returned.
 *
 * @param {string} key - The key of the value to retrieve
 * @returns {Object} The value associated with the key, or an empty object
 */
const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Stores a value in localStorage
 *
 * @param {string} key - The key of the value to store
 * @param {Object} value - The value to store
 */
const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}


/**
 * Creates a button for each letter of the alphabet and adds it to the HTML
 * element with the id "buttonsContainer". The button is assigned an id of
 * the form "btn-<letter>" and an event listener is added to call the
 * function displayNamesStartWithChar() when clicked, passing in the letter
 * as an argument. The button is also given the letter as its text content.
 * Additionally, the array for that letter is initialized to an empty array
 * in the object namesStartWithFirstCharacters.
 */
function createButton() {
  const buttonsContainer = document.getElementById("buttonsContainer");
  for (const char in alphabet) {
    buttonsContainer.innerHTML = buttonsContainer.innerHTML + `<button onclick="displayNamesStartWithChar('${alphabet[char]}')" id=${`btn-${alphabet[char]}`} style="margin: 10px;" >${alphabet[char]}</button>`;

    namesStartWithFirstCharacters[alphabet[char]] = [];
  }
  buttonsContainer.innerHTML = buttonsContainer.innerHTML + `<button onclick="displayNamesStartWithChar('All')" id="btn-All" style="margin: 10px;" >All</button>`;

}

/**
 * Retrieves the name from the input field and stores it in the object
 * `namesStartWithFirstCharacters` along with the first character of the name.
 * The function also updates the text of the button with the same first
 * character and stores the updated object in localStorage.
 * If the user does not enter a name, an error is thrown.
 *
 * @throws {Error} if the name is empty
 */
function submitName() {
  const name = document.getElementById("name").value;

  if(!name.trim()) throw new Error("Please enter a name!!!");

  const nameInUpperCase = name.toUpperCase(); // convert name to uppercase
  const firstCharacter = nameInUpperCase[0]; // getting the first character of the name

  /*
    {
      A: [A1, A2, ...],
      B: [B1, B2, B3, ...],

      ....
    }
  */

  namesStartWithFirstCharacters[firstCharacter].push(name);

  document.getElementById(`btn-${firstCharacter}`).innerText = `${firstCharacter} (${namesStartWithFirstCharacters[firstCharacter].length})`;

  setToLocalStorage("namesStartWithFirstCharacters", namesStartWithFirstCharacters);
}

/**
 * This function takes a character as an argument and displays all the names
 * in the "namesStartWithFirstCharacters" object which start with the given
 * character. If the character is 'All', then it displays all the names in the
 * object. The function updates the "results" div with the list of names.
 *
 * @param {string} character The character to search for
 */
const displayNamesStartWithChar = (character) => {
  let listOfAllNameStartWithCharacter = "<ul>";

  let names = [];
  if(character === 'All'){
    names = Object.values(namesStartWithFirstCharacters).flat();
  }else{
    names = namesStartWithFirstCharacters[character];
  }

  names.forEach((name) => {
    listOfAllNameStartWithCharacter += `<li>${name}</li>`;
  });

  listOfAllNameStartWithCharacter += "</ul>";

  document.getElementById("results").innerHTML = listOfAllNameStartWithCharacter;
}



/**
 * Runs when the page has finished loading. The function creates the buttons
 * for each letter of the alphabet and the string "All" and appends them to
 * the element with the id "buttonsContainer". It also retrieves the list of
 * names from the local storage and assigns it to the namesStartWithFirstCharacters
 * object.
 */
window.onload = () => {
  namesStartWithFirstCharacters = getFromLocalStorage("namesStartWithFirstCharacters") || {};
  createButton();
}

console.log(names);
console.log(buttonsState);
