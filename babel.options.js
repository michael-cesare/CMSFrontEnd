function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web')
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader')
}

module.exports = api => {
  const web = isWebTarget(api);
  const webpack = isWebpack(api);

  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'entry' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: !web ? { node: 'current' } : {
            esmodules: false, //  if you set esmodules to true, browsers targets will be ignored.
            browsers: '> 2%',
            chrome: '58',
            ie: '10',
          },
          modules: webpack ? false : 'commonjs',
        },
      ],
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-modules-commonjs",
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-transform-spread',
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-template-literals',
      'babel-plugin-react-css-modules',
      "@loadable/babel-plugin",
    ],
  }
}
