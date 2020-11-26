export enum EENV {
  dev = 'development',
  prod ='production',
}

/**
 * Wordpress Object types
 */
export enum EWPTypes {
  menu = 'menu',
  post = 'post',
  posts = 'posts',
  page = 'page',
  unknown = 'unknown',
}

/**
 * A list of wordpress placeholders.
 * wordpress page content has placeholders,which are replaced by ACF placeholders content.
 */
export enum EWPAcfPlaceHolders {
  cards = 'cards',
  bgImage = 'bg-image',
  unknown = 'unknown',
}

/**
 * Dom types are for dynamic generated dom elements.
 * Some of the types are from wordpress acf types
 */
export enum EDomTypes {
  cards = 'cards',
  cardInfo = 'card-info',
  bgImage = 'bg-image',
  string = 'string',
  na = 'na',
}
