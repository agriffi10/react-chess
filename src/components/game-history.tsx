import { ISimpleMove } from '../interfaces/ISimpleMove';

interface IMoveHistoryProps {
  history: ISimpleMove[];
}

const MoveHistory = ({ history }: IMoveHistoryProps) => {
  return (
    <>
      {history.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))}
    </>
  );
};

export default MoveHistory;
