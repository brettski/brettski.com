// Component used to list posts
import React from "react";
import { Link } from "gatsby";
import siteConfig from "../../siteConfig";
import lodash from 'lodash';

class TagListing extends React.Component {
  getTagList() {
    const tagList = [];
    const tagSet = new Set();
    this.props.postEdges.forEach(({node}) => {
      if (node.frontmatter.tags)
        node.frontmatter.tags.forEach(tag => tagSet.add(tag))
    });
    console.log('tag count', tagSet.size);
    const tags = [...tagSet];
    tags.sort((a,b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    tags.forEach(tag => {
      tagList.push({
        path: `${siteConfig.blogPathPagePrefix}tag/${lodash.kebabCase(tag)}`,
        name: tag,
      });
    });
    return tagList;
  }

  render() {
    const tagList = this.getTagList();
    return (
      <div>
        <h5>Tags ({tagList.length})</h5>
        <ul>
        {
        tagList.map(tag => (
          <Link to={tag.path} key={tag.name}>
            <li>{tag.name}</li>
          </Link>
        ))
        }
        </ul>
      </div>
    );
  }
}

export default TagListing;
