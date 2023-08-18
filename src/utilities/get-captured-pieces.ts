import { ISimpleMove } from '../interfaces/ISimpleMove';

interface ICapturedPiecesObject {
  [key: string]: number;
}

export const getCapturedPieces = (color: string, history: ISimpleMove[]) => {
  const captured: ICapturedPiecesObject = { p: 0, n: 0, b: 0, r: 0, q: 0 };

  for (const move of history) {
    if (move.hasOwnProperty('captured') && move.color !== color[0]) {
      if (move.captured) {
        captured[move.captured]++;
      }
    }
  }

  return captured;
};
