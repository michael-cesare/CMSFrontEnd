import * as React from 'react'

import Content from '@components/Content/Content'
import BriefBody from '@components/Briefs/BriefBody'
import Anchor from '@components/Anchor/Anchor'

import { IBrief, IStyle } from '@srcTypes/models'

interface IOwnProps {
  briefs: Array<IBrief>,
  index?: number,
  titleStyle: IStyle,
  textStyle: IStyle,
  bodyStyle: IStyle,
}

type TAllProps = IOwnProps

/**
 * Briefs are ideal for short information about a subject, with extra control on styles.
 * @param props 
 */
const Briefs: React.FC<TAllProps> = (props: TAllProps) => {
  const { briefs, index, titleStyle, textStyle } = props

  const renderBriefTitle = (title: string, key: number) => {
    return title && (
      <Content
        uid={`brief-info-${key}_body-text`}
        contentClass="brief-info_body-text"
        inlineStyle={titleStyle}
      >
        {title}
      </Content>
    )
  }

  const renderBriefText = (text: string, key: number, show: boolean) => {
    return show && text && (
      <Content
        uid={`brief-info-${key}_body-text`}
        contentClass="brief-info_body-text"
        inlineStyle={textStyle}
      >
        {text}
      </Content>
    )
  }

  const renderBrief = (brief: IBrief, key: number): JSX.Element => {
    const { title, image, text, link } = brief

    return (
      <div key={`brief-${key}`} className="brief">
        <div key={`brief-info-${key}`} className="brief-info">
          <Anchor
            id={key}
            to={link}
            contentClass="brief-info_action"
          >
            <div
              key={`brief-info-${key}_image`}
              className="brief-info_image"
            >
              <img src={image} alt={title} />
            </div>
          </Anchor>
          <div className="fade-overlay">
          </div>
          <BriefBody
            id={`brief-info-${key}_body`}
            contentClass="brief-info_body"
          >
            <>
              {renderBriefTitle(title, key)}
              {renderBriefText(text, key, false)}
            </>
          </BriefBody>
        </div>
      </div>
    )
  }

  return (
    <div key={`briefs-${index}`} className="briefs">
      {briefs?.map && briefs.map(renderBrief)}
    </div>
  )
}

export default Briefs
