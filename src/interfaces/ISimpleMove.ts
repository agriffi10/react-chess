export interface ISimpleMove {
  color: string;
  after: string;
  before: string;
  piece: string;
  from: string;
  to: string;
  captured?: string | undefined;
}
