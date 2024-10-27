"use client"
import { createGlobalStyle } from "styled-components"
import colors from "./colors/colors"
import shadow from "./shadow"
import size from "./size"
import color_theme from "./colors/colors_theme"
import spacing from "./spacing"
import color_nextui from "./colors/colors_nextui"

const GlobalStyle = createGlobalStyle`
    :root {
        --gold: 1.618;
        ${colors}
        ${color_theme}
        ${color_nextui}
        ${size}
        ${spacing}
        --color-hue: 0;
        --color-saturation: 0%;
        --color-lightness: 0%;
        --bold: 700;
        ${shadow}
        --topbar-height: 64px;
        --leftbar-width: 73px;
        --rightbar-width: 473px;
        --bottombar-height: 50px;
        --navbar-height: 64px;
        --task-card-width: calc(100vw / 12);
    }
    
    nav {
        color: white !important;
    }
    * {
        &:focus {
            outline: none;
        }
        box-sizing: border-box !important;
        font-family: var(--font-manrope);
    }
    body {  
        height: calc(100vh - var(--topbar-height));
        background: unset !important;
    }
    
`

export default GlobalStyle
