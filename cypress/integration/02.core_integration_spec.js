describe("Core interaction", () => {
  it("Select an option to view movie information", () => {
    cy.get("select").select("My Neighbor Totoro");
    cy.contains("My Neighbor Totoro").should("exist");
    cy.contains("1988").should("exist");
    const description =
      "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.";
    cy.contains(description).should("exist");
  });

  it("Enter a review that displays on the page", () => {
    cy.get('form input[type="text"]')
      .type("This movie was great!  I loved the dance to grow the tree.")
      .get('form input[type="submit"]')
      .click();
    cy.get("li").then((items) => {
      const actual = items[0].innerHTML;
      console.log(items);
      const titlePattern =
        /.*(<strong>|<b>)My Neighbor Totoro.+(<\/strong>|<\/b>).*/g;
      const descriptionPattern =
        /This movie was great!  I loved the dance to grow the tree./g;
      expect(actual).to.match(titlePattern);
      expect(actual).to.match(descriptionPattern);
    });
  });
  it("clears the input after form submission", () => {
    cy.get('form input[type="text"]').should("have.value", "");
  });

  it("changes the movie information", () => {
    cy.get("select").select("Kiki's Delivery Service");
    cy.contains("Kiki's Delivery Service").should("exist");
    cy.contains("1989").should("exist");
    cy.contains("1988").should("not.exist");
    const description =
      "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.";
    cy.contains(description).should("exist");
  });

  it("has display-info section include correct count of children", () => {
    cy.get("#display-info").children().should("have.length", 3);
  });

  it("still shows previous reviews", () => {
    cy.get("li").then((items) => {
      const actual = items[0].innerHTML;
      console.log(items);
      const titlePattern =
        /.*(<strong>|<b>)My Neighbor Totoro.+(<\/strong>|<\/b>).*/g;
      const descriptionPattern =
        /This movie was great!  I loved the dance to grow the tree./g;
      expect(actual).to.match(titlePattern);
      expect(actual).to.match(descriptionPattern);
    });
  });
});
