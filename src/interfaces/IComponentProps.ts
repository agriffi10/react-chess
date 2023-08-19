import { ISimpleMove } from './IDataObjects';

export interface IAlertProps {
  message: string;
  clearMessageFromAlert: () => void;
}

export interface ICurrentPlayerBannerProps {
  currentPlayer: string;
}

export interface IGameHistoryProps {
  history: ISimpleMove[];
}

export interface IGameOverScreenProps {
  isStalemate: boolean;
  isDraw: boolean;
  isCheckmate: boolean;
  isThreefoldRepetition: boolean;
  currentPlayer: string;
  resetGame: () => void;
}

export interface IPlayerStatsProps {
  color: string;
  history: ISimpleMove[];
}

export interface IResetButtonProps {
  buttonTitle: string;
  resetFunc: () => void;
}
