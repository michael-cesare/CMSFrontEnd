import { IDomNode } from '@client/types';
import { IPageTemplate } from '@srcTypes/models';

import { getContentUploadsUrl } from '@utils/url.util';

/**
 * Converts wordpress post content to desired format
 * @method toDom
 * @category wpDom
 * @param htmlString {string} - wordpress post content
 * @param startTag {RegExp} - html starting tag in wordpress post content
 * @param endTag {string} - html ending tag in wordpress post content
 */
export const wpToDom = ( htmlString: string, startTag: RegExp, endTag: string, advanceFields: Array<IPageTemplate>  ): Array<IDomNode> =>
  htmlString
    .split( startTag )
    .map( ( item: string, index: number ) => {
      let domNode: IDomNode;
      let content = ''
      if ( item.includes( endTag ) ) {
        content = item.substring( 0, item.indexOf( endTag ) );

        advanceFields.forEach( (acf:IPageTemplate) => {
          content = content.replace(`[[${acf.placeHolder}]]`, acf.content)
        })

        domNode = {
          id:      index,
          content,
          // .replace( /<(?:.|\n)*?>/gm, '' ),
        };
      } else {
        domNode = {
          id:      -1,
          content,
        };
      }

      return domNode;
    } )
    .filter( ( item: IDomNode ) => item.id !== -1 );

/**
 * Converts wordpress post content to desired format
 * @method parseWp
 * @category wpDom
 * @param htmlString {string} - wordpress post content
 */
export const parseWp = ( htmlString: string, pageTemplates: Array<IPageTemplate> ): Array<IDomNode> => {
  // const regexSearchStyleAttribute = /(style="|style=')([a-zA-Z0-9-:; ]+)(["'])/gi
  const domFiltered = htmlString
    .replace( /(["'= ])(\/wp-content\/uploads)/g, getContentUploadsUrl() );
    // .replace( /style=(['"])([ -0-9a-zA-Z:]*[ 0-9a-zA-Z;]*)*\1/g, '' )
    // .replace( regexSearchStyleAttribute, '' );

  pageTemplates.sort(compareAcfOrder)
  const domWp = wpToDom(domFiltered, /<pageContent>|<pageContent>/g, '</pageContent>', pageTemplates);

  return domWp;
}

export const compareAcfOrder = ( a:IPageTemplate, b:IPageTemplate ) => {
  if ( a.order < b.order ){
    return -1;
  }
  if ( a.order > b.order ){
    return 1;
  }
  return 0;
}
