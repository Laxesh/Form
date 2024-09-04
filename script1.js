const obj = {};

async function showData() {
  const actorsRes = await fetch("https://swapi.dev/api/people/");
  const actorsData = await actorsRes.json();

  const allFilmsRes = await fetch("https://swapi.dev/api/films/");
  const allFilmsData = await allFilmsRes.json();

  // const vehiclesName = await fetch("https://swapi.dev/api/vehicles/");
  // const vehiclesRes = await vehiclesName.json();

  // for (let v = 1; v < 5; v++) {
  //   const vehiclesName = await fetch(`https://swapi.dev/api/vehicles/?page=${v}`);
  //   const vehiclesRes = await vehiclesName.json();
  // }

  // vehiclesRes.results.forEach((vehicle) => {
  //   obj[vehicle.url] = vehicle.name;
  // });

  allFilmsData.results.forEach((film) => {
    obj[film.url] = film.title;
  });
  // console.log(obj)

  actorsData.results.forEach((actor) => {
    // console.log(actor);
    actor.films = actor.films.map((film) => {
      // console.log(film);
      return obj[film];
    });
  });

  // console.log(res.results);
  // console.log(res);

  const tableData = document.getElementById("data");
  actorsData.results.map((actor) => {
    tableData.innerHTML += `
    <tr>
      <td>${actor.name}</td>
      <td>${actor.gender}</td>
      <td>${actor.films}</td>
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
    // console.log(actor);
    actor.films = actor.films.map((film) => {
      // console.log(film);
      return obj[film];
    });
  });

  nextRes.results.forEach((actor) => {
    document.getElementById("data").innerHTML += `<tr>
        <td>${actor.name}</td>
        <td>${actor.gender}</td>
        <td>${actor.films}</td>
      </tr>
      `;
  });
  showMore.style.display = "inline";

  newPage = nextRes.next;
  if (nextRes.next === null) {
    showMore.style.display = "none";
  }
}
