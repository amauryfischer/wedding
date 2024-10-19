"use client"
import useCurrentShip from "@/hooks/current/use-current-ship.hook"
import { setCurrentShip } from "@/redux/slice/current.slice"
import ShipService from "@/services/ShipService"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import ShipNumberModules from "@/ui/molecules/entity/ship/ShipNumberModules";
import ShipStats from "@/ui/molecules/entity/ship/ShipStats";
import BModal from "@/ui/molecules/modal/BModal"
import {
	Image,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react"
import { useDispatch } from "react-redux"

const ModalShip = () => {
	const dispatch = useDispatch()

	const currentShip = useCurrentShip()
	if (!currentShip) return null
	return (
		<BModal
			size={"5xl"}
			isOpen={!!currentShip}
			onOpenChange={() => {
				dispatch(setCurrentShip(undefined))
			}}
			scrollBehavior="inside"
			title="Selectionnez une flotte"
		>
			<ModalContent>
				<ModalHeader>
					<Image
						height={200}
						src={ShipService.getAllShips()[currentShip.class].img}
					/>
					Vaisseau : {currentShip?.name}
				</ModalHeader>
				<ModalBody>
					<h3>Modules</h3>
					<ShipStats ship={currentShip} />
					<ShipNumberModules ship={currentShip} />
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentShip(undefined))}
					/>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
};

export default ModalShip;
