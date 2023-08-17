import { Chess } from 'chess.js';
import { useState, useMemo } from 'react';
import { ISimpleMove } from './chessboard-wrapper';

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
