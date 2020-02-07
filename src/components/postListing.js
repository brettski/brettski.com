// Component used to list posts
import React from "react";
import { Link } from "gatsby";
import siteConfig from "../../siteConfig";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    // eslint-disable-next-line react/destructuring-assignment
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: `${siteConfig.blogPathPagePrefix}${postEdge.node.frontmatter.slug}`,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <Link to={post.path} key={post.title}>
            <h5>{post.title}</h5>
          </Link>
        ))
        }
      </div>
    );
  }
}

export default PostListing;
