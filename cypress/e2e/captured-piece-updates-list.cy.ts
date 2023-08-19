/// <reference types="Cypress" />

context('Making an illegal move on the board', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display a notification when player is in check', () => {
    cy.checkIfInitialState();
    cy.makeMove('d2', 'd4');
    cy.makeMove('c7', 'c5');
    cy.makeMove('e2', 'e3');
    cy.makeMove('d8', 'a5');
    cy.makeMove('c2', 'c3');
    cy.makeMove('a5', 'a3');
    cy.makeMove('b2', 'a3');
    cy.get('[data-testid="history-line-0"]')
      .as('topLine')
      .contains('White moved Pawn from B2 to A3, captured Queen');
    cy.makeMove('c5', 'd4');
    cy.get('@topLine').contains(
      'Black moved Pawn from C5 to D4, captured Pawn'
    );
    cy.get('[data-testid="taken-p-w"]').contains('Pawn(s) Lost: 1');
    cy.get('[data-testid="taken-q-b"]').contains('Queen(s) Lost: 1');
  });
});
