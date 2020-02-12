
import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../layout';
import PostListing from '../components/postListing';

export default class PostsByTag extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts tagged as '${tag}`} />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}
export const query = graphql`
  query tagposts($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag]} }}
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
