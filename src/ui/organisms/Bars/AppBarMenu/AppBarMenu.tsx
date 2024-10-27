"use client"
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import styled from "styled-components"
import Link from "next/link"
import { useLocation } from "react-use"
import { useRouter } from "next/navigation"
const ResourcesBox = styled.div`
  width: fit-content;
`

const StyledAppBar = styled(Navbar)`
  padding: 0.25rem;
  background-color: var(--primary);
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
	const location = useLocation()
	const router = useRouter()
	return (
		<StyledAppBar position="static" className="flex flex-row justify-center">
			<NavbarContent justify="start" />
			<NavbarContent className="gap-4" justify="center">
				<NavbarItem isActive={location.pathname === "/rsvp"}>
					<Button onPress={() => router.push("/rsvp")} variant="light">
						<div
							className={`text-white text-md ${location.pathname === "/rsvp" ? "text-lg font-semibold" : ""}`}
						>
							Réservation
						</div>
					</Button>
				</NavbarItem>
				<NavbarItem isActive={location.pathname === "/gift"}>
					<Button onPress={() => router.push("/gift")} variant="light">
						<div
							className={`text-white text-md ${location.pathname === "/gift" ? "text-lg font-semibold" : ""}`}
						>
							Liste de cadeaux
						</div>
					</Button>
				</NavbarItem>
				<NavbarItem isActive={location.pathname === "/gallery"}>
					<Button onPress={() => router.push("/gallery")} variant="light">
						<div
							className={`text-white text-md ${location.pathname === "/gallery" ? "text-lg font-semibold" : ""}`}
						>
							Gallerie photo
						</div>
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end" />
		</StyledAppBar>
	)
}
