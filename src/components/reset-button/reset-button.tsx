import { IResetButtonProps } from '../../interfaces/IComponentProps';

const ResetButton = ({ buttonTitle, resetFunc }: IResetButtonProps) => {
  return (
    <div className="card player-actions">
      <button type="button" onClick={resetFunc}>
        {buttonTitle}
      </button>
    </div>
  );
};

export default ResetButton;
