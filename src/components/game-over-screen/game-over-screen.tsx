import ResetButton from '../reset-button/reset-button';
import './game-over-screen.css';

interface IGameOverScreenProps {
  isStalemate: boolean;
  isDraw: boolean;
  isCheckmate: boolean;
  isThreefoldRepetition: boolean;
  currentPlayer: string;
  resetGame: () => void;
}

const GameOverScreen = ({
  isCheckmate,
  isDraw,
  isStalemate,
  isThreefoldRepetition,
  currentPlayer,
  resetGame,
}: IGameOverScreenProps) => {
  return (
    <>
      <div id="game-over-screen">
        <div className="card game-over-screen-content">
          <h2>Game Over!</h2>
          {isDraw && !isThreefoldRepetition && <h3>Draw</h3>}
          {isStalemate && <h3>Stalemate</h3>}
          {isThreefoldRepetition && <h3>Threefold Repetition Detected</h3>}
          {isCheckmate && <h3>{currentPlayer} Wins!</h3>}
          <ResetButton resetFunc={resetGame} buttonTitle="Play Again?" />
        </div>
      </div>
    </>
  );
};

export default GameOverScreen;
