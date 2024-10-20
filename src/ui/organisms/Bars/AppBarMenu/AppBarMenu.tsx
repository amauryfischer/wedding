"use client"
import { Navbar, NavbarContent } from "@nextui-org/react"
import styled from "styled-components"
const ResourcesBox = styled.div`
  width: fit-content;
`

const StyledAppBar = styled(Navbar)`
  padding: 0.25rem;
  background-color: black !important;
  position: fixed !important;
  box-shadow: 0px 3px 3px -2px rgb(255 255 255 / 20%),
    0px 3px 4px 0px rgb(255 255 255 / 14%),
    0px 1px 8px 0px rgb(255 255 255 / 12%) !important;
  height: var(--navbar-height) !important;
  margin-top: calc(-1 * var(--navbar-height));
  z-index: 1000;
  & > header {
    max-width: none !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
`

export default function AppBarMenu() {
	return (
		<StyledAppBar position="static">
			<NavbarContent>coucou</NavbarContent>
		</StyledAppBar>
	)
}
