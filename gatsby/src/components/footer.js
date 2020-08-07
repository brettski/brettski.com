//import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const FootContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e8e8e8;
  div {
    margin: 0 auto;
  }
  flex: 0 0 10vh;
`

const Footer = () => (
  <FootContainer>
    <div>
    © 2020, Brettski, v5
    <p>
    Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
    </p>
  </div>
</FootContainer>

)

export default Footer;