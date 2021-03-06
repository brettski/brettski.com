import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout"

export default class BlogPost extends React.Component {
  render() {
    const { data } = this.props;
    const post = data.markdownRemark;
    return (
      <Layout>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <h2>{post.frontmatter.date}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    )
  }
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }

`