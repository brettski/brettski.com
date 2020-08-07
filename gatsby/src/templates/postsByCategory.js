
import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../layout';
import PostListing from '../components/postListing';

export default class PostsByCategory extends React.Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <div className="category-container">
          <Helmet title={`Posts with category as '${category}`} />
          <h3>Showing Posts for Category {category}</h3>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}
export const query = graphql`
  query categoryPosts($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`
