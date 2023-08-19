import { ISimpleMove } from '../interfaces/IDataObjects';

interface ICapturedPiecesObject {
  [key: string]: number;
}

export const getCapturedPieces = (color: string, history: ISimpleMove[]) => {
  // Data on potentially captured pieces
  const captured: ICapturedPiecesObject = { p: 0, n: 0, b: 0, r: 0, q: 0 };

  for (const move of history) {
    // Optional parameter on a Move Object from chess.js
    // If present, that move had a captured action
    if (move.hasOwnProperty('captured') && move.color !== color) {
      if (move.captured) {
        captured[move.captured]++;
      }
    }
  }

  return captured;
};
