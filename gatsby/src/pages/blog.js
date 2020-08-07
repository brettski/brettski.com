import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import BlogNav from "../components/blognav"
import PostListing from "../components/postListing";
import TagListing from "../components/tagListing";
import CategoryListing from "../components/categoryListing";
import styled from "styled-components";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: red;
`

const LeftBlogNav = styled.div`
  background-color: beige;
  padding: .8rem;
  flex: 0 0 20vw;
`

const BlogMain = styled.div`
  background-color: lightgreen;
  padding: 1rem;
  flex: 1;
`

export default ({data}) => (
  <Layout>
    <SEO title="Blog" />
    <h1>Stuff From an IT Slug</h1>
    <BlogNav />
    <BlogContainer>
      <LeftBlogNav>
        <TagListing postEdges={data.allMarkdownRemark.edges} />
        <CategoryListing postEdges={data.allMarkdownRemark.edges} />
      </LeftBlogNav>
      <BlogMain>
        'main'
      </BlogMain>
    </BlogContainer>
    <PostListing postEdges={data.allMarkdownRemark.edges} />
  </Layout>
)

export const pageQuery = graphql`
  query getAllPosts {
    allMarkdownRemark (
      sort: {fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            date
            title
            tags
            categories
            slug
          }
        }
      }
    }
  }
`  