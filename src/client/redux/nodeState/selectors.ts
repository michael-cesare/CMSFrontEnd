import { IAppState } from '@redux/models';

import { IWPPage, IWPMenu, IPageTemplate } from '@srcTypes/models';
import { IPageVM } from '@srcTypes/viewModels';


export const pageMenuSel = ( state: IAppState ): IWPMenu => {
  const pageVM = state.viewModel as IPageVM;
  const pageData = pageVM.menu.data;

  return pageData as IWPMenu;
}

export const VMPageTypeSel = ( state: IAppState ): string => {
  const pageVM = state.viewModel as IPageVM;
  const pageData = pageVM.page.data as IWPPage;

  return pageData.type;
}

export const VMPageDataSel = ( state: IAppState ): IWPPage => {
  const pageVM = state.viewModel as IPageVM;

  return pageVM.page.data as IWPPage;
}

export const VMPageDataContentSel = ( state: IAppState ): string => {
  const pageData = VMPageDataSel(state) as IWPPage;

  return pageData?.content ? pageData.content.trim() : '';
}

export const VMPageTemplatesSel = ( state: IAppState ): Array<IPageTemplate> => {
  const pageData = VMPageDataSel(state) as IWPPage;

  return pageData?.advanceFields?.pageTemplates ? pageData.advanceFields.pageTemplates : [];
}
