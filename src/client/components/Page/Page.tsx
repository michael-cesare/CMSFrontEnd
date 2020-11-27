import * as React from 'react';

import Content from '@components/Content';
import Cards from '@components/CardInfo/Cards';
import Paragraphs from '@components/Paragraphs/Paragraphs';

import { IPage } from '@client/types';
import {
  IPageTemplate,
  IPageTemplateBgImage,
  IPageTemplateCardInfo,
  IPageTemplateParagraphs,
} from '@srcTypes/models';

import { EDomTypes } from '@srcTypes/enums';
import { removeNextString } from '@common/utils/string.util';
import { orderByKey } from '@common/utils/array.util';

interface IOwnProps {
  page: IPage;
  advanceFields: IPageTemplate[];
}

type TAllProps = IOwnProps;

const Page: React.FC<TAllProps> = (props: TAllProps) => {
  const { page, advanceFields } = props;

  const renderBgImage = (field: IPageTemplateBgImage, index: number): JSX.Element => {
    const { content } = field;

    return (
      <Content
        contentClass="page-bg-image"
        key={`page-content-${index}`}
      >
        {content}
      </Content>
    );
  }

  /**
   * Converts wordpress acf templates to desired format baed on page content.
   * @method parseAcfTemplates
   * @category wpDom
   * @param content {string} - wordpress post/object content
   */
  const parseAcfTemplates = (content: string): JSX.Element[] => {
    let parsedContent: JSX.Element[] = []
    let pageContent = content

    const acfSorted = advanceFields.sort((a: any, b: any) => orderByKey(a, b, 'order'))

    acfSorted.forEach((acf: IPageTemplate) => {
      let placeHolderText
      if (acf.type === EDomTypes.bgImage) {
        const acfField = acf as IPageTemplateBgImage
        placeHolderText = `[[${acfField.placeHolder}]]`
        const indexOf = pageContent.indexOf(placeHolderText)
        if (indexOf > -1) {
          const field: JSX.Element = renderBgImage(acfField, acf.order)
          parsedContent.push(field);
          pageContent = removeNextString(pageContent,  placeHolderText);
        }
      } else if (acf.type === EDomTypes.cards) {
        const acfField = acf as IPageTemplateCardInfo
        placeHolderText = `[[${acfField.placeHolder}]]`
        const indexOf = pageContent.indexOf(placeHolderText)
        if (indexOf > -1) {
          const field: JSX.Element = <Cards pageTemplateCardInfo={acfField} index={acf.order} />
          parsedContent.push(field);
          pageContent = removeNextString(pageContent,  placeHolderText);
        }
      } else if (acf.type === EDomTypes.paragraphs) {
        const acfField = acf as IPageTemplateParagraphs
        placeHolderText = `[[${acfField.placeHolder}]]`
        const indexOf = pageContent.indexOf(placeHolderText)
        if (indexOf > -1) {
          const field: JSX.Element = <Paragraphs paragraphs={acfField} index={acf.order} />
          parsedContent.push(field);
          pageContent = removeNextString(pageContent,  placeHolderText);
        }
      }
    })

    return parsedContent;
  }

  const DomContent = (): JSX.Element => {
    const { domNodes } = page;
    const domList: JSX.Element[] = [];

    domNodes.forEach((domNode) => {
      const ComponentsToRender = parseAcfTemplates(domNode.content)

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
        <DomContent />
      </div>
    </div>
  )
}

export default Page;
