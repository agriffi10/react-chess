import Chessboard from 'chessboardjsx';
import { Chess, Square } from 'chess.js';
import { useMemo, useState } from 'react';
import Alert from '../alert/alert';
import GameHistory from '../game-history/game-history';
import GameOverScreen from '../game-over-screen/game-over-screen';
import 'react-toastify/dist/ReactToastify.css';
import './chessboard-wrapper.css';
import { convertName } from '../../utilities/convert-name';
import CurrentPlayerBanner from '../current-player-banner/current-player-banner';
import PlayerStats from '../player-stats/player-stats';
import { Colors } from '../../constants/Players';
import ResetButton from '../reset-button/reset-button';
import {
  IPlayerMove,
  IHighlightStyleObject,
  ISimpleMove,
} from '../../interfaces/IDataObjects';

const ChessBoardWrapper = () => {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [alertMessage, setAlertMessage] = useState('');
  const [playerHistory, setPlayerHistory] = useState<ISimpleMove[]>([]);
  const [squareStyles, setSquareStyles] = useState<{}>({});
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    convertName(game.turn())
  );
  const [gameIsOver, setGameIsOver] = useState<boolean>(game.isGameOver());
  const [currentSquare, setCurrentSquare] = useState<Square | string>('');

  const onDrop = ({ sourceSquare, targetSquare }: IPlayerMove) => {
    if (sourceSquare === targetSquare) return;
    // Making an illegal move throws an error, so we try/catch to handle each type of movement
    try {
      game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
      setPosition(game.fen());
      setMoves();
      setCurrentPlayer(convertName(game.turn()));
      setGameIsOver(game.isGameOver());
      checkPlayerState(true);
    } catch (e) {
      checkPlayerState();
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
  };

  const checkPlayerState = (onlyForCheck: boolean = false) => {
    // This only alerts if you are current in check
    // Moving your king to an in check position will just generate an invalid move
    if (game.isCheck() && !game.isGameOver()) {
      // Needed a flag onlyForCheck so when Player X puts Player Y in check
      // then an appropriate notification is generated.
      setAlertMessage('Check');
    } else if (!onlyForCheck) {
      setAlertMessage('Invalid Move');
    }
    // Setting this here because we anytime we check this
    // we want to clear the selected square
    setCurrentSquare('');
  };

  const clearMessageFromAlert = () => {
    setAlertMessage('');
  };

  const resetGame = () => {
    game.clear();
    game.reset();
    setPosition('start');
    setPlayerHistory([]);
    setCurrentPlayer(convertName(game.turn()));
  };

  const getCurrentGameHistory = () => {
    // Unaltered history according to the game
    // Player history is an altered list of objects with overlapping keys
    return game.history({ verbose: true });
  };

  const removeHighlightSquare = () => {
    if (currentSquare) return;
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
    if (currentSquare) return;
    const moves = game.moves({
      square: square,
      verbose: true,
    });
    if (moves.length === 0) return;
    const squaresToHighlight = moves.map((move) => move.to);
    highlightSquare(square, squaresToHighlight);
  };

  const onSquareClick = (square: Square) => {
    if (currentSquare && currentSquare != square) {
      // We have a current square and are clicking a new square
      onDrop({ sourceSquare: currentSquare, targetSquare: square });
    } else if (!currentSquare) {
      // We're setting a brand new current square
      const highlightStyles: IHighlightStyleObject = {};
      highlightStyles[square] = {
        border: '2px solid yellow',
        borderStyle: 'inset',
      };
      setCurrentSquare(square);
      setSquareStyles({ ...squareStyles, ...highlightStyles });
    } else if (square === currentSquare) {
      // We're clicking on an already selected square
      deselectSquare();
    }
  };

  const deselectSquare = () => {
    setCurrentSquare('');
  };

  useMemo(() => {
    if (!currentSquare) removeHighlightSquare();
  }, [currentSquare]);

  return (
    <>
      <div id="play-area">
        <div className="history">
          <GameHistory history={playerHistory} />
        </div>
        <div className="board">
          <CurrentPlayerBanner currentPlayer={currentPlayer} />

          <Chessboard
            onMouseOverSquare={onMouseOverSquare}
            position={position}
            squareStyles={squareStyles}
            onMouseOutSquare={removeHighlightSquare}
            onSquareRightClick={deselectSquare}
            onSquareClick={onSquareClick}
            onDrop={onDrop}
          />
        </div>
        <div className="menu">
          <PlayerStats color={Colors.w} history={playerHistory} />
          <PlayerStats color={Colors.b} history={playerHistory} />
          <ResetButton resetFunc={resetGame} buttonTitle="Reset Game" />
        </div>
      </div>
      {alertMessage && (
        <Alert
          message={alertMessage}
          clearMessageFromAlert={clearMessageFromAlert}
        />
      )}

      {gameIsOver && playerHistory.length > 0 && (
        <GameOverScreen
          isCheckmate={game.isCheckmate()}
          isStalemate={game.isStalemate()}
          isDraw={game.isDraw()}
          isThreefoldRepetition={game.isThreefoldRepetition()}
          currentPlayer={convertName(playerHistory[0].color)}
          resetGame={resetGame}
        />
      )}
    </>
  );
};

export default ChessBoardWrapper;
