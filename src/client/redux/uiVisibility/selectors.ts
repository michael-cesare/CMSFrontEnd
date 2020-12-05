import { IAppState } from '@redux/models';

export const mobileMenuVisibleSel = ( state: IAppState ): Boolean => state.uiVisibility.mobileMenuVisible;
