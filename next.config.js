const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
});

module.exports = {
  reactStrictMode: true,
  swcMinify: true
}
