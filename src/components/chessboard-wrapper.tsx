import Chessboard from 'chessboardjsx';
import { Chess, Move } from 'chess.js';
import { useEffect, useMemo, useState } from 'react';
import MoveHistory from './game-history';

export interface IChessBoardWrapperProps {
  position: string;
  showNotation: boolean;
}

export interface IPlayerMove {
  piece: string;
  sourceSquare: string;
  targetSquare: string;
}

export interface ISimpleMove {
  player: string;
  after: string;
  before: string;
  piece: string;
  from: string;
  to: string;
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
      checkGameState();
      alert(e);
    }
  };

  const setMoves = () => {
    const history = game.history({ verbose: true });
    setPlayerHistory(
      history.map(({ after, before, to, piece, from, color }) => ({
        player: color,
        after,
        before,
        piece,
        from,
        to,
      }))
    );
  };

  const checkGameState = () => {
    const state = game.isCheckmate()
      ? 'Checkmate'
      : game.isStalemate()
      ? 'Stalemate'
      : game.isCheck()
      ? 'Check'
      : '';
    setGameState(state);
  };

  const checkCurrentPlayer = () => {
    if (currentPlayer === 'White') {
      setCurrentPlayer('Black');
    } else {
      setCurrentPlayer('White');
    }
  };

  const createBanner = (state: string) => {
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
    createBanner(gameState);
  }, [gameState]);

  return (
    <>
      <div>
        <MoveHistory history={playerHistory} />
      </div>
      <div>
        <h1>{gameState}</h1>
        <Chessboard position={position} onDrop={onDrop} />
      </div>
      <div>
        <h1>Current Player</h1>
        <h2>{currentPlayer}</h2>
        <button onClick={resetGame}>Reset</button>
      </div>
    </>
  );
};

export default ChessBoardWrapper;
