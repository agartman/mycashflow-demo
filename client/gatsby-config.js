module.exports = {
  siteMetadata: {
    name: `MyCashflow Gatsby starter`,
    tagline: `Open source starter for combo MyCashflow and Gatsby`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-mycashflow-api`,
      options: {
        baseURL: `https://punainentupademo.mycashflow.fi/api/v1`, // the absolute path to your RESTful API
        username: `atte.gartman@gmail.com`, // the login username
        password: `d73a9e6d78c3fdd13f48a85ebb0de9e751e47c5c`, // the login password
      },
    },
  ],
}
