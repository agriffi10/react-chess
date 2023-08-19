export interface ISimpleMove {
  color: string;
  after: string;
  before: string;
  piece: string;
  from: string;
  to: string;
  captured?: string | undefined;
}

export interface IPlayerMove {
  sourceSquare: string;
  targetSquare: string;
}
export interface IHighlightStyle {
  background?: string;
  borderRadius?: string;
  border?: string;
  borderStyle?: string;
}

export interface IHighlightStyleObject {
  [key: string]: IHighlightStyle;
}
