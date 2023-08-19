import { IGameOverScreenProps } from '../../interfaces/IComponentProps';
import ResetButton from '../reset-button/reset-button';
import './game-over-screen.css';

const GameOverScreen = ({
  isCheckmate,
  isDraw,
  isStalemate,
  isThreefoldRepetition,
  currentPlayer,
  resetGame,
}: IGameOverScreenProps) => {
  // Draw can trigger for both draw states and threefold repetition states
  return (
    <>
      <div id="game-over-screen">
        <div className="card game-over-screen-content">
          <h2>Game Over!</h2>
          {isDraw && !isThreefoldRepetition && <h3 data-testid="draw">Draw</h3>}
          {isStalemate && <h3 data-testid="stalemate">Stalemate</h3>}
          {isThreefoldRepetition && (
            <h3 data-testid="threefold">Threefold Repetition Detected</h3>
          )}
          {isCheckmate && (
            <h3 data-testid="checkmate">{currentPlayer} Wins!</h3>
          )}
          <ResetButton resetFunc={resetGame} buttonTitle="Play Again?" />
        </div>
      </div>
    </>
  );
};

export default GameOverScreen;
