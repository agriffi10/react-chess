import { Pieces } from '../../constants/Pieces';
import { Players } from '../../constants/Players';
import { ISimpleMove } from '../../interfaces/ISimpleMove';
import './game-history.css';

interface IMoveHistoryProps {
  history: ISimpleMove[];
}

const MoveHistory = ({ history }: IMoveHistoryProps) => {
  const isWhite = (color: string) => {
    return color === 'w';
  };
  const convertName = (color: string) => {
    if (isWhite(color)) {
      return <b>{Players.WHITE}</b>;
    }
    return <b>{Players.BLACK}</b>;
  };

  const convertPieceName = (piece: string) => {
    switch (piece.toLowerCase()) {
      case 'b':
        return Pieces.BISHOP;
      case 'r':
        return Pieces.ROOK;
      case 'n':
        return Pieces.KNIGHT;
      case 'k':
        return Pieces.KING;
      case 'q':
        return Pieces.QUEEN;
      default:
        return Pieces.PAWN;
    }
  };

  return (
    <div id="game-history" className="card">
      <h3>Total Moves - {history.length}</h3>
      <ul className="history-list">
        {history.map((item, index) => (
          <li
            className={`card history-line ${
              isWhite(item.color) ? '-white' : '-black'
            }`}
            key={index}>
            {convertName(item.color)} moved {convertPieceName(item.piece)} from{' '}
            {item.from.toUpperCase()} to {item.to.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoveHistory;
