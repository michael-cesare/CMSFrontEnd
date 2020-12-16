import * as React from 'react'

import Content from '@components/Content/Content'
import { isEmpty } from '@common/utils/core.util'
import { IBgImage, IParagraph } from '@srcTypes/models'

interface IOwnProps {
  bgImage: IBgImage,
  index?: number
}

type TAllProps = IOwnProps

/**
 * BgImage is a full background image. This means that component takes full size of the screen, and skretches an image in its background.
 * @param props 
 */
const BgImage: React.FC<TAllProps> = (props: TAllProps) => {
  const { bgImage, bgImage: { url, header, paragraphs }, index } = props

  const bgImageheader = () => {
    const { text, style } = header

    return !isEmpty(header) && (
      <Content
        uid="bg-image-header"
        contentClass="bg-image_header"
        inlineStyle={style}
      >
        {text}
      </Content>
    )
  }

  const renderParagraph = ({ style, text }: IParagraph, key: number): JSX.Element => {
    return (
      <Content
        uid={`paragraph-${key}`}
        contentClass="paragraph"
        inlineStyle={style}
      >
        {text}
      </Content>
    )
  }

  return bgImage && (
    <div
      key={`bg-image-${index}`}
      className="bg-image"
      style={{ backgroundImage: `url(${url})` }}
    >
      <div className="overlay">
      </div>
      <div className="pad-section relative">
        {bgImageheader()}
        {paragraphs?.map && paragraphs.map(renderParagraph)}
      </div>
    </div>
  )
}

export default BgImage
