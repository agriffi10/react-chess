import { Players } from '../constants/Players';
import { isWhite } from './is-white';

export const convertName = (color: string) => {
  if (isWhite(color)) {
    return Players.WHITE;
  }
  return Players.BLACK;
};
