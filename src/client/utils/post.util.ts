import { IWPPost, ICardInfo } from '@srcTypes/models';

/**
 * maps posts to card info objects
 * @param posts any post type posts
 */
export const mapPostsToCards = (posts: IWPPost[]): Array<ICardInfo> => {
  const cardInfoList = [] as Array<ICardInfo>
  posts.forEach((post: IWPPost) => {
    const cardInfo = {
      title: post.title,
      image: post.thumbnail,
      text: post.content,
      buttonLink: post.link,
    } as ICardInfo;

    cardInfoList.push(cardInfo)
  })
  return cardInfoList;
}
