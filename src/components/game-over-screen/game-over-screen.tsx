import './game-over-screen.css';

interface IGameOverScreenProps {
  resetGame: () => void;
}

const GameOverScreen = ({ resetGame }: IGameOverScreenProps) => {
  return (
    <>
      <div id="game-over-screen">
        <div className="card game-over-screen-content">
          <h2>Game Over!</h2>
          <button onClick={resetGame}>Reset?</button>
        </div>
      </div>
    </>
  );
};

export default GameOverScreen;
