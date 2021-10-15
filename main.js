const films = [];
const select = document.querySelector("select");
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((fetchedFilms) => {
    fetchedFilms.forEach((fetchedFilm) => {
      films.push(fetchedFilm);
      const option = document.createElement("option");
      option.value = fetchedFilm.title;
      option.textContent = fetchedFilm.title;
      select.append(option);
    });
  });

// This version removes all children and replaces them.
// It also uses deconstruction.
// select.addEventListener("change", () => {
//   const film = films.find((film) => film.title === select.value);
//   const { release_date, title, description } = film;
//   const heading = document.createElement("h3");
//   const dateParagraph = document.createElement("p");
//   const descriptionParagraph = document.createElement("p");
//   heading.textContent = title;
//   dateParagraph.textContent = release_date;
//   descriptionParagraph.textContent = description;
//   document
//     .querySelector("#display-info")
//     .replaceChildren(heading, dateParagraph, descriptionParagraph);
// });

// This version simply changes the content of the elements put on the page in the HTML.
// It uses fancy _inline_ deconstruction.
select.addEventListener("change", () => {
  const { release_date, title, description } = films.find(
    (film) => film.title === select.value
  );

  document.querySelector("h3").textContent = title;
  document.querySelector("#date").textContent = release_date;
  document.querySelector("#description").textContent = description;
});

document.querySelector("#review").addEventListener("submit", (event) => {
  event.preventDefault();
  const item = document.createElement("li");
  const title = document.createElement("strong");
  title.textContent = select.value + ": ";
  const review = document.createTextNode(event.target.review.value);
  item.append(title, review);
  document.querySelector("ul").append(item);
  event.target.reset();
});
