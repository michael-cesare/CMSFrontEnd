import * as React from 'react'

import Content from '@client/components/Content/Content'
import Anchor from '@client/components/Anchor/Anchor'

import { ICardInfo } from '@srcTypes/models'

interface IOwnProps {
  cardInfoList: Array<ICardInfo>,
  index?: number
}

type TAllProps = IOwnProps

const Cards: React.FC<TAllProps> = (props: TAllProps) => {
  const { cardInfoList, index } = props

  const renderCard = ({ title, image, text, buttonLink }: ICardInfo, key: number): JSX.Element => {
    return (
      <div key={`card-${key}`} className="card">
        <div key={`card-info-${key}`} className="card-info">
          <div
            key={`card-info-${key}_image`}
            className="card-info_image"
          >
            <img src={image} alt={title} />
          </div>
          <div
            key={`card-info-${key}_body`}
            className="card-info_body"
          >
            <Content
              key={`card-info-${key}_body-title`}
              contentClass="card-info_body-title"
            >
              {title}
            </Content>
            <Content
              key={`card-info-${key}_body-text`}
              contentClass="card-info_body-text"
            >
              {text}
            </Content>
          </div>
          <Anchor
            id={key}
            to={buttonLink}
            contentClass="card-info_action"
          >
            {"Go To Career"}
          </Anchor>
        </div>
      </div>
    )
  }

  return (
    <div key={`cards-${index}`} className="cards">
      {cardInfoList?.map && cardInfoList.map(renderCard)}
    </div>
  )
}

export default Cards
