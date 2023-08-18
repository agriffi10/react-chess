import { convertName } from '../../utilities/convert-name';
import { isWhite } from '../../utilities/is-white';
import './player-menu.css';
import { Colors } from '../../constants/Players';
import { ISimpleMove } from '../../interfaces/ISimpleMove';
import PlayerStats from '../player-stats/player-stats';

interface IPlayerMenuProps {
  currentPlayer: string;
  resetGame: () => void;
  history: ISimpleMove[];
}

const PlayerMenu = ({
  currentPlayer,
  resetGame,
  history,
}: IPlayerMenuProps) => {
  return (
    <>
      <div id="player-menu" className="card">
        <h2
          className={`player-title ${
            isWhite(currentPlayer) ? 'white' : 'black'
          }`}>
          {convertName(currentPlayer)}'s Move
        </h2>
        <div className="player-stats">
          <PlayerStats color={Colors.w} history={history} />
          <PlayerStats color={Colors.b} history={history} />
        </div>
        <div className="player-actions">
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
    </>
  );
};

export default PlayerMenu;
