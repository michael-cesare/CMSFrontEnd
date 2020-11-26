export interface IObject {
}

export interface IWPMenu extends IObject {
  type: string;
  foundPosts: string;
  postCount: number;
  maxNumPages: number;
  posts: Array<any>;
}

export interface IWPObject extends IObject {
  id: number;
  slug: number;
  date: string;
  type: string;
  title: string;
  content: string;
  excerpt: string;
  advanceFields?: IAdvanceField;
}

export interface IWPPost extends IWPObject {
}

export interface IWPPage extends IWPObject {
}

export interface IFetchRequest {
}

export interface IAdvanceField {
  pageTemplates: Array<IPageTemplate>,
}

export interface ICardInfo {
  title: string,
  image: string,
  text: string,
  buttonLink: string,
}

/**
 * Every ACF in page_template, must have the listed attibutes as a base object
 * 
 * order       order to sort the component for viewing
 * placeHolder text in wordpress page content to be replaced by this page template content
 * type        type to define sub type of acf. sometimes it's value is the same as placeholder.
 *             There is also a specific parser for each different type to generate html.
 */
export interface IPageTemplate {
  order: number,
  placeHolder: string,
  type: string,
}

export interface IPageTemplateCardInfo extends IPageTemplate {
  content: Array<ICardInfo>,
}

export interface IPageTemplateBgImage extends IPageTemplate {
  content: string,
}

export interface IFetchResponse {
  data: Array<IWPObject> | IWPObject | IWPMenu;
  errors: Array<IError>;
}

export interface IError {
  code: any;
  info: string;
}

export interface IFetchPostsRequest extends IFetchRequest {
  searchCount: number;
  postType: string;
  postSlug: string;
  sortOrder: string,
  pageSize: number,
  pageIndex: number,
  termSlugs: string,
  taxonomy: string,
}

export interface IFetchPostsResponse extends IFetchResponse {
  params: IFetchPostsRequest;
  searchCount: number;
}

export interface IWpRepo {
  fetchMenu: () => Promise<IFetchResponse>,
  fetchPage: (pageSlug: string) => Promise<IFetchResponse>,
  fetchPost: (slug: string) => Promise<IFetchResponse>,
  fetchPosts: (params: IFetchPostsRequest) => Promise<IFetchResponse>,
}

export interface IWPCard {
  title: number;
  image: number;
  text: string;
  buttonLink: string;
}
