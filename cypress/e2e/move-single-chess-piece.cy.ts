/// <reference types="cypress" />

context('Moving one piece on the board', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should update the history and player banner', () => {
    cy.get('#current-player-banner')
      .as('banner')
      .should('contain', "White's Move");
    cy.makeMove('b2', 'b4');
    cy.get('@banner').should('contain', "Black's Move");
    cy.get('#game-history h3').contains('Total Moves - 1');
    cy.get('.history-list').find('li').should('have.length', 1);
  });
});
