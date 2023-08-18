import { isWhite } from './is-white';

// Modifier class name that can be used in multiple situations
export const getPlayerClassModifier = (currentPlayer: string) => {
  return isWhite(currentPlayer) ? '-white' : '-black';
};
