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
import "./layout.css"

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

/*
@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
*/
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
  font-size: 1.5rem;
  line-height: 2;
  font-family: 'radnika_next';
}
a {
  text-decoration: none;
  color: ${theme.black};
}
button {  font-family: 'radnika_next'; }
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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <Footer />
      </div>
    </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
