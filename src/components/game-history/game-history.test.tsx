import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameHistory from './game-history';
import { ISimpleMove } from '../../interfaces/ISimpleMove';

test('loads and displays greeting', () => {
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
