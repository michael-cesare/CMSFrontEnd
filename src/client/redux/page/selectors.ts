import { IAppState } from '@redux/models';

export const pageTypeSel = ( state: IAppState ): string => state.page.type;
