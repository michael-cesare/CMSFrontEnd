import * as React from 'react'

import Content from '@client/components/Content/Content'

import { IWPPost } from '@srcTypes/models'

import { isEmpty } from '@common/utils/core.util'

interface IOwnProps {
  data: IWPPost
}

type TAllProps = IOwnProps

const Post: React.FC<TAllProps> = (props: TAllProps) => {
  const { data: {
    id,
    slug,
    date,
    title,
    content,
    thumbnail,
  } } = props

  const postContent = () => {
    return !isEmpty(content) && (
      <Content
        contentClass={`post-content-${slug}`}
        key={`post-content-${slug}`}
      >
        {content}
      </Content>
    )
  }

  return (
    <div className="post-container" id={id.toString()}>
      <span>{title}</span>
      {postContent()}
      {thumbnail}
      {date}
    </div>
  )
}

export default Post
