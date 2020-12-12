import { IAppState } from '@redux/models';

import { IWPPage, IWPMenu, IPageTemplate, IWPPosts } from '@srcTypes/models';
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

/**
 * page posts are a list of postTypes queries and their post result.
 * A Page can have none or many postType posts.
 */
export const VMPagePostsSel = ( state: IAppState ): Array<IWPPosts> => {
  const pageData = VMPageDataSel(state) as IWPPage;
  const pagePosts = pageData?.pagePosts ? pageData.pagePosts : undefined as Array<IWPPosts> | undefined;

  return pagePosts || [];
}

export const VMPageDataContentSel = ( state: IAppState ): string => {
  const pageData = VMPageDataSel(state) as IWPPage;

  return pageData?.content ? pageData.content.trim() : '';
}

export const VMPageTemplatesSel = ( state: IAppState ): Array<IPageTemplate<any>> => {
  const pageData = VMPageDataSel(state) as IWPPage;

  return pageData?.advanceFields?.pageTemplates ? pageData.advanceFields.pageTemplates : [];
}
