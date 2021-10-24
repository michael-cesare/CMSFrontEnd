import * as React from 'react'

import Content from '@components/Content/Content'
import Anchor from '@components/Anchor/Anchor'

import { ICardInfo, IStyle } from '@srcTypes/models'

interface IOwnProps {
  cardInfoList: Array<ICardInfo>,
  index?: number
}

type TAllProps = IOwnProps

/**
 * Cards are ideal for short information about a subject.
 * @param props 
 */
const Cards: React.FC<TAllProps> = (props: TAllProps) => {
  const { cardInfoList, index } = props

  const titleStyle: IStyle = {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: '1rem',
    color: 'rgba(0,0,0,1)',
    fontSize: '1.2rem',
  }

  const textStyle: IStyle = {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: '1rem',
    color: 'rgba(0,0,0,1)',
    fontSize: '1.2rem',
  }

  const renderCard = ( cardInfo: ICardInfo, key: number): JSX.Element => {
    const { title, image, text, buttonLink } = cardInfo

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
              uid={`card-info-${key}_body-title`}
              contentClass="card-info_body-title"
              inlineStyle={titleStyle}
            >
              {title}
            </Content>
            <Content
              uid={`card-info-${key}_body-text`}
              contentClass="card-info_body-text"
              inlineStyle={textStyle}
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
