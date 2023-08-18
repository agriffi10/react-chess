import Chessboard from 'chessboardjsx';
import { Chess, Square } from 'chess.js';
import { useState } from 'react';
import { ISimpleMove } from '../../interfaces/ISimpleMove';
import Alert from '../alert/alert';
import MoveHistory from '../game-history/game-history';
import GameOverScreen from '../game-over-screen/game-over-screen';
import PlayerMenu from '../player-menu/player-menu';
import 'react-toastify/dist/ReactToastify.css';
import './chessboard-wrapper.css';

interface IPlayerMove {
  piece: string;
  sourceSquare: string;
  targetSquare: string;
}
interface IHighlightStyle {
  background: string;
  borderRadius: string;
}

interface IHighlightStyleObject {
  [key: string]: IHighlightStyle;
}

const ChessBoardWrapper = () => {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [alertMessage, setAlertMessage] = useState('');
  const [playerHistory, setPlayerHistory] = useState<ISimpleMove[]>([]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [squareStyles, setSquareStyles] = useState<{}>({});

  const onDrop = ({ piece, sourceSquare, targetSquare }: IPlayerMove) => {
    if (sourceSquare === targetSquare) return;
    // Making an illegal move was throwing an error, so we try/catch to handle each type of movement
    try {
      game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
      setPosition(game.fen());
      setMoves();
    } catch (e) {
      checkPlayerState();
      checkIfGameOver();
    }
  };

  const setMoves = () => {
    const history = getCurrentGameHistory();
    // We want player history in reverse order for display purposes, newest always on top
    setPlayerHistory([
      ...(history.slice(-1) as ISimpleMove[]),
      ...playerHistory,
    ]);
    removeHighlightSquare();
    checkIfGameOver();
  };

  const checkPlayerState = () => {
    if (game.isCheck()) {
      setAlertMessage('Check');
    } else {
      setAlertMessage('Invalid Move');
    }
  };

  const checkIfGameOver = () => {
    setGameIsOver(game.isGameOver());
  };

  const clearMessageFromAlert = () => {
    setAlertMessage('');
  };

  const resetGame = () => {
    game.clear();
    game.reset();
    setPosition('start');
    checkIfGameOver();
    setPlayerHistory([]);
  };

  const getCurrentGameHistory = () => {
    // Unaltered history according to the game
    // Player history is an altered list
    return game.history({ verbose: true });
  };

  const removeHighlightSquare = () => {
    setSquareStyles({});
  };

  const highlightSquare = (
    sourceSquare: string,
    squaresToHighlight: string[]
  ) => {
    // List of current squares and available move squares
    const squares = [sourceSquare, ...squaresToHighlight];
    const highlightStyles: IHighlightStyleObject = {};
    // Iterate and generate a style object for each of the squares
    for (let i = 0; i < squares.length; i++) {
      const key = squares[i];
      highlightStyles[key] = {
        background: 'radial-gradient(circle, #aec6cf 36%, transparent 40%)',
        borderRadius: '50%',
      };
    }
    setSquareStyles({ ...highlightStyles });
  };

  const onMouseOverSquare = (square: Square) => {
    // Get list of moves' to locations and add highlights to them
    const moves = game.moves({
      square: square,
      verbose: true,
    });
    if (moves.length === 0) return;
    const squaresToHighlight = moves.map((move) => move.to);
    highlightSquare(square, squaresToHighlight);
  };

  return (
    <>
      <div id="play-area">
        <div className="history">
          <MoveHistory history={playerHistory} />
        </div>
        <div className="board">
          <Chessboard
            onMouseOverSquare={onMouseOverSquare}
            position={position}
            squareStyles={squareStyles}
            onMouseOutSquare={removeHighlightSquare}
            onDrop={onDrop}
          />
        </div>
        <div className="menu">
          <PlayerMenu
            currentPlayer={game.turn()}
            history={playerHistory}
            resetGame={resetGame}
          />
        </div>
      </div>
      <Alert
        message={alertMessage}
        clearMessageFromAlert={clearMessageFromAlert}
      />
      {gameIsOver && <GameOverScreen resetGame={resetGame} />}
    </>
  );
};

export default ChessBoardWrapper;
