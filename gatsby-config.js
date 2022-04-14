require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "< カグラボ />",
    author: {
      name: "yu-kgr",
      summary:
        "学んだ事や趣味のことなどについて、何かとごちゃごちゃしがちな思考を整理するブログです。",
    },
    description:
      "学んだ事や趣味のことなどについて、何かとごちゃごちゃしがちな思考を整理するブログです。",
    siteUrl: "https://kglabo.com/",
    social: {
      twitter: "yu_kgr",
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://wpgatsbydemo.wpengine.com/graphql`,
        schema: {
          perPage: 20,
          requestConcurrency: 5,
          previewRequestConcurrency: 2,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kglabo.com`,
        short_name: `kglabo`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon-kglabo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        sourceMap: true,
        autoLabel: "dev-only",
        labelFormat: `[local]`,
        cssPropOptimization: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-ZQQH4WWXKQ"],
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
}
