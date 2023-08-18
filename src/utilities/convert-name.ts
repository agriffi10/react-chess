import { Players } from '../constants/Players';
import { isWhite } from './is-white';

// Checks to see if the player is player white, returns friendly name of each player
export const convertName = (color: string) => {
  if (isWhite(color)) {
    return Players.WHITE;
  }
  return Players.BLACK;
};
