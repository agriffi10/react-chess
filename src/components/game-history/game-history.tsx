import { ISimpleMove } from '../../interfaces/ISimpleMove';
import { convertName } from '../../utilities/convert-name';
import { convertPieceName } from '../../utilities/convert-piece-name';
import './game-history.css';

interface IMoveHistoryProps {
  history: ISimpleMove[];
}

const MoveHistory = ({ history }: IMoveHistoryProps) => {
  const isWhite = (color: string) => {
    return color === 'w';
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
            <b>{convertName(item.color)}</b> moved{' '}
            {convertPieceName(item.piece)} from {item.from.toUpperCase()} to{' '}
            {item.to.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoveHistory;
