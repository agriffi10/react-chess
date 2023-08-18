import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameHistory from './game-history';
import { ISimpleMove } from '../../interfaces/ISimpleMove';

describe('Game History', () => {
  describe("Given I am playing a game of chess, when a move has been made, that move is displayed in the history tracker and attributed to the correct player'", () => {
    test('White captures queen with pawn', () => {
      const baseColor: ISimpleMove = {
        color: 'w',
        after: '',
        before: '',
        piece: 'p',
        from: 'e7',
        to: 'd7',
        captured: 'q',
      };

      const history: ISimpleMove[] = [{ ...baseColor }];
      const firstTestId = 'history-line-0';
      render(<GameHistory history={history} />);
      const lineItem = screen.getByTestId(firstTestId);
      expect(lineItem).toBeInTheDocument();
      expect(lineItem).toHaveTextContent(
        'White moved Pawn from E7 to D7, captured Queen'
      );
    });
    test('Black moves pawn', () => {
      const baseColor: ISimpleMove = {
        color: 'b',
        after: '',
        before: '',
        piece: 'p',
        from: 'e7',
        to: 'd7',
      };

      const history: ISimpleMove[] = [{ ...baseColor }];
      const firstTestId = 'history-line-0';
      render(<GameHistory history={history} />);
      const lineItem = screen.getByTestId(firstTestId);
      expect(lineItem).toBeInTheDocument();
      expect(lineItem).toHaveTextContent('Black moved Pawn from E7 to D7');
    });
  });
});
