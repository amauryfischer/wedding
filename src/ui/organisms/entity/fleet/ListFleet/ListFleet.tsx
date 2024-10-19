import { IFleet } from "@/type/data/IFleet"
import React from "react"
import { FleetGridContainer } from "./ListFleet.styled"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { setCurrentFleet } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"
import ManageButton from "@/ui/atoms/buttons/ManageButton"
import {
	Avatar,
	AvatarGroup,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@nextui-org/react"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import { TaskType } from "@/type/data/ITask"
import moment from "moment"
import FuelBar from "../FuelBar"
import FleetService from "@/services/FleetService"
import Button from "@/ui/atoms/buttons/Button"
import BProgress from "@/ui/molecules/progress/BProgress"
import { ShieldProgress } from "@/ui/molecules/progress/BProgress/BProgress.styled"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import Attack from "@/ui/fondations/icons/Attack"
import Mine from "@/ui/fondations/icons/Mine"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"

const ListFleet = ({
	fleets,
	additionalRows,
	additionalRowsNoTasks
}: {
	fleets: IFleet[]
	additionalRows?: Array<(fleet: IFleet) => JSX.Element>
	additionalRowsNoTasks?: Array<(fleet: IFleet) => JSX.Element>
}) => {
	const user = useCurrentUser()
	const ships = useShips()
	const dispatch = useDispatch()
	const tasks = useTasks()


	const ownerFleets = Object.values(fleets).filter(
		(fleet) => fleet.userId === user?.id
	)
	return (
		<FleetGridContainer
			$numberOfRows={
				(additionalRows === undefined ? 5 : 5 + additionalRows.length) +
				(additionalRowsNoTasks === undefined ? 0 : additionalRowsNoTasks.length)
			}
		>
			{ownerFleets.map((fleet) => {
				const shipIds = fleet.shipIds ?? []
				const shipList = shipIds.map((shipId) => ships[shipId])
				const shipClasses = shipList.map(
					(ship) => ShipService.getAllShips()[ship?.class]
				)
				const assembleFleetTask = Object.values(tasks).find(
					(task) =>
						task.type === TaskType.ASSEMBLE_FLEET &&
						task.details.fleetId === fleet.id
				)
				const fightingTasks = Object.values(tasks).filter(
					(task) =>
						task.type === TaskType.FIGHT &&
						task.details?.fleetIds.includes(fleet.id)
				)
				const flyingTask = Object.values(tasks).find(
					(task) =>
						task.type === TaskType.FLYING_FLEET &&
						task.details?.fleetId === fleet.id
				)
				const minigTask = Object.values(tasks).find(
					(task) =>
						task.type === TaskType.COLLECT_ASTEROIDS &&
						task.details?.fleetId === fleet.id
				)
				const isFlying = !!flyingTask
				const isFighting = fightingTasks.some((task) =>
					task.details?.fleetIds.includes(fleet.id)
				)
				const isMining = minigTask?.details?.fleetId === fleet.id

				// Determine the correct endDate based on the task type
				const endDate = isFlying
					? flyingTask?.endDate
					: isFighting
						? fightingTasks.find((task) =>
								task.details?.fleetIds.includes(fleet.id)
							)?.endDate
						: isMining
							? minigTask?.endDate
							: undefined

				const leftTime = endDate
					? moment.duration(moment(endDate).diff(moment())).humanize()
					: undefined
				return (
					<React.Fragment key={fleet.id}>
						<AvatarGroup>
							{shipClasses.map((shipClass) => (
								<Avatar
									src={shipClass?.img}
									radius="lg"
									size="lg"
									isBordered
									key={shipClass?.id}
								/>
							))}
						</AvatarGroup>
						<div className="text-lg font-bold text-white">{fleet.name}</div>

						<div className="text-white">
							{fleet.solarSystem}:{fleet.coordinates?.x}:{fleet.coordinates?.y}:
							{fleet.coordinates?.z}
						</div>
						<div className="text-white min-w-[200px] flex flex-col gap-2">
							<div className="text-default-200 text-sm">Fuel</div>
							<FuelBar
								progress={
									(fleet?.fuel * 100) /
									FleetService.getTotalFuel({
										ships: shipList
									})
								}
							/>
						</div>

						<>
							{isFlying && (
								<div className="flex gap-1 flex-col">
									<div className="flex gap-2 items-center">
										<Spaceship color="cyan" /> <div>Voyage en cours</div>
									</div>
									<div className="text-sm">arrivée dans : {leftTime}</div>
								</div>
							)}
							{isFighting && (
								<div className="flex gap-1 flex-col">
									<div className="flex gap-2 items-center">
										<Attack color="red" />{" "}
										<div className="text-danger">Batailles en cours</div>
									</div>
									<div className="text-sm">Tour suivant : {leftTime}</div>
								</div>
							)}
							{isMining && (
								<div className="flex gap-1 flex-col">
									<div className="flex gap-2 items-center">
										<Mine /> <div>Minage en cours</div>
									</div>
									<div className="text-sm">terminera dans : {leftTime}</div>
								</div>
							)}
							{!isFlying &&
								!isFighting &&
								!isMining &&
								additionalRowsNoTasks?.map((row) => row(fleet))}
						</>
						{assembleFleetTask ? (
							<div className="text-white">
								Décollage... en orbite dans :{" "}
								{moment
									.duration(moment(assembleFleetTask.endDate).diff(moment()))
									.humanize()}
							</div>
						) : (
							<ManageButton
								onPress={() => {
									dispatch(setCurrentFleet(fleet.id))
								}}
								title="Gérer la flotte"
							/>
						)}
					</React.Fragment>
				)
			})}
		</FleetGridContainer>
	)
}

export default ListFleet
