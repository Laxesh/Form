const obj = {};

async function showData() {
  const data = await fetch("https://swapi.dev/api/people/");
  const res = await data.json();
  // console.log(res);

  const filmName = await fetch("https://swapi.dev/api/films/");
  const filmRes = await filmName.json();
  // console.log(filmRes);

  filmRes.results.forEach((film) => {
    obj[film.url] = film.title;
  });
  // console.log(obj)

  res.results.forEach((actor) => {
    // console.log(actor);
    actor.films = actor.films.map((film) => {
      // console.log(film);
      return obj[film];
    });
  });

  // console.log(res.results);
  // console.log(res);

  const tableData = document.getElementById("data");
  res.results.map((actor) => {
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

let sum = 1;
async function nextPage() {
  const showMore = document.getElementById("next");
  showMore.style.display = "none";
  sum++;

  const nextData = await fetch(`https://swapi.dev/api/people/?page=${sum}`);
  const nextRes = await nextData.json();
  // console.log(nextRes);

  nextRes.results.forEach((actor) => {
    // console.log(actor);
    actor.films = actor.films.map((film) => {
      // console.log(film);
      return obj[film];
    });
  });

  if (nextRes.next === null) {
    showMore.style.display = "none";
  }

  nextRes.results.forEach((actor) => {
    document.getElementById("data").innerHTML += `<tr>
        <td>${actor.name}</td>
        <td>${actor.gender}</td>
        <td>${actor.films}</td>
      </tr>
      `;
  });
  showMore.style.display = "inline";
}
