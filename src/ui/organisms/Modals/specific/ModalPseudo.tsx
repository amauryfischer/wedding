"use client"
import Image3D from "@/app/system/[id]/solarSystem/Image3D"
import useCurrentPlanet from "@/hooks/current/use-current-planet.hook"
import useCurrentPlayerActivePlanet from "@/hooks/current/use-current-player-active-planet"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import useUserActions from "@/hooks/data/actions/use-user-actions.hook"
import useFleetsOnPosition from "@/hooks/data/entity/use-fleets-on-position.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import {
	setCurrentPlanet,
	setCurrentSendPosition
} from "@/redux/slice/current.slice"
import Flex from "@/ui/atoms/Flex"
import Button from "@/ui/atoms/buttons/Button"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"
import BModal from "@/ui/molecules/modal/BModal"
import ListFleet from "@/ui/organisms/entity/fleet/ListFleet"
import {
	Input,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`

const ModalPseudo = () => {
	const dispatch = useDispatch()
	const ships = useShips()
	const { updateUser, fetchUser } = useUserActions()
	const user = useCurrentUser()
	const currentActivePlanet = useCurrentPlayerActivePlanet()
	const [pseudo, setPseudo] = useState(user?.pseudo)

	const currentPlanet = useCurrentPlanet()
	const filteredFleets = useFleetsOnPosition(
		currentPlanet?.coordinates,
		currentPlanet?.solarSystem
	)
	const handleSave = () => {
		if (pseudo) {
			updateUser(user?.id, { pseudo })
			setTimeout(() => {
				fetchUser()
			}, 1000)
		}
	}

	if (!currentActivePlanet) {
		return null
	}

	return (
		<>
			<BModal size="4xl" isOpen={!user?.pseudo} title="Nom d'utilisateur">
				<ModalContent>
					<ModalHeader>Nom d'utilisateur</ModalHeader>
					<ModalBody>
						<div className="text-xl text-gray-500 p-4 rounded-md bg-gray-100 border border-gray-300">
							Conseil : commencez par rush un vaisseaux de collecte d'astéroides
						</div>
						<Input
							label="Nom d'utilisateur"
							value={pseudo}
							onChange={(e) => setPseudo(e.target.value)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button onClick={handleSave}>Enregistrer</Button>
					</ModalFooter>
				</ModalContent>
			</BModal>
		</>
	)
}

export default ModalPseudo
