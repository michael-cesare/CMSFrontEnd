import { ICardInfo } from '@srcTypes/models';
import { EDomTypes } from '@srcTypes/enums';

export interface IDom {
  id: number;
  content: any;
  type: string;
}

export interface IDomAcfCardInfo extends IDom {
  content: ICardInfo;
  type: EDomTypes;
}

export interface IDomString extends IDom {
  content: string;
}

export interface IDomPost extends IDom {
}

export interface IPage {
  type: string
  domNodes: Array<IDom>;
}
