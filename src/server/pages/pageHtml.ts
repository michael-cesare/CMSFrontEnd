const renderHtmlApp = (htmlDom: any, preloadedState: any, webExtractor: any, styleTags: any) => {
  const nodeSSRState = preloadedState
    ? JSON.stringify(preloadedState).replace(/</g, '\\u003c')
    : {};

  const scriptTags = webExtractor ? webExtractor.getScriptTags() : '';
  const linkTags = webExtractor ? webExtractor.getLinkTags() : '';
  const extractorStyleTags = webExtractor ? webExtractor.getStyleTags() : '';

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Set up React, Webpack, and Babel</title>
      ${linkTags}
      ${extractorStyleTags}
      ${styleTags}
    </head>
    <body><div id="main">${htmlDom}</div><script id="__NODE_STATE__">window.__INITIAL_STATE__ = ${nodeSSRState};</script>${scriptTags}</body>
  </html>
  `;
};

export {
  renderHtmlApp,
};
