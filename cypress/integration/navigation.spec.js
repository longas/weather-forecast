/// <reference types="cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Open city's weather forecast page", () => {
    cy.get("[data-cy=city]:first").click();
    cy.location("pathname").should("include", "city");
  });

  it("Open cities' info page", () => {
    cy.get("[data-cy=city]:first").click();
    cy.get("[data-cy=info]").click();
    cy.location("pathname").should("include", "info");
  });

  it("Show hourly forecast of a day", () => {
    cy.get("[data-cy=city]:first").click();
    cy.get("[data-cy=day-forecast]:first").click();
    cy.get("[data-cy=hourly-forecast]").should("exist");
  });
});
