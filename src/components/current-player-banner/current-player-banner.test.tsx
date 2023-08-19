import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrentPlayerBanner from './current-player-banner';

describe('Current Player Banner', () => {
  describe('Given I am playing a game of chess, when a move is made, then the banner updates with the appropriate player’s turn', () => {
    test("Player White's turn", () => {
      render(<CurrentPlayerBanner currentPlayer="White" />);
      const element = screen.getByTestId('player-banner');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("White's Move");
    });
    test("Player Black's turn", () => {
      render(<CurrentPlayerBanner currentPlayer="Black" />);
      const element = screen.getByTestId('player-banner');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Black's Move");
    });
  });
});
