import Chessboard from "chessboardjsx";
import { Chess, Move } from "chess.js";
import { useEffect, useMemo, useState } from "react";

export interface IChessBoardWrapperProps {
  position: string
  showNotation: boolean
}

export interface IPlayerMove {
  piece: string;
  sourceSquare: string
  targetSquare: string
}

const ChessBoardWrapper = () => {
  const [game] = useState(new Chess())
  const [position, setPosition] = useState(game.fen());
  const [history, setHistory] = useState(game.history({verbose: true}));

  
  const onDrop = ({piece, sourceSquare, targetSquare}: IPlayerMove) => {
    try{
      game.move({from: sourceSquare, to: targetSquare});
      setPosition(game.fen())
      setHistory(game.history({verbose: true}))
      console.log(history)
    }
    catch(e) {
      console.warn(e)
      console.log(piece)
    }

  }


  return <Chessboard position={position}  onDrop={onDrop} />
}

export default ChessBoardWrapper