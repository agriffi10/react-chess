import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Colors } from '../../constants/Players';
import PlayerStats from './player-stats';
import { convertPieceName } from '../../utilities/convert-piece-name';
import { ISimpleMove } from '../../interfaces/IDataObjects';

describe('Player Stats', () => {
  describe('Given I am a player, when a piece is taken and recorded in the move history, then my piece lost count is correct', () => {
    test('Piece counts are correct', () => {
      const baseMove: ISimpleMove = {
        color: 'w',
        after: '',
        before: '',
        piece: 'p',
        from: 'e7',
        to: 'd7',
      };
      const history: ISimpleMove[] = [
        {
          ...baseMove,
        },
        {
          ...baseMove,
          color: 'b',
          captured: 'q',
        },
        {
          ...baseMove,
          color: 'b',
          captured: 'p',
        },
        {
          ...baseMove,
          color: 'b',
          captured: 'n',
        },
        {
          ...baseMove,
          color: 'b',
          captured: 'b',
        },
        {
          ...baseMove,
          color: 'b',
          captured: 'q',
        },
        {
          ...baseMove,
          captured: 'b',
        },
        {
          ...baseMove,
          color: 'b',
          captured: 'r',
        },
      ];
      const counts: { [key: string]: number } = {
        p: history.filter(
          (move) => move.color == Colors.b && move.captured == 'p'
        ).length,
        q: history.filter(
          (move) => move.color == Colors.b && move.captured == 'q'
        ).length,
        r: history.filter(
          (move) => move.color == Colors.b && move.captured == 'r'
        ).length,
        n: history.filter(
          (move) => move.color == Colors.b && move.captured == 'n'
        ).length,
        b: history.filter(
          (move) => move.color == Colors.b && move.captured == 'b'
        ).length,
      };
      render(<PlayerStats history={history} color={Colors.w} />);
      for (const key in counts) {
        const countItem = screen.getByTestId(`taken-${key}-${Colors.w}`);
        expect(countItem).toBeInTheDocument();
        expect(countItem).toHaveTextContent(
          `${convertPieceName(key)}(s) Lost: ${counts[key]}`
        );
      }
    });
  });
});
