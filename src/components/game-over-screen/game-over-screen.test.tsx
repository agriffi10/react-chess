import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameOverScreen from './game-over-screen';

const renderGameOverScreen = (
  isDraw: boolean,
  isCheckmate: boolean,
  isThreefoldRepetition: boolean,
  isStalemate: boolean,
  currentPlayer: string
) =>
  render(
    <GameOverScreen
      isDraw={isDraw}
      isThreefoldRepetition={isThreefoldRepetition}
      isCheckmate={isCheckmate}
      currentPlayer={currentPlayer}
      resetGame={jest.fn()}
      isStalemate={isStalemate}
    />
  );

describe('Game Over Screen', () => {
  describe('Given I am playing a game of chess, when the game has ended, then the correct game over screen is displayed', () => {
    test('Draw', () => {
      renderGameOverScreen(true, false, false, false, 'White');
      const text = screen.getByTestId('draw');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Draw');
    });
    test('Stalemate', () => {
      renderGameOverScreen(false, false, false, true, 'White');
      const text = screen.getByTestId('stalemate');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Stalemate');
    });
    test('Threefold', () => {
      renderGameOverScreen(true, false, true, false, 'White');
      const text = screen.getByTestId('threefold');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Threefold Repetition Detected');
    });
    test('Checkmate', () => {
      renderGameOverScreen(false, true, false, false, 'White');
      const text = screen.getByTestId('checkmate');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('White Wins!');
    });
  });
});
