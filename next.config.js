//	Example for static generation
// const fetch = require('isomorphic-unfetch');

const path = require('path');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withStylus = require('@zeit/next-stylus');

module.exports = withStylus(withCSS(withImages({
//	Example for static generation
//   exportPathMap: async function() {
//     const paths = {
//       '/': { page: '/' },
//       '/about': { page: '/about' }
//     };
//     const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//     const data = await res.json();
//     const shows = data.map(entry => entry.show);

//     shows.forEach(show => {
//       paths[`/p/${show.id}`] = { page: '/p/[id]', query: { id: show.id } };
//     });

//     return paths;
//   },
  webpack (config, options) {
	['components','store','assets','styles','utils','layouts'].forEach((item) => config.resolve.alias[item] = path.join(__dirname, item))
    return config
  }
})));