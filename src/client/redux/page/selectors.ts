import { IAppState } from '@redux/models';

import { IPage } from '@client/types';

export const pageDataSel = ( state: IAppState ): IPage => state.page;
