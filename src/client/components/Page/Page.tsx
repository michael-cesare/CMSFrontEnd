import * as React from 'react';

import Content from '@client/components/Content/Content';
import Cards from '@components/CardInfo/Cards';
import Paragraphs from '@components/Paragraphs/Paragraphs';

import { IPage } from '@client/types';
import {
  IPageTemplate,
  IPageTemplateBgImage,
  IPageTemplateCardInfo,
  IPageTemplateParagraphs,
  IWPPosts,
  IWPPost,
  ICardInfo,
} from '@srcTypes/models';

import { EDomTypes } from '@srcTypes/enums';
import { removeNextString } from '@common/utils/string.util';
import { orderByKey } from '@common/utils/array.util';
import { isEmpty, sizeOf } from '@common/utils/core.util';

import { mapPostsToCards } from '@utils/post.util';

interface ITemplateComponent {
  pageContent: string,
  element: JSX.Element | undefined
}

interface IOwnProps {
  page: IPage
  advanceFields: Array<IPageTemplate<any>>
  pagePosts: Array<IWPPosts>
}

type TAllProps = IOwnProps

const Page: React.FC<TAllProps> = (props: TAllProps) => {
  const { page, advanceFields, pagePosts } = props;

  const findPostTypePosts = (postType: string, pagePostTypesPosts: Array<IWPPosts>): undefined | IWPPosts => {
    let result: undefined | IWPPosts

    if (postType) {
      result = pagePostTypesPosts.find((postTypePosts) => postTypePosts.type === postType)
    }

    return result
  }

  const getBgImage = (
    pageContent: string,
    pageTemplateBgImage: IPageTemplateBgImage,
    bgImage: string
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateBgImage.placeHolder}]]`;
    const indexOf = pageContent.indexOf(placeHolderText);
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      element = (
        <Content
          contentClass="page-bg-image"
          key={`page-content-${pageTemplateBgImage.order}`}
        >
          {bgImage}
        </Content>
      )
      pageContent = removeNextString(pageContent, placeHolderText);
    }
    return { pageContent, element };
  }

  const getParagraphs = (
    pageContent: string,
    pageTemplateParagraphs: IPageTemplateParagraphs
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateParagraphs.placeHolder}]]`;
    const indexOf = pageContent.indexOf(placeHolderText);
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      element = <Paragraphs paragraphs={pageTemplateParagraphs} index={pageTemplateParagraphs.order} />;
      pageContent = removeNextString(pageContent, placeHolderText);
    }
    return { pageContent, element };
  }

  const getCards = (
    pageContent: string,
    pageTemplateCardInfo: IPageTemplateCardInfo,
    cardInfoList: Array<ICardInfo>
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateCardInfo.placeHolder}]]`;
    const indexOf = pageContent.indexOf(placeHolderText);
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      element = <Cards cardInfoList={cardInfoList} index={pageTemplateCardInfo.order} />;
      pageContent = removeNextString(pageContent, placeHolderText);
    }
    return { pageContent, element };
  }

  /**
   * Parses ACF post types by mapping posts into to Rxjs elements
   * @param acfPageTemplate 
   * @param pageContent 
   * @param posts 
   * @param handleComponent 
   */
  const handlePostTypePosts = (
    acfPageTemplate: IPageTemplate<any>,
    pageContent: string,
    posts: IWPPost[],
    handleComponent: CallableFunction
  ) => {
    if (acfPageTemplate.type === EDomTypes.cards) {
      const pageTemplateCardInfo = acfPageTemplate as IPageTemplateCardInfo;
      const cardInfoList: Array<ICardInfo> = mapPostsToCards(posts);
      handleComponent(getCards(pageContent, pageTemplateCardInfo, cardInfoList));
    }
  }

  /**
   * Parses ACF input fields directly mapped to Rxjs elements
   * @param acfPageTemplate 
   * @param pageContent 
   * @param handleComponent 
   */
  const handleAcfComponents = (
    acfPageTemplate: IPageTemplate<any>,
    pageContent: string,
    handleComponent: CallableFunction
  ) => {
    if (acfPageTemplate.type === EDomTypes.bgImage) {
      const pageTemplateBgImage = acfPageTemplate as IPageTemplateBgImage;
      handleComponent(getBgImage(pageContent, pageTemplateBgImage, pageTemplateBgImage.content));
    } else if (acfPageTemplate.type === EDomTypes.cards) {
      const pageTemplateCardInfo = acfPageTemplate as IPageTemplateCardInfo;
      handleComponent(getCards(pageContent, pageTemplateCardInfo, pageTemplateCardInfo.content));
    } else if (acfPageTemplate.type === EDomTypes.paragraphs) {
      const pageTemplateParagraphs = acfPageTemplate as IPageTemplateParagraphs;
      handleComponent(getParagraphs(pageContent, pageTemplateParagraphs));
    }
  }

  /**
   * Parse the ACF template posts based on either postType-posts or custom input fields in ACF.
   * Mapping of objects from Wordpress to UI React object is done here.
   * @param content page content from wordpress page. this will hold placeholders such as [[a]][[b]]
   * @param acfPageTemplate The page ACF template field which holds 1 item from the array of the template fields.
   * @param handleElement callback to handle element by the caller function
   */
  const parseACFTemplete = (content: string, acfPageTemplate: IPageTemplate<any>, handleElement: CallableFunction) => {
    let pageContent = content

    /**
     * If it has a component value, it will remove the placeholder from page content,
     * and then it will add the RXJS react element into the callback so that the caller takes care of it.
     * @param componentToRender 
     */
    const handleComponent = (componentToRender: ITemplateComponent | undefined) => {
      if (componentToRender && componentToRender.element) {
        pageContent = componentToRender.pageContent;
        handleElement(componentToRender.element);
      }
    }

    // The current ACF template is a 'postType' posts, or else it is from the ACF attributes.
    const isPostTypePosts: boolean = !isEmpty(acfPageTemplate?.contentPostTypeQuery?.postType);
    if (isPostTypePosts) {
      const { contentPostTypeQuery } = acfPageTemplate;
      if (sizeOf(pagePosts) > 0 && contentPostTypeQuery?.postType) {
        const { postType } = contentPostTypeQuery;
        const postTypePosts = findPostTypePosts(postType, pagePosts);
        if (postTypePosts && sizeOf(postTypePosts.posts) > 0) {
          const { posts } = postTypePosts;
          handlePostTypePosts(acfPageTemplate, pageContent, posts, handleComponent);
        }
      }
    } else {
      handleAcfComponents(acfPageTemplate, pageContent, handleComponent);
    }
  }

  /**
   * Converts wordpress acf templates to desired format baed on page content.
   * @method acfTemplatesFactory
   * @category wpDom
   * @param pageContent {string} - wordpress post/object content
   */
  const acfTemplatesFactory = (pageContent: string): JSX.Element[] => {
    let parsedContent: JSX.Element[] = []
    const acfPageTemplatesSorted = advanceFields.sort((a: any, b: any) => orderByKey(a, b, 'order'))

    const addElement = (element: JSX.Element) => {
      parsedContent.push(element);
    }

    acfPageTemplatesSorted.forEach((acfPageTemplate: IPageTemplate<any>) => parseACFTemplete(pageContent, acfPageTemplate, addElement))

    return parsedContent;
  }

  const PageDomNodes = (): JSX.Element => {
    const { domNodes } = page;
    const domList: JSX.Element[] = [];

    domNodes.forEach((domNode) => {
      const ComponentsToRender = acfTemplatesFactory(domNode.content)

      if (ComponentsToRender) {
        ComponentsToRender.forEach((component) => domList.push(component));
      }
    });

    return (
      <div>
        {domList}
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-container-nodes">
        <PageDomNodes />
      </div>
    </div>
  )
}

export default Page
