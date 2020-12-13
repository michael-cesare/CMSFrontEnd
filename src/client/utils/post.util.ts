import { IWPPost, ICardInfo } from '@srcTypes/models'

import { parsePostLink, parseWPImageLink } from '@utils/wpDom.util'

/**
 * maps posts to card info objects
 * @param posts any post type posts
 */
export const mapPostsToCards = (posts: IWPPost[]): Array<ICardInfo> => {
  const cardInfoList = [] as Array<ICardInfo>
  posts.forEach((post: IWPPost) => {
    const cardInfo = {
      title: post.title,
      image: parseWPImageLink(post.thumbnail),
      text: post.content.trim(),
      buttonLink: parsePostLink(post.link),
    } as ICardInfo

    cardInfoList.push(cardInfo)
  })
  return cardInfoList
}
