import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChessBoardWrapper from './chessboard-wrapper';

describe('Chess Board Wrapper', () => {
  describe('Given that I have loaded the chess app, when I first start the game, then the game is in a default state', () => {
    test('Everything loads without crashing', () => {
      // Chessboard currently generates a warning because the library is now using deprecated properties
      render(<ChessBoardWrapper />);
      expect(screen.getByText('Total Moves - 0')).toBeInTheDocument();
      expect(screen.getByText("White's Move")).toBeInTheDocument();
      expect(screen.getAllByTestId('white-square').length >= 1).toBe(true);
      expect(screen.getAllByTestId('black-square').length >= 1).toBe(true);
    });
  });
});
