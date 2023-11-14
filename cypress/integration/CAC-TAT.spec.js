/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Eu vou passar na entrevista da ADGROWTH, e vou ser um ótimo QA Engineer!";
    cy.get("#firstName").type("Jonas");
    cy.get("#lastName").type("Victor");
    cy.get("#email").type("jonas.victor@tat.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro quando submeter o formulário com um email inválido", function () {
    cy.get("#firstName").type("Jonas");
    cy.get("#lastName").type("Victor");
    cy.get("#email").type("jonas.victor@tat,,com");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio qundo preenchido com valor não numérico", function () {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Jonas");
    cy.get("#lastName").type("Victor");
    cy.get("#email").type("jonas.victor@tat.com");
    cy.get("#phone-checkbox").check().should("be.checked");
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Jonas")
      .should("have.value", "Jonas")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Victor")
      .should("have.value", "Victor")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("jonas.victor@tat.com")
      .should("have.value", "jonas.victor@tat.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("83999999999")
      .should("have.value", "83999999999")
      .clear()
      .should("have.value", "");
    cy.get("#open-text-area")
      .should("have.value", "")
      .type("Teste")
      .should("have.value", "Teste")
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro quando ao submeter o formulário sem preencher o campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (Youtube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("selecione um produto (Blog) por seu Índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("simpleFile");
    cy.get('input[type="file"]')
      .selectFile("@simpleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});
