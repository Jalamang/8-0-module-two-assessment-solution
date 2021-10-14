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
      document.querySelector("select").append(option);
    });
  });

select.addEventListener("change", () => {
  if (select.value === "default") {
    return;
  }

  const film = films.find((film) => film.title === select.value);
  const { release_date, title, description } = film;
  const heading = document.createElement("h3");
  const dateParagraph = document.createElement("p");
  const descriptionParagraph = document.createElement("p");
  heading.textContent = title;
  dateParagraph.textContent = release_date;
  descriptionParagraph.textContent = description;
  document
    .querySelector("#display-info")
    .replaceChildren(heading, dateParagraph, descriptionParagraph);
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const item = document.createElement("li");
  const titleElement = document.createElement("strong");
  const film = films.find((film) => film.title === select.value);
  titleElement.textContent = film.title + ": ";
  const reviewElement = document.createTextNode(event.target.review.value);
  item.append(titleElement, reviewElement);
  document.querySelector("ul").append(item);
  event.target.reset();
});
