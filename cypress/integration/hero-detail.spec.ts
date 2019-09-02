describe("details page", () => {
  beforeEach(() => {
    cy.visit("/detail/11");
    cy.server();
  });

  it(`should edit name`, () => {
    cy.viewport("macbook-15");
    cy.route({
      method: "PUT",
      url: "/api/heroes/11",
      response: {
        id: 11,
        name: "Spider Pig"
      }
    }).as("hero11update");
    // cy.get("input")
    //   .invoke("val")
    //   .then(val => {
    //     expect(val).to.equal("Mr. Nice");
    //   });
    cy.get("input").should("have.value", "Mr. Nice");
    cy.screenshot();
    cy.get("input")
      .clear()
      .type("Spider Pig");
    cy.get("h2").should("contain", "SPIDER PIG");
    cy.contains("save").click();
    cy.wait("@hero11update");
  });
});
