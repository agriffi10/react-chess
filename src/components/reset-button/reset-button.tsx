interface IResetButtonProps {
  buttonTitle: string;
  resetFunc: () => void;
}

const ResetButton = ({ buttonTitle, resetFunc }: IResetButtonProps) => {
  return (
    <div id="player-actions" className="card">
      <button onClick={resetFunc}>{buttonTitle}</button>
    </div>
  );
};

export default ResetButton;
