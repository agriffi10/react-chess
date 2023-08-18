import { Colors, Players } from '../constants/Players';

export const isWhite = (color: string): boolean =>
  color === Colors.w || color === Players.WHITE;
