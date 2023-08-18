import { Pieces } from '../constants/Pieces';

export const convertPieceName = (piece: string) => {
  switch (piece.toLowerCase()) {
    case 'b':
      return Pieces.BISHOP;
    case 'r':
      return Pieces.ROOK;
    case 'n':
      return Pieces.KNIGHT;
    case 'k':
      return Pieces.KING;
    case 'q':
      return Pieces.QUEEN;
    default:
      return Pieces.PAWN;
  }
};
