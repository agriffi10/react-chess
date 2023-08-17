import { ISimpleMove } from '../../interfaces/ISimpleMove';
import './game-history.css';

interface IMoveHistoryProps {
  history: ISimpleMove[];
}

const MoveHistory = ({ history }: IMoveHistoryProps) => {
  const convertName = (color: string) => {
    if (color === 'w') {
      return 'White';
    }
    if (color === 'b') {
      return 'Black';
    }
  };
  return (
    <div id="game-history" className="card">
      <h3>Total Moves - {history.length}</h3>
      <ul className="history-list">
        {history.map((item, index) => (
          <li className="card history-line" key={index}>{`${convertName(
            item.color
          )} moved ${item.piece} from ${item.from} to ${item.to}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoveHistory;
