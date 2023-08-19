/// <reference types="cypress" />

context('Making an illegal move on the board', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should display a notification and not change the state of the game', () => {
    cy.checkIfInitialState();
    cy.makeMove('a8', 'a4');
    cy.get('.Toastify__toast-body')
      .should('be.visible')
      .contains('Invalid Move');
    cy.checkIfInitialState();
  });

  it('should display a notification when player is in check', () => {
    cy.checkIfInitialState();
    cy.makeMove('d2', 'd4');
    cy.makeMove('c7', 'c5');
    cy.makeMove('e2', 'e3');
    cy.makeMove('d8', 'a5');
    cy.get('.Toastify__toast-body').should('be.visible').contains('Check');
  });
});
