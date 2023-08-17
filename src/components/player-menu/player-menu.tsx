import './player-menu.css';

interface IPlayerMenuProps {
  currentPlayer: string;
  resetGame: () => void;
}

const PlayerMenu = ({ currentPlayer, resetGame }: IPlayerMenuProps) => {
  return (
    <>
      <div id="player-menu" className="card">
        <h2 className="player-title">Current Player: {currentPlayer}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </>
  );
};

export default PlayerMenu;
