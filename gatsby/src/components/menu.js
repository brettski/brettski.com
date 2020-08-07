import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 1rem;
    flex: 0;

    > div:hover, 
    > div a:hover {
        background-color: grey;
        color: white;
    }
    .menuItem {
        padding: 0 1vw;
        margin: 5px;
        background-color: white;
        border-radius: 3px;
        flex: 0 0 10vw;
        text-align: center;
    }
`

const Menu = ({ siteTitle }) => (
    <MenuContainer>
        <div className='menuItem'><Link to="/">Main</Link></div>
        <div className='menuItem'><Link to="/blog">Blog</Link></div>
        <div className='menuItem'><Link to="/tools">Tool</Link></div>
    </MenuContainer>
)

export default Menu;