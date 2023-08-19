import { getPlayerClassModifier } from '../../utilities/get-player-class-modifier';
import './current-player-banner.css';

interface ICurrentPlayerBannerProps {
  currentPlayer: string;
}

const CurrentPlayerBanner = ({ currentPlayer }: ICurrentPlayerBannerProps) => {
  return (
    <h2
      id="current-player-banner"
      data-testid="player-banner"
      className={` ${getPlayerClassModifier(currentPlayer)}`}>
      {currentPlayer}'s Move
    </h2>
  );
};

export default CurrentPlayerBanner;
