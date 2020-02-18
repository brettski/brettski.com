/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from "../components/header"
import Footer from "../components/footer"
//import "./layout.css"

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  fontFamily: '"Gill Sans", sans-serif',
};

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  padding: 0;
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.3;
  font-family: ${theme.fontFamily};
  box-sizing: border-box
}
a {
  text-decoration: none;
  color: ${theme.black};
}
`;

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 960px;

`;

const ChildrenContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0 1rem;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SiteContainer>
      <Header siteTitle={data.site.siteMetadata.title} />
      <ChildrenContainer>
        <main>{children}</main>
      </ChildrenContainer>
      <Footer />
    </SiteContainer>  
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
