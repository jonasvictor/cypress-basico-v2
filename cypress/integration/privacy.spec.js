it("testa a página da política de privacidade de forna independente", function () {
  cy.visit("./src/privacy.html");

  cy.contains("Talking About Testing").should("be.visible");
});
