import * as React from 'react';

import Content from '@client/components/Content/Content';

import { IPageTemplateCardInfo } from '@srcTypes/models';

interface IOwnProps {
  pageTemplateCardInfo: IPageTemplateCardInfo,
  index?: number;
}

type TAllProps = IOwnProps;

const Cards: React.FC<TAllProps> = (props: TAllProps) => {
  const { pageTemplateCardInfo, index } = props;

  const renderCards = (): JSX.Element[] => {
    const { content } = pageTemplateCardInfo;

    return content.map(( { text }, key) => (
      <Content
        key={`card-info-${key}`}
        contentClass="card-info"
      >
        {text}
      </Content>
    ) )
  }

  return (
    <div key={`cards-${index}`} className="cards">
      {renderCards()}
    </div>
  )
}

export default Cards;
