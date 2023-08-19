context('Hitting The Reset Button', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should reset the game to normal', () => {
    cy.makeMove('b2', 'b4');
    cy.get('#current-player-banner').should('contain', "Black's Move");
    cy.get('#game-history h3').as('listTitle').contains('Total Moves - 1');
    cy.get('.history-list').find('li').should('have.length', 1);
    cy.get('.player-actions button').click();
    cy.checkIfInitialState();
    cy.checkIfPiecesReset();
  });
});
