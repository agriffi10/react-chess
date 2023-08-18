import { Colors, Players } from '../constants/Players';

// Determines if player is player White, if not it's player Black
export const isWhite = (color: string): boolean =>
  color === Colors.w || color === Players.WHITE;
