import { IHighlightStyle } from '../interfaces/IDataObjects';

export const getHighlightStyle = (): IHighlightStyle => {
  return {
    background: 'radial-gradient(circle, #aec6cf 36%, transparent 40%)',
    borderRadius: '50%',
  };
};
