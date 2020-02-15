import { Link } from "gatsby"
import React from "react"

const Menu = ({ siteTitle }) => (
    <div>
        <Link to="/"><button>Main</button></Link>
        <Link to="/blog"><button>Blog</button></Link>
        <Link to="/tools"><button>Tool</button></Link>
    </div>
)

export default Menu;