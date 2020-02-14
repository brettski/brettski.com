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
    console.log('tag count', tagSet.length);
    tagSet.forEach(tag => {
      tagList.push({
        path: `${siteConfig.blogPathPagePrefix}tag/${lodash.kebabCase(tag)}`,
        name: lodash.kebabCase(tag),
      });
    });
    return tagList;
  }

  render() {
    const tagList = this.getTagList();
    return (
      <div>
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
