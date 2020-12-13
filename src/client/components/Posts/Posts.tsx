import * as React from 'react'

import Cards from '@components/CardInfo/Cards'

import {
  IWPPosts,
  ICardInfo,
} from '@srcTypes/models'

import { mapPostsToCards } from '@utils/post.util'

interface IOwnProps {
  data: IWPPosts
}

type TAllProps = IOwnProps

const Posts: React.FC<TAllProps> = (props: TAllProps) => {
  const { data } = props

  const PostsDomNodes = (): JSX.Element => {
    const { posts } = data
    const cardInfoList: Array<ICardInfo> = mapPostsToCards(posts)

    return (
      <Cards cardInfoList={cardInfoList} index={1} />
    )
  }

  return (
    <div className="posts-container">
      <PostsDomNodes />
    </div>
  )
}

export default Posts
