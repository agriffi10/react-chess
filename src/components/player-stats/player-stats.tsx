import { useMemo, useState } from 'react';
import { convertName } from '../../utilities/convert-name';
import { convertPieceName } from '../../utilities/convert-piece-name';
import { getCapturedPieces } from '../../utilities/get-captured-pieces';
import './player-stats.css';
import { IPlayerStatsProps } from '../../interfaces/IComponentProps';
import { ISimpleMove } from '../../interfaces/IDataObjects';

const PlayerStats = ({ color, history }: IPlayerStatsProps) => {
  // Keeping this in here so I don't have to mix .tsx files in my utils folder
  // It's also only used here, so no need to expose it globally
  const renderTakenPieces = (player: string, history: ISimpleMove[]) => {
    const captured = getCapturedPieces(player, history);
    const keys = Object.keys(captured);

    return (
      <div className="stats-block-taken-pieces-list">
        <div>
          {keys.map((key) => (
            <div
              data-testid={`taken-${key}-${color}`}
              className="stats-block-taken-piece"
              key={key}>
              {convertPieceName(key)}
              {'(s)'} Lost: {captured[key]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const [piecesTaken, setPiecesTaken] = useState(
    renderTakenPieces(color, history)
  );

  useMemo(() => {
    // Doing this prevents the function from getting called on every UI update
    // Only needs to be updated when history changes
    setPiecesTaken(renderTakenPieces(color, history));
  }, [history]);

  return (
    <div className="player-stats-block card">
      <h4 className="stats-block-name">Player {convertName(color)}</h4>
      <div>{piecesTaken}</div>
    </div>
  );
};

export default PlayerStats;
