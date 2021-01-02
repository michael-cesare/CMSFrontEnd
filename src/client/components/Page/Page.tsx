import * as React from 'react'

import Cards from '@components/CardInfo/Cards'
import Briefs from '@components/Briefs/Briefs'
import BgImage from '@components/BgImage/BgImage'
import Paragraphs from '@components/Paragraphs/Paragraphs'

import { IPage } from '@client/types'
import {
  IPageTemplate,
  IPageTemplateBgImage,
  IPageTemplateCardInfo,
  IPageTemplateIBriefs,
  IPageTemplateParagraphs,
  IWPPost,
  IWPPagePosts,
  ICardInfo,
  IBrief,
  IBgImage,
  IStyle,
} from '@srcTypes/models'

import { EDomTypes } from '@srcTypes/enums'
import { removeNextString } from '@common/utils/string.util'
import { orderByKey } from '@common/utils/array.util'
import { isEmpty, sizeOf } from '@common/utils/core.util'

import { mapPostsToCards, mapPostsToBriefs } from '@utils/post.util'

interface ITemplateComponent {
  pageContent: string,
  element: JSX.Element | undefined
}

interface IOwnProps {
  page: IPage
  advanceFields: Array<IPageTemplate<any>>
  pagePosts: Array<IWPPagePosts>
}

type TAllProps = IOwnProps

