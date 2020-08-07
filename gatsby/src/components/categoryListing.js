// Component used to list posts by Category
import React from "react";
import { Link } from "gatsby";
import siteConfig from "../../siteConfig";
import lodash from 'lodash';
import CategoryList from '../styles/listings';

class CategoryListing extends React.Component {
  getCategoryList() {
    const categoryList = [];
    const categorySet = new Set();
    this.props.postEdges.forEach(({node}) => {
      if (node.frontmatter.categories)
        node.frontmatter.categories.forEach(category => categorySet.add(category))
    });
    console.log('category count', categorySet.size);
    const cats = [...categorySet];
    cats.sort((a,b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    cats.forEach(category => {
      categoryList.push({
        path: `${siteConfig.blogPathPagePrefix}category/${lodash.kebabCase(category)}`,
        name: category,
      });
    });
    return categoryList;
  }

  render() {
    const categoryList = this.getCategoryList();
    return (
      <CategoryList>
        <h5>Categories ({categoryList.length})</h5>
        <ul>
        {
        categoryList.map(category => (
          <Link to={category.path} key={category.name}>
            <li>{category.name}</li>
          </Link>
        ))
        }
        </ul>
      </CategoryList>
    );
  }
}

export default CategoryListing;
