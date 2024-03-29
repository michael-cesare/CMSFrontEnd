import { IDom, IDomString } from '@client/types'
import { EDomTypes } from '@srcTypes/enums'

import { SITE_URL } from "@common/config/envConfig"
import { getContentUploadsUrl, getContentUrl } from '@utils/url.util'

/**
 * Converts wordpress post content to desired format
 * @method toDom
 * @category wpDom
 * @param htmlString {string} - wordpress post content
 * @param startTag {RegExp} - html starting tag in wordpress post content
 * @param endTag {string} - html ending tag in wordpress post content
 */
export const wpToDom = (htmlString: string, startTag: RegExp, endTag: string): Array<IDomString> =>
  htmlString
    .split(startTag)
    .map((item: string, index: number) => {
      let domNode: IDom
      let content = ''
      if (item.includes(endTag)) {
        content = item.substring(0, item.indexOf(endTag))
        domNode = {
          id: index,
          content,
          type: EDomTypes.string,
        }

        domNode.id = index
      } else {
        domNode = {
          id: -1,
          content,
          type: EDomTypes.string,
        } as IDom
      }

      return domNode
    })
    .filter((item: IDomString) => item.id !== -1)

/**
 * Converts wordpress post content to desired format
 * @method parseWp
 * @category wpDom
 * @param htmlString {string} - wordpress post content
 */
export const parseWp = (htmlString: string): Array<IDomString> => {
  // const regexSearchStyleAttribute = /(style="|style=')([a-zA-Z0-9-: ]+)(["'])/gi
  const domFiltered = htmlString
    .replace(/(["'= ])(\/wp-content\/uploads)/g, getContentUploadsUrl())
  // .replace( /style=(['"])([ -0-9a-zA-Z:]*[ 0-9a-zA-Z]*)*\1/g, '' )
  // .replace( regexSearchStyleAttribute, '' )

  const domWp = wpToDom(domFiltered, /<pageContent>|<pageContent>/g, '</pageContent>')

  return domWp
}

/**
 * Converts wordpress post url to desired frontend url
 * @method parsePostLink
 * @category wpDom
 * @param htmlString {string} - wordpress post content
 */
export const parsePostLink = (wordpressLink: string): string => {
  const contentUrl = getContentUrl()
  const frontendUrl = `//${SITE_URL()}`
  const regex = new RegExp(contentUrl, 'g')
  const frontEndLink = wordpressLink?.replace(regex, frontendUrl)

  return frontEndLink
}

/**
 * Converts wordpress image url to desired frontend url
 * @method parseWPImageLink
 * @category wpDom
 * @param htmlString {string} - wordpress post content
 */
export const parseWPImageLink = (wordpressLink: string): string => {
  return wordpressLink?.replace(/(["'= ])(\/wp-content\/uploads)/g, getContentUploadsUrl())
}
