import { ISimpleMove } from '../../interfaces/ISimpleMove';
import { convertName } from '../../utilities/convert-name';
import { convertPieceName } from '../../utilities/convert-piece-name';
import { getCapturedPieces } from '../../utilities/get-captured-pieces';
import './player-stats.css';

interface IPlayerStatsProps {
  color: string;
  history: ISimpleMove[];
}

const PlayerStats = ({ color, history }: IPlayerStatsProps) => {
  const renderTakenPieces = (player: string, history: ISimpleMove[]) => {
    const captured = getCapturedPieces(player, history);
    const keys = Object.keys(captured);

    return (
      <div className="stats-block-taken-pieces-list">
        <div>
          {keys.map((key) => (
            <div className="stats-block-taken-piece" key={key}>
              {convertPieceName(key)}s Lost: {captured[key]}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="player-stats-block card">
      <h4 className="stats-block-name">Player {convertName(color)}</h4>
      <div>{renderTakenPieces(color, history)}</div>
    </div>
  );
};

export default PlayerStats;
