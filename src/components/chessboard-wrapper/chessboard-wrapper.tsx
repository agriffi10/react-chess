import Chessboard from 'chessboardjsx';
import { Chess, Move } from 'chess.js';
import { useEffect, useMemo, useState } from 'react';
import MoveHistory from '../game-history/game-history';
import { ISimpleMove } from '../../interfaces/ISimpleMove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './chessboard-wrapper.css';

interface IPlayerMove {
  piece: string;
  sourceSquare: string;
  targetSquare: string;
}

const ChessBoardWrapper = () => {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [gameState, setGameState] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('White');
  const [playerHistory, setPlayerHistory] = useState<ISimpleMove[]>([]);

  const onDrop = ({ piece, sourceSquare, targetSquare }: IPlayerMove) => {
    if (sourceSquare === targetSquare) return;
    try {
      game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
      setPosition(game.fen());
      checkGameState();
      checkCurrentPlayer();
      setMoves();
    } catch (e) {
      // TODO: Alert player if actual invalid move or if in check
      setGameState('Invalid Move');
    }
  };

  const setMoves = () => {
    const history = game.history({ verbose: true });
    setPlayerHistory([
      ...playerHistory,
      ...(history.slice(-1) as ISimpleMove[]),
    ]);
  };

  const checkGameState = () => {
    console.log('hit');
    const state = game.isCheckmate()
      ? 'Checkmate'
      : game.isStalemate()
      ? 'Stalemate'
      : game.isCheck()
      ? 'Check'
      : '';
    if (state != gameState) setGameState(state);
  };

  const checkCurrentPlayer = () => {
    if (currentPlayer === 'White') {
      setCurrentPlayer('Black');
    } else {
      setCurrentPlayer('White');
    }
  };

  const createBanner = () => {
    if (gameState) {
      toast(gameState, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    if (!game.isGameOver()) return;
    if (confirm(`Game over, winner ${currentPlayer}, play again?`)) {
      game.clear();
    }
  };

  const resetGame = () => {
    if (confirm('do you want to reset')) {
      game.reset();
      setCurrentPlayer('White');
      setGameState('');
      setPosition(game.fen());
      setMoves();
    }
  };

  useMemo(() => {
    createBanner();
    console.log('hit again');
    console.log(gameState);
  }, [gameState]);

  return (
    <div id="play-area">
      <div>
        <MoveHistory history={playerHistory} />
      </div>
      <div>
        <h1 className="player-title">Current Player: {currentPlayer}</h1>
        <Chessboard position={position} onDrop={onDrop} />
      </div>
      <div>
        <button onClick={resetGame}>Reset</button>
      </div>
      {gameState && (
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      )}
    </div>
  );
};

export default ChessBoardWrapper;
