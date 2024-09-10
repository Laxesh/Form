let sum = 0;
const firstName = document.querySelector("#FirstName");
const showName = document.querySelector("#name");

function submit() {
  sum++;

  const arr = [];
  arr.push(firstName.value);
  console.log(arr);

  showName.insertAdjacentHTML(
    "beforeend",
    `
        <p id="inputName${sum}">${sum} . ${firstName.value}</p>
    `
  );
}

async function displayData() {
  const data = await fetch("https://swapi.dev/api/people/");
  const res = await data.json();
  console.log(res);
}

displayData();
