const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://t7w25cliques.netlify.app/",
      changeOrigin: true,
    })
  );
};
 
