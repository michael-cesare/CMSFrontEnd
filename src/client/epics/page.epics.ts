import { ofType, ActionsObservable } from 'redux-observable';
import { map } from 'rxjs/operators';

import { IAppStore } from '@redux/models';

import { VMPageTypeSel, VMPageDataContentSel } from '@client/redux/nodeState/selectors';

import pageTypes from '@redux/page/types';
import { setPage } from '@redux/page/actions';
import { ISetPageAction } from '@redux/page/models';

import { parseWp } from '@client/utils/wpDom.util';

import { IPage } from '@client/types';

export const handleSetPage = (action$: ActionsObservable<ISetPageAction>, store: IAppStore) => action$.pipe(
  ofType(pageTypes.INIT),
  map(() => {
    const pageType = VMPageTypeSel(store.value);
    const pageText = VMPageDataContentSel(store.value);

    const dom = parseWp(pageText);

    return {
      type: pageType,
      domNodes: dom,
    };
  }),
  map((page: IPage) => setPage(page)),
);
