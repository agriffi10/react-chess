import Chessboard from 'chessboardjsx';
import { Chess, Move } from 'chess.js';
import { useEffect, useMemo, useState } from 'react';
import MoveHistory from '../game-history/game-history';
import { ISimpleMove } from '../../interfaces/ISimpleMove';
import Alert from '../alert/alert';
import 'react-toastify/dist/ReactToastify.css';
import './chessboard-wrapper.css';
import GameOverScreen from '../game-over-screen/game-over-screen';
import PlayerMenu from '../player-menu/player-menu';

interface IPlayerMove {
  piece: string;
  sourceSquare: string;
  targetSquare: string;
}

const ChessBoardWrapper = () => {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('White');
  const [playerHistory, setPlayerHistory] = useState<ISimpleMove[]>([]);
  const [gameIsOver, setGameIsOver] = useState(false);

  const onDrop = ({ piece, sourceSquare, targetSquare }: IPlayerMove) => {
    if (sourceSquare === targetSquare) return;
    try {
      game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
      setPosition(game.fen());
      checkCurrentPlayer();
      setMoves();
    } catch (e) {
      // TODO: Alert player if actual invalid move or if in check
      checkPlayerState();
      checkIfGameOver();
    }
  };

  const setMoves = () => {
    const history = game.history({ verbose: true });
    console.log(history);
    setPlayerHistory([
      ...(history.slice(-1) as ISimpleMove[]),
      ...playerHistory,
    ]);
    checkIfGameOver();
  };

  const checkPlayerState = () => {
    if (game.isCheck()) {
      setAlertMessage('Check');
    } else {
      setAlertMessage('Invalid Move');
    }
  };

  const checkCurrentPlayer = () => {
    if (currentPlayer === 'White') {
      setCurrentPlayer('Black');
    } else {
      setCurrentPlayer('White');
    }
  };

  const checkIfGameOver = () => {
    console.log(game.isGameOver());
    setGameIsOver(game.isGameOver());
  };

  const clearMessageFromAlert = () => {
    setAlertMessage('');
  };

  const resetGame = () => {
    game.clear();
    game.reset();
    setCurrentPlayer('White');
    setPosition('start');
    checkIfGameOver();
    setPlayerHistory([]);
  };

  return (
    <>
      <div id="play-area">
        <div className="history">
          <MoveHistory history={playerHistory} />
        </div>
        <div className="board">
          <Chessboard position={position} onDrop={onDrop} />
        </div>
        <div className="menu">
          <PlayerMenu currentPlayer={currentPlayer} resetGame={resetGame} />
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
