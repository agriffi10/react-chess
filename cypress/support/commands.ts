/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      makeMove(startingSquare: string, endingSquare: string): Chainable<void>;
      getPiece(pieceName: string): Chainable<void>;
      checkIfPiecesReset(): Chainable<void>;
      checkIfInitialState(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('makeMove', (startingSquare, endingSquare) => {
  cy.get(`div[data-squareid="${startingSquare}"]`).click();
  cy.get(`div[data-squareid="${endingSquare}"]`).click();
});

Cypress.Commands.add('getPiece', (pieceName) => {
  cy.get(`div[data-testid="${pieceName}"]`);
});

Cypress.Commands.add('checkIfPiecesReset', () => {
  // Just checking for pawns here
  // the testid for each piece gets changed based on current square
  // these are all the pawn starting squares
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let i = 0; i < letters.length; i++) {
    cy.getPiece(`wP-${letters[i]}2`).should('be.visible');
    cy.getPiece(`bP-${letters[i]}7`).should('be.visible');
  }
});
Cypress.Commands.add('checkIfInitialState', () => {
  cy.get('#current-player-banner').should('contain', "White's Move");
  cy.get('.history-list').find('li').should('have.length', 0);
  cy.get('#game-history h3').as('listTitle').contains('Total Moves - 0');
});
