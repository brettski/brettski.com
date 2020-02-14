import { Link } from "gatsby"
import React from "react"

const Header = ({ siteTitle }) => (
  <div className="menu-container">
    <ul>
      <Link to="/"><li>Main</li></Link>
      <Link to="/blog"><li>Blog</li></Link>
      <Link to="/"><li>Tools</li></Link>
    </ul>
  </div>
)

export default Header;