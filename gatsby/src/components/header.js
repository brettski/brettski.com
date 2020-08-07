import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Menu from "../components/menu"
import styled from "styled-components"

const HeaderContainer = styled.div`
  flex: 0 0 20vh;
  background-color: rebeccapurple;
  display: flex;
  flex-direction: column;
  
  
`;

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <div
      style={{
        maxWidth: 960,
        padding: `1.45rem 1rem`,
        flex: 1
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <Menu />
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