const Page: React.FC<TAllProps> = (props: TAllProps) => {
  const { page, advanceFields, pagePosts } = props

  const findPagePosts = (acfTemplateIndex: number, pagePostTypesPosts: Array<IWPPagePosts>): undefined | IWPPagePosts => {
    return pagePostTypesPosts.find((postTypePosts) => postTypePosts.mappedIndex === acfTemplateIndex)
  }

  const getBgImage = (
    pageContent: string,
    pageTemplateBgImage: IPageTemplateBgImage,
    bgImage: IBgImage
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateBgImage.placeHolder}]]`
    const indexOf = pageContent.indexOf(placeHolderText)
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      element = (
        <BgImage
          key={indexOf}
          bgImage={bgImage}
          index={indexOf}
        />
      )
      pageContent = removeNextString(pageContent, placeHolderText)
    }
    return { pageContent, element }
  }

  const getParagraphs = (
    pageContent: string,
    pageTemplateParagraphs: IPageTemplateParagraphs
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateParagraphs.placeHolder}]]`
    const indexOf = pageContent.indexOf(placeHolderText)
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      element = (
        <Paragraphs
          key={pageTemplateParagraphs.order}
          paragraphs={pageTemplateParagraphs}
          index={pageTemplateParagraphs.order}
        />
      )
      pageContent = removeNextString(pageContent, placeHolderText)
    }
    return { pageContent, element }
  }

  const getCards = (
    pageContent: string,
    pageTemplateCardInfo: IPageTemplateCardInfo,
    cardInfoList: Array<ICardInfo>
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateCardInfo.placeHolder}]]`
    const indexOf = pageContent.indexOf(placeHolderText)
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      const { order } = pageTemplateCardInfo
      element = (
        <Cards
          cardInfoList={cardInfoList}
          index={order}
        />
      )
      pageContent = removeNextString(pageContent, placeHolderText)
    }
    return { pageContent, element }
  }

  const getBriefs = (
    pageContent: string,
    pageTemplateBriefs: IPageTemplateIBriefs,
    briefs: Array<IBrief>
  ): ITemplateComponent => {
    const placeHolderText: string = `[[${pageTemplateBriefs.placeHolder}]]`
    const indexOf = pageContent.indexOf(placeHolderText)
    let element: JSX.Element | undefined
    if (indexOf > -1) {
      const { order, style, content: { titleStyle, textStyle } } = pageTemplateBriefs
      element = (
        <Briefs
          briefs={briefs}
          index={order}
          titleStyle={titleStyle as IStyle}
          textStyle={textStyle as IStyle}
          bodyStyle={style as IStyle}
        />
      )
      pageContent = removeNextString(pageContent, placeHolderText)
    }
    return { pageContent, element }
  }

  /**
   * Parses ACF post types by mapping posts into to Rxjs elements
   * @param acfPageTemplate 
   * @param pageContent 
   * @param posts 
   * @param handleComponent 
   */
  const handleAcfPagePosts = (
    acfPageTemplate: IPageTemplate<any>,
    pageContent: string,
    posts: IWPPost[],
    handleComponent: CallableFunction
  ) => {
    if (acfPageTemplate.type === EDomTypes.cards) {
      const pageTemplateCardInfo = acfPageTemplate as IPageTemplateCardInfo
      const cardInfoList: Array<ICardInfo> = mapPostsToCards(posts)
      handleComponent(getCards(pageContent, pageTemplateCardInfo, cardInfoList))
    } else if (acfPageTemplate.type === EDomTypes.briefs) {
      const pageTemplateBriefs = acfPageTemplate as IPageTemplateIBriefs
      const briefs: Array<IBrief> = mapPostsToBriefs(posts)
      handleComponent(getBriefs(pageContent, pageTemplateBriefs, briefs))
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
      const pageTemplateBgImage = acfPageTemplate as IPageTemplateBgImage
      handleComponent(getBgImage(pageContent, pageTemplateBgImage, pageTemplateBgImage.content))
    } else if (acfPageTemplate.type === EDomTypes.cards) {
      const pageTemplateCardInfo = acfPageTemplate as IPageTemplateCardInfo
      handleComponent(getCards(pageContent, pageTemplateCardInfo, pageTemplateCardInfo.content))
    } else if (acfPageTemplate.type === EDomTypes.paragraphs) {
      const pageTemplateParagraphs = acfPageTemplate as IPageTemplateParagraphs
      handleComponent(getParagraphs(pageContent, pageTemplateParagraphs))
    }
  }

  /**
   * Parse the ACF template posts based on either postType-posts or custom input fields in ACF.
   * Mapping of objects from Wordpress to UI React object is done here.
   * @param content page content from wordpress page. this will hold placeholders such as [[a]][[b]]
   * @param acfPageTemplate The page ACF template field which holds 1 item from the array of the template fields.
   * @param handleElement callback to handle element by the caller function
   */
  const parseACFTemplete = (content: string, acfPageTemplate: IPageTemplate<any>, acfTemplateIndex: number, handleElement: CallableFunction) => {
    let pageContent = content

    /**
     * If it has a component value, it will remove the placeholder from page content,
     * and then it will add the RXJS react element into the callback so that the caller takes care of it.
     * @param componentToRender 
     */
    const handleComponent = (componentToRender: ITemplateComponent | undefined) => {
      if (componentToRender && componentToRender.element) {
        pageContent = componentToRender.pageContent
        handleElement(componentToRender.element)
      }
    }

    // The current ACF template is a 'postType' posts, or else it is from the ACF attributes.
    // contentPostIdsQuery is always a postTypes
    const isPostTypePosts: boolean = !isEmpty(acfPageTemplate?.contentPostTypeQuery?.postType)
    const isSearchByPostIds: boolean = !isEmpty(acfPageTemplate?.contentPostIdsQuery)
    if (sizeOf(pagePosts) > 0 && (isPostTypePosts || isSearchByPostIds)) {
      const acfPagePosts = findPagePosts(acfTemplateIndex, pagePosts)
      if (acfPagePosts && sizeOf(acfPagePosts) > 0 && sizeOf(acfPagePosts.posts) > 0) {
        const { posts } = acfPagePosts
        handleAcfPagePosts(acfPageTemplate, pageContent, posts, handleComponent)
      }
    } else {
      handleAcfComponents(acfPageTemplate, pageContent, handleComponent)
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
      parsedContent.push(element)
    }

    for (let index = 0; index < acfPageTemplatesSorted.length; index++) {
      const acfPageTemplate = acfPageTemplatesSorted[index] as IPageTemplate<any>
      parseACFTemplete(pageContent, acfPageTemplate, index, addElement)
    }

    return parsedContent
  }

  const PageDomNodes = (): JSX.Element => {
    const { domNodes } = page
    const domList: JSX.Element[] = []
    domNodes.forEach((domNode) => {
      const ComponentsToRender = acfTemplatesFactory(domNode.content)

      if (ComponentsToRender) {
        ComponentsToRender.forEach((component) => {
          domList.push(component)
        })
      }
    })

    return (
      <div>
        {domList}
      </div>
    )
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
