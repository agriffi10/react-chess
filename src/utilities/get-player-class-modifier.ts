import { isWhite } from './is-white';

export const getPlayerClassModifier = (currentPlayer: string) => {
  return isWhite(currentPlayer) ? '-white' : '-black';
};
