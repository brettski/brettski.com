/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const siteConfig = require('./siteConfig');

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   // Not running this as the node contains the data we need at this time.

//   const { createNodeField } = actions;
//   if (node.internal.type === 'MarkdownRemark') {
//     console.log('onCreateNode', node.internal.type, node.frontmatter.slug);
//     createNodeField({
//       node,
//       name: 'slug',
//       value:node.frontmatter.slug
//     })
//   }
// }

exports.createPages = async ({ graphql, actions }) => {
  const path = require('path');
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              date
              title
              slug
              link
              layout
              author
              categories
              tags
            }
            excerpt
            html
            timeToRead
            wordCount {
              paragraphs
              sentences
              words
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error('graphql error createPages', result.errors);
    throw result.errors;
  }

  const postsEdges = result.data.allMarkdownRemark.edges;

  // sort posts
  // postEdges.sort()

  postsEdges.forEach( ({node}) => {
    createPage({
      path: `${siteConfig.blogPathPagePrefix}${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.frontmatter.slug
      }
    })
  })
}