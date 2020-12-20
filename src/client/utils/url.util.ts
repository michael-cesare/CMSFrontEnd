import { WORDPRESS_HOST } from "@common/config/envConfig";

import { isNodejs } from '@common/utils/core.util';

export const isLocalhost = (): Boolean => {
  let nodeSSRState = false;
  if (typeof window !== 'undefined' && window) {
    nodeSSRState = Boolean(
      window.location.hostname === 'localhost'
      // [::1] is the IPv6 localhost address.
      || window.location.hostname === '[::1]'
      // 127.0.0.1/8 is considered localhost for IPv4.
      || window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      ));
  }

  return nodeSSRState;
};

export const getContentUrl = (): string => {
  return `//${WORDPRESS_HOST()}`;
}

export const getContentUploadsUrl = (): string => {
  return `${getContentUrl()}/wp-content/uploads`;
}

export const isActiveRoute = (route: string) => {
  let pathname = ''
  if (isNodejs()) {
    pathname = global.context.pathname
  } else{
    pathname = window.location.pathname
  }

  return pathname.indexOf(route) > -1
}
