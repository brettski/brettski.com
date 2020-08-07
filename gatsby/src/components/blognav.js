import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const BlognavContainer = styled.div`
  display:flex;
  flex-direction: row;
  margin: 0 0 0 5rem;
  

  .navItem {
    padding: 0 1vw;
    margin: 5px;
    background-color: lightgrey;
    border-radius: 3px;
    text-align: center;
  }
`

const BlogNav = () => (
  <BlognavContainer>
    <div className='navItem'>Archive</div>
    <div className='navItem'>Category</div>
    <div className='navItem'>Tag</div>
    <div className='navItem'>All</div>
  </BlognavContainer>
)

export default BlogNav;