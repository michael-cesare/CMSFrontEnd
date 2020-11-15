export interface IDomNode {
  id: number;
  content: string;
}

export interface IDomPost extends IDomNode {
}

export interface IPage {
  type: string
  domNodes: Array<IDomNode>;
}
