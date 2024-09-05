const obj = {};

async function showData() {
  const actorsRes = await fetch("https://swapi.dev/api/people/");
  const actorsData = await actorsRes.json();

  const allFilmsRes = await fetch("https://swapi.dev/api/films/");
  const allFilmsData = await allFilmsRes.json();

  const vehiclesRes = await fetch("https://swapi.dev/api/vehicles/");
  const vehiclesData = await vehiclesName.json();

  vehiclesData.results.forEach((vehicles) => {
    obj[vehicles.url] = vehicles.name;
  });

  allFilmsData.results.forEach((film) => {
    obj[film.url] = film.title;
  });

  actorsData.results.forEach((actor) => {
    actor.films = actor.films.map((film) => {
      return obj[film];
    });

    actor.vehicles = actor.vehicles.map((vehicle) => {
      if (obj[vehicle] === undefined) {
        return "Vehicle not found";
      }
      return obj[vehicle];
    });
  });

  const tableData = document.getElementById("data");
  actorsData.results.map((actor) => {
    tableData.innerHTML += `
    <tr>
      <td>${actor.name}</td>
      <td>${actor.gender}</td>
      <td>${actor.films}</td>
      <td>${actor.vehicles}</td>
    </tr>
    `;
  });
}
showData();

let newPage = `https://swapi.dev/api/people/?page=2`;
async function nextPage() {
  const showMore = document.getElementById("next");
  showMore.style.display = "none";

  const nextData = await fetch(newPage);
  const nextRes = await nextData.json();

  nextRes.results.forEach((actor) => {
    actor.films = actor.films.map((film) => {
      return obj[film];
    });

    actor.vehicles = actor.vehicles.map((vehicle) => {
      if (obj[vehicle] === undefined) {
        return "Vehicle not found";
      }
      return obj[vehicle];
    });
  });

  nextRes.results.forEach((actor) => {
    document.getElementById("data").innerHTML += `<tr>
        <td>${actor.name}</td>
        <td>${actor.gender}</td>
        <td>${actor.films}</td>
        <td>${actor.vehicles}</td>
      </tr>
      `;
  });
  showMore.style.display = "inline";

  newPage = nextRes.next;
  if (nextRes.next === null) {
    showMore.style.display = "none";
  }
}
