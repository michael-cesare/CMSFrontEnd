import { ofType, ActionsObservable } from 'redux-observable';
import { map } from 'rxjs/operators';

import { IAppStore } from '@redux/models';

import { VMPageTypeSel } from '@client/redux/nodeState/selectors';

import pageTypes from '@redux/page/types';
import { setPageType } from '@redux/page/actions';
import { ISetPageTypeAction } from '@redux/page/models';

export const handleSetPage = ( action$: ActionsObservable<ISetPageTypeAction>, store: IAppStore  ) => action$.pipe(
  ofType( pageTypes.SET_PAGE_TYPE ),
  map( () => {
    const pageType = VMPageTypeSel(store.value);

    return {
      pageType,
    };
  } ),
  map( ( { pageType } ) => setPageType( pageType ) ),
);
