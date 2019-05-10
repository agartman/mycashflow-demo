var path = require('path') 
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve(`src/templates/product.tsx`)
    resolve(
      graphql(
        `
          {
            allProducts(limit: 1000) {
              edges {
                node {
                  name
                  id
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allProducts.edges.forEach(({ node }) => {
          const path = node.id
          createPage({
            path,
            component: productPageTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              ...node,
            },
          })
        })
      }),
    )
  })
}
