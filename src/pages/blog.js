import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import PostListing from "../components/postListing";
import TagListing from "../components/tagListing";

export default ({data}) => (
  <Layout>
    <SEO title="Blog" />
    <h1>Stuff From an IT Slug</h1>
    <PostListing postEdges={data.allMarkdownRemark.edges} />
    <TagListing postEdges={data.allMarkdownRemark.edges} />
  </Layout>
)

export const pageQuery = graphql`
  query getAllPosts {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            date
            title
            tags
            slug
          }
        }
      }
    }
  }
`  