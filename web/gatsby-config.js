const path = require("path");
module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    "gatsby-plugin-eslint",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: path.join(__dirname, "src", "components"),
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ],
};
