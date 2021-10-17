import { IWPPost, ICardInfo, IBrief } from '@srcTypes/models'

import { parsePostLink, parseWPImageLink } from '@utils/wpDom.util'

/**
 * maps posts to card info objects
 * @param posts any post type posts
 */
export const mapPostsToCards = (posts: IWPPost[]): Array<ICardInfo> => {
  const cardInfoList = [] as Array<ICardInfo>
  posts.forEach((post: IWPPost) => {
    const cardInfo: ICardInfo = {
      title: post.title,
      image: parseWPImageLink(post.thumbnail),
      text: post.content.trim(),
      buttonLink: parsePostLink(post.link),
    }

    cardInfoList.push(cardInfo)
  })
  return cardInfoList
}

/**
 * maps posts to IBrief objects
 * @param posts any post type posts
 */
export const mapPostsToBriefs = (posts: IWPPost[]): Array<IBrief> => {
  const briefs = [] as Array<IBrief>
  posts.forEach((post: IWPPost) => {
    const brief: IBrief = {
      title: post.title,
      image: parseWPImageLink(post.thumbnail),
      text: post.content.trim(),
      link: parsePostLink(post.link),
    }

    briefs.push(brief)
  })
  return briefs
}

