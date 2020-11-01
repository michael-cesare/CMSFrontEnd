const renderHtmlApp = (htmlDom, preloadedState, webExtractor) => {
  const nodeSSRState = preloadedState
  ? JSON.stringify(preloadedState).replace(/</g, '\\u003c')
  : {};

  const scriptTags = webExtractor ? webExtractor.getScriptTags() : '';
  const linkTags = webExtractor ? webExtractor.getLinkTags() : '';
  const styleTags = webExtractor ? webExtractor.getStyleTags() : '';

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Set up React, Webpack, and Babel</title>
      ${linkTags}
      ${styleTags}
    </head>
    <body>
      <script>console.log('html is loaded')</script>    
      <div id="main">${htmlDom}</div>
      <script>
        window.__INITIAL_STATE__ = ${nodeSSRState};
      </script>
      ${scriptTags}
      <script>console.log('html is ready')</script>
  </html>
  `;
};

export {
  renderHtmlApp,
};
