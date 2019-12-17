module.exports = {
  plugins: [
    require('precss')(),
    require('postcss-import')(),
    require('postcss-url')({ url: 'inline' }),
    require('postcss-px2units')({ comment: 'NO_RPX' }),
  ],
}
