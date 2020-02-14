/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const siteConfig = require('./siteConfig');
const lodash = require('lodash');
const moment = require('moment');

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
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/postsByTag.js`);
  const categoryTemplate = path.resolve(`./src/templates/postsByCategory.js`);
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

  const tagSet = new Set();
  const categorySet = new Set();
  const postsEdges = result.data.allMarkdownRemark.edges;

  // sort posts
  postsEdges.sort((a, b) => {
    const da = moment(a.node.frontmatter.date, siteConfig.dateFrontFormat);
    const db = moment(b.node.frontmatter.date, siteConfig.dateFrontFormat);
    if (da.isBefore(db)) return 1;
    if (db.isBefore(da)) return -1;
    return 0;
  })

  // postsEdges.forEach(({node}) => console.log(node.frontmatter.date))

  postsEdges.forEach( ({node}) => {
    // generate a list of tags
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => tagSet.add(tag));
    }
    // generate list of categories
    if (node.frontmatter.categories) {
      node.frontmatter.categories.forEach(category => categorySet.add(category));
    }

    // All blog pages - each
    createPage({
      path: `${siteConfig.blogPathPagePrefix}${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    })
  })

  tagSet.forEach(tag => {
    createPage({
      path: `${siteConfig.blogPathPagePrefix}tag/${lodash.kebabCase(tag)}`,
      component: tagTemplate,
      context: { tag }, 
    })
  })

    // TODO:create category pages
    categorySet.forEach(category => {
      createPage({
        path: `${siteConfig.blogPathPagePrefix}category/${lodash.kebabCase(category)}`,
        component: categoryTemplate,
        context: { category },
      })
    })
    // TODO:create list of categories pages
  }