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
 * BgImage is a full background image, and an overlay with transparency full.
 * This means that component takes full size of the screen, and skretches an image in its background with text above it.
 * @param props 
 */
const BgImage: React.FC<TAllProps> = (props: TAllProps) => {
  const { bgImage, bgImage: { url, header, paragraphs }, index } = props

  const bgImageheader = () => {
    const { text, style } = header
    const newStyle = Object.assign(style, { backgroundColor: 'rgba(0,0,0,0)' })

    return !isEmpty(header) && (
      <Content
        key='bg-image_title'
        uid="bg-image_title"
        contentClass="bg-image_title-content"
        inlineStyle={newStyle}
      >
        {text}
      </Content>
    )
  }

  const renderParagraph = ({ style, text }: IParagraph, key: number): JSX.Element => {
    const newStyle = Object.assign(style, { backgroundColor: 'rgba(0,0,0,0)' })

    return (
      <Content
        key={`bg-image_paragraph-${key}`}
        uid={`bg-image_paragraph-${key}`}
        contentClass="bg-image_paragraph-content"
        inlineStyle={newStyle}
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
