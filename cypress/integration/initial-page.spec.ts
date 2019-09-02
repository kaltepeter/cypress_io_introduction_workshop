describe("dashboard", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

  describe("standard data", () => {
    // it(`has title 'Tour of Heroes'`, () => {
    //   cy.contains("Tour of Heroes");
    //   cy.get("h1").should("contain", "Tour of Heroes");
    //   // cy.get(".hero");
    //   // cy.get("h1").then((h1) => {

    //   // });
    //   cy.title().should("eq", "Tour of Heroes");
    // });

    // it(`has page buttons`, () => {
    //   cy.get("nav a").should("have.length", 2);
    //   cy.get("nav a")
    //     .eq(1)
    //     .should("contain", "Heroes");
    //   cy.get("nav a")
    //     .eq(0)
    //     .should("contain", "Dashboard");
    //   cy.contains("Dashboard");
    // });

    // it(`has top heroes header`, () => {
    //   cy.contains("Top Heroes");
    // });

    // it(`has correct search header`, () => {
    //   // cy.contains("Hero Search");
    //   cy.get("app-hero-search h4").should("contain", "Hero Search");
    // });

    it(`has correct basic info`, () => {
      cy.contains("Tour of Heroes");
      cy.title().should("eq", Cypress.env("defaultTitle"));
      cy.title().should("eq", "Tour of Heroes");
      cy.contains("Dashboard");
      cy.get("nav a").as("DashboardLinks");
      cy.get("@DashboardLinks")
        .eq(0)
        .should("contain", "Dashboard");
      cy.get("@DashboardLinks")
        .eq(1)
        .should("contain", "Heroes");
      cy.get("nav a")
        .first()
        .contains("Dashboard");
      cy.get("nav a")
        .last()
        .contains("Heroes");
      cy.contains("Top Heroes");
      cy.contains("Hero Search");
      cy.get("app-hero-search h4").should("contain", "Hero Search");
    });

    it(`can search`, () => {
      cy.get("#search-box").type("Mr. Nice");
      cy.get(".search-result li")
        .contains("Mr. Nice")
        .click();
      cy.url().should("include", "/detail/11");
    });

    it(`can search 2`, () => {
      cy.get("#search-box").type("n");
      cy.get(".search-result li")
        .eq(1)
        .contains("Mr. Nice")
        .as("mrnicenode");

      cy.get(".search-result li")
        .should("have.length", 6)
        .first()
        .contains("Narco");
      cy.get("@mrnicenode").click();
      cy.url().should("include", "/detail/11");
    });

    it(`can search 3`, () => {
      cy.get("#search-box").type("na");
      cy.get(".search-result li").should("have.length", 3);

      cy.get("#search-box").type("{backspace}");
      cy.get(".search-result li")
        .should("have.length", 6)
        .first()
        .contains("Narco");
      cy.get(".search-result li")
        .contains("Mr. Nice")
        .click();
      cy.url().should("include", "/detail/11");
    });
  });

  it("can show one item", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/heroes",
      response: "fixture:singleHero"
    });
    cy.visit("/dashboard");

    cy.get(".module.hero").should("have.length", 1);
  });

  it("can show two items", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/heroes",
      response: "fixture:twoHeroes"
    });
    cy.visit("/dashboard");

    cy.get(".module.hero").should("have.length", 2);
  });
});
