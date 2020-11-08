import { IAction } from '@redux/models';

import ownTypes from './types';

export const setupApp = (): IAction => ( {
  type:    ownTypes.SETUP_APP,
} );
