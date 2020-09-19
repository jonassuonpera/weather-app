describe("weather-widget", () => {
  // before(() => {
  //   cy.visit("http://localhost:3000/?city=copenhagen");
  // });
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("validates the default state of UI", () => {
    cy.get("[data-cy=widget-title]").contains("Copenhagen");
    cy.get("[data-cy=widget-error]").should("not.exist");
    cy.get("[data-cy=widget-humidity]").should("have.not.value", "");
    cy.get("[data-cy=widget-wind]").should("have.not.value", "");
  });

  it("fetches new weather data", () => {
    cy.get("[data-cy=widget-input]").clear().type("vordingborg");
    cy.get("[data-cy=widget-button]").click();
    cy.get("[data-cy=widget-title]").contains("Vordingborg");
    cy.get("[data-cy=widget-error]").should("not.exist");
  });

  it("recieves error from weather API", () => {
    cy.get("[data-cy=widget-input]").clear().type("Copenhagn").type("{enter}");
    cy.get("[data-cy=widget-error]").should("exist");
  });

  it("validates the default state of UI with params set", () => {
    cy.visit("http://localhost:3000/?city=vordingborg");
    cy.get("[data-cy=widget-title]").contains("Vordingborg");
    cy.get("[data-cy=widget-error]").should("not.exist");
    cy.get("[data-cy=widget-humidity]").should("have.not.value", "");
    cy.get("[data-cy=widget-wind]").should("have.not.value", "");
  });
});
