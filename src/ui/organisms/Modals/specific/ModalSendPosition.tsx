"use client";
import useCurrentSendPosition from "@/hooks/current/use-current-send-position";
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook";
import useFleets from "@/hooks/data/entity/use-fleets.hook";
import useShips from "@/hooks/data/entity/use-ships.hook";
import useTasks from "@/hooks/data/entity/use-tasks.hook";
import { setCurrentSendPosition } from "@/redux/slice/current.slice"
import { TaskType } from "@/type/data/ITask";
import Flex from "@/ui/atoms/Flex/Flex"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton";
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton";
import Spaceship from "@/ui/fondations/icons/Spaceship";
import BModal from "@/ui/molecules/modal/BModal";
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react"
import moment from "moment"
import { useDispatch } from "react-redux";
import styled from "styled-components"
import ListFleet from "../../entity/fleet/ListFleet"
import Attack from "@/ui/fondations/icons/Attack"
import { IFleet } from "@/type/data/IFleet"

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 100px 140px 300px 100px;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const ModalSendPosition = () => {
	const fleets = useFleets()
	const ships = useShips()
	const currentSendPosition = useCurrentSendPosition()
	const dispatch = useDispatch()
	const { fetchTasks, createTask } = useTasksActions()
	const tasks = useTasks()
	const user = useCurrentUser()

	
	return (
		<BModal
			size={"5xl"}
			isOpen={!!currentSendPosition}
			onOpenChange={() => {
				dispatch(setCurrentSendPosition(undefined))
			}}
			scrollBehavior="inside"
			title="Selectionnez une flotte"
		>
			<ModalContent>
				<ModalHeader>Selectionnez une flotte</ModalHeader>
				<ModalBody>
					<ListFleet
						fleets={Object.values(fleets)}
						additionalRowsNoTasks={
							[
								(fleet: IFleet) => (
									<SendFleetButton
										isDisabled={
											fleet.solarSystem === currentSendPosition?.solarSystem &&
											fleet?.coordinates?.x ===
												currentSendPosition?.coordinates?.x &&
											fleet?.coordinates?.y ===
												currentSendPosition?.coordinates?.y &&
											fleet?.coordinates?.z ===
												currentSendPosition?.coordinates?.z
										}
										onClick={() => {
											createTask({
												type: TaskType.FLYING_FLEET,
												endDate: moment().add(10, "seconds").format(),
												details: {
													solarSystem: currentSendPosition.solarSystem,
													coordinates: {
														x: currentSendPosition.coordinates.x,
														y: currentSendPosition.coordinates.y,
														z: currentSendPosition.coordinates.z
													},
													fleetId: fleet.id
												},
												userId: user.id
											})
											fetchTasks()
										}}
										title="Envoyer"
									/>
								)
							] as any
						}
					/>
				</ModalBody>
				<ModalFooter>
					<CloseElementButton
						onClick={() => dispatch(setCurrentSendPosition(undefined))}
					/>
				</ModalFooter>
			</ModalContent>
		</BModal>
	)
};

export default ModalSendPosition;
