"use client";
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet";
import Button from "@/ui/atoms/buttons/Button"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"
import Flex from "@/ui/atoms/Flex";
import City from "@/ui/fondations/icons/City";
import First from "@/ui/fondations/icons/First";
import Galaxy from "@/ui/fondations/icons/Galaxy";
import Mails from "@/ui/fondations/icons/Mails";
import Orga from "@/ui/fondations/icons/Orga";
import Planet from "@/ui/fondations/icons/Planet";
import SolarSystem from "@/ui/fondations/icons/SolarSystem";
import Spaceship from "@/ui/fondations/icons/Spaceship";
import { Avatar, Input } from "@nextui-org/react"
import moment from "moment"
import { useRouter } from "next/navigation";
import { useState } from "react"
import styled, { css } from "styled-components"
import Chat from "./Chat"

const SFlex = styled(Flex)`
	transition: all 0.3s ease-in-out;
	width: 74px;
`



const PlanetName = styled.div<{ $disabled: boolean }>`
	// transition with delay to make it appear after the width transition
	transition: all 0.3s ease-in-out;
	color: white;
	font-size: 1rem;
	font-weight: 600;
	max-width: var(--width-internal);
	overflow: hidden;
	text-transform: capitalize;
	padding-left: 0.5rem;
	${(props) =>
		props.$disabled &&
		css`
			color: var(--grey500);
			cursor: not-allowed;
		`}
`

const PlanetWithNameContainer = styled(Flex)<{ $disabled: boolean }>`
	align-items: center;
	transition: all 0.3s ease-in-out;
	margin-right: 0.5rem;
	width: 100%;
	padding: 0.5rem;
	--gradient-background-grey-dark: linear-gradient(
		270deg,
		var(--grey700) 10%,
		var(--grey800) 100%
	);
	border-radius: 0.5rem;
	&:hover {
		${(props) =>
			props.$disabled &&
			css`
				cursor: not-allowed;
			`}
		background: var(--gradient-background-grey-dark);
		gap: 0.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
		
	}
	margin-bottom: 0.5rem;
`

const RightSideBarContainer = styled.div`
	transition: all 0.3s ease-in-out;
	margin-top: var(--topbar-height);
	height: calc(100vh - var(--topbar-height));
	width: 474px;
	background-color: black;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 50;
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: start;
	--width-internal: 0%;
	padding-right: 0.5rem;
	padding-left: 0.5rem;
	&:hover {
		transition: all 0.3s ease-in-out;
		width: 574px;
		--width-internal: 100%;
		${SFlex} {
			width: 174px;
		}
	}
`


const RightSideBar = () => {
	const planet = useCurrentPlayerActivePlanet();
	const { push } = useRouter();
	const [messages, setMessages] = useState<
		{ text: string; timestamp: Date; isMe: boolean }[]
	>([
		{
			text: "Hello",
			timestamp: new Date(),
			isMe: false
		}
	])
	const [currentMessage, setCurrentMessage] = useState<string>("")

	const menus = {
		city: {
			icon: <City width="42px" color="red200" />,
			name: "Bâtiments",
			url: `/planets/${planet?.id}`
		},
		planet: {
			icon: <Planet width="42px" />,
			name: "Orbite",
			url: "/",
			disabled: true
		},
		solarSystem: {
			icon: <SolarSystem color="yellow400" width="42px" />,
			name: "Système solaire",
			url: `/system/${planet?.solarSystem}`
		},
		universe: {
			icon: <Galaxy color="cyan500" width="42px" />,
			name: "Univers",
			url: "/universe"
		},
		spaceships: {
			icon: <Spaceship width="42px" color="caramel400" />,
			name: "Flottes",
			url: "/fleets"
		},
		empire: {
			icon: <Orga width="42px" color="emerald200" />,
			name: "Empire",
			url: "/empire",
			disabled: true
		},
		classement: {
			icon: <First width="42px" color="purple200" />,
			name: "Classement",
			url: "/classement",
			disabled: true
		},
		mails: {
			icon: <Mails width="42px" color="blue500" />,
			name: "Messagerie",
			url: "/mails",
			disabled: true
		}
	}
	return (
		<RightSideBarContainer>
			<SFlex direction="column">
				{Object.values(menus).map((el) => {
					return (
						<PlanetWithNameContainer
							onClick={() => {
								if (!el.disabled) {
									push(el.url)
								}
							}}
							$disabled={el.disabled}
							key={el.name}
						>
							{el.icon}
							<PlanetName $disabled={el.disabled}>{el.name}</PlanetName>
						</PlanetWithNameContainer>
					)
				})}
			</SFlex>
			<Chat />
		</RightSideBarContainer>
	)
};

export default RightSideBar;
