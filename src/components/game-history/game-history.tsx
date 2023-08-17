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
    <div id="game-history">
      {history.map((item, index) => (
        <p className="history-line" key={index}>{`${convertName(
          item.color
        )} moved ${item.piece} from ${item.from} to ${item.to}`}</p>
      ))}
    </div>
  );
};

export default MoveHistory;
