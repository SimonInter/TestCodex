module.exports = {
  siteUrl: "https://atelier-terracotta.example",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.7
    };
  }
};
