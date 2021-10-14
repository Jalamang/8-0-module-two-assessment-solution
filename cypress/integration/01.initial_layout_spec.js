describe("Initial Layout", () => {
  it("has a header reading Ghibli Review App", () => {
    cy.get("h1:first-of-type").should("have.text", "Ghibli Review App");
  });
  it("has a header containing two children", () => {
    cy.get("header")
      .should("exist")
      .get("header")
      .children()
      .should("have.length", 2);
  });
  it("has a header containing the Ghibli image", () => {
    cy.get("img").should("exist");
    cy.get("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png"
      );
  });
  it("has a select box", () => {
    cy.get("select").should("exist");
  });
  it("has a select box containing the title of each movie", () => {
    cy.get("select > option").should("have.length", 21);
    cy.get("select > option").then((options) => {
      const actual = [...options]
        .map((o) => o.innerText)
        .filter((el) => el !== "");
      const expected = [
        "Castle in the Sky",
        "Grave of the Fireflies",
        "My Neighbor Totoro",
        "Kiki's Delivery Service",
        "Only Yesterday",
        "Porco Rosso",
        "Pom Poko",
        "Whisper of the Heart",
        "Princess Mononoke",
        "My Neighbors the Yamadas",
        "Spirited Away",
        "The Cat Returns",
        "Howl's Moving Castle",
        "Tales from Earthsea",
        "Ponyo",
        "Arrietty",
        "From Up on Poppy Hill",
        "The Wind Rises",
        "The Tale of the Princess Kaguya",
        "When Marnie Was There",
        "The Red Turtle",
      ];
      expect(actual.sort()).to.deep.eq(expected.sort());
    });
  });
  it("has a section with id display-info and no text", () => {
    cy.get("#display-info").should("exist");
    cy.get("#display-info").should(($div) => {
      expect($div.get(0).innerText).to.eq("");
    });
  });

  it("has a form with a text input and a submit input", () => {
    cy.get("form input").then((inputs) => {
      expect([...inputs].map((i) => i.type)).to.have.members([
        "text",
        "submit",
      ]);
    });
  });
  it("has an empty ul", () => {
    cy.get("ul").should("exist");
    cy.get("ul").children().should("have.length", 0);
  });
});
