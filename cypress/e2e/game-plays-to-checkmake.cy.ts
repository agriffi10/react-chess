context('Playing a game to the end', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should display a checkmate end screen', () => {
    cy.get('#current-player-banner')
      .as('banner')
      .should('contain', "White's Move");
    cy.makeMove('f2', 'f3');
    cy.makeMove('e7', 'e5');
    cy.makeMove('g2', 'g4');
    cy.makeMove('d8', 'h4');
    cy.get('#game-over-screen').should('be.visible');
    cy.get('[data-testid="checkmate"]')
      .should('be.visible')
      .contains('Black Wins!');

    cy.get('#game-over-screen button').click();
    cy.checkIfPiecesReset();
    cy.checkIfInitialState();
  });
});
