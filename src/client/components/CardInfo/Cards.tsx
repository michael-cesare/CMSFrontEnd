import * as React from 'react';

import Content from '@client/components/Content/Content';

import { ICardInfo } from '@srcTypes/models';

interface IOwnProps {
  cardInfoList: Array<ICardInfo>,
  index?: number;
}

type TAllProps = IOwnProps;

const Cards: React.FC<TAllProps> = (props: TAllProps) => {
  const { cardInfoList, index } = props;

  const renderCards = (): JSX.Element[] => {
    return cardInfoList?.map && cardInfoList.map(( { text }, key) => (
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
