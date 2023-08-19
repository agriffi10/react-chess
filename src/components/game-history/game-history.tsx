import { IGameHistoryProps } from '../../interfaces/IComponentProps';
import { ISimpleMove } from '../../interfaces/IDataObjects';
import { convertName } from '../../utilities/convert-name';
import { convertPieceName } from '../../utilities/convert-piece-name';
import { getPlayerClassModifier } from '../../utilities/get-player-class-modifier';
import './game-history.css';

const GameHistory = ({ history }: IGameHistoryProps) => {
  const getHistoryItem = (item: ISimpleMove, index: number) => {
    return (
      <li
        data-testid={`history-line-${index}`}
        className={`card history-line ${getPlayerClassModifier(item.color)}`}
        key={index}>
        <b>{convertName(item.color)}</b> moved {convertPieceName(item.piece)}{' '}
        from {item.from.toUpperCase()} to {item.to.toUpperCase()}
        {item.captured && <>, captured {convertPieceName(item.captured)}</>}
      </li>
    );
  };

  return (
    <div id="game-history" className="card">
      <h3>Total Moves - {history.length}</h3>
      <ul className="history-list">
        {history.map((item, index) => getHistoryItem(item, index))}
      </ul>
    </div>
  );
};

export default GameHistory;
