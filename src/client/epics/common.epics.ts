import { AnyAction } from 'redux';
import { ofType, ActionsObservable } from 'redux-observable';
import { map } from 'rxjs/operators';

import commonTypes from '@redux/common/types';
import { initPage } from '@redux/page/actions';

export const handleSetupApp = ( action$: ActionsObservable<AnyAction> ) => action$.pipe(
  ofType( commonTypes.SETUP_APP ),
  map( () => initPage() ),
);
