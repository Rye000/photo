/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'export',
  exportPathMap: async function () {
    const paths = {
      '/': { page: '/' },
    
    };

    for (let i = 1; i <= 100; i++) {
      paths[`/Album/${i}`] = { page: '/Album/[albumId]', query: { albumId: `${i}` } };
    }

    return paths;
  },
 
};

