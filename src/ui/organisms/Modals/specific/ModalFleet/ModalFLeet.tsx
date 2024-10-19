"use client"
import {
	Image,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Slider,
	SliderValue,
	Spacer
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import {
	Input,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Button as NextUIButton
} from "@nextui-org/react"

import _ from "lodash"

import useCurrentFleet from "@/hooks/current/use-current-fleet.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import useFleets from "@/hooks/data/entity/use-fleets.hook"
import usePlanets from "@/hooks/data/entity/use-planets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import { setCurrentFleet, setCurrentShip } from "@/redux/slice/current.slice"
import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import ShipService from "@/services/ShipService"
import { IModifier, IModule } from "@/type/data/IModule"
import { IPlanet } from "@/type/data/IPlanet"
import Flex from "@/ui/atoms/Flex"
import BAvatar from "@/ui/atoms/avatar/BAvatar"
import BButton from "@/ui/atoms/buttons/Button"
import CloseElementButton from "@/ui/atoms/buttons/CloseElementButton"
import BModal from "@/ui/molecules/modal/BModal"
import BProgress from "@/ui/molecules/progress/BProgress"
import RenderResources from "@/ui/organisms/RenderResources"
import Button from "@/ui/atoms/buttons/Button"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import { TaskType } from "@prisma/client"
import moment from "moment"
import FuelBar from "../../../entity/fleet/FuelBar"
import FleetService from "@/services/FleetService"
import ModalFleetCargo from "./ModalFleetCargo"
import ModalFleetFuel from "./ModalFleetFuel"
import useTasks from "@/hooks/data/entity/use-tasks.hook"
import Fleet from "@/app/fleets/Fleet"
import ModalFleetNotOwner from "./ModalFleetNotOwner"
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook"

const ModalFleet = () => {
	const currentFleet = useCurrentFleet()
	const [solarSystem, setSolarSystem] = useState(currentFleet?.solarSystem)
	const [x, setX] = useState(currentFleet?.coordinates?.x)
	const [y, setY] = useState(currentFleet?.coordinates?.y)
	const [z, setZ] = useState(currentFleet?.coordinates?.z)
	const [isDirty, setIsDirty] = useState(false)
	const dispatch = useDispatch()
	const { createTask, fetchTasks } = useTasksActions()
	const user = useCurrentUser()
	const fetParcels = useParcelsActions()
	const ships = useShips()
	const [isOpeningSoute, setIsOpeningSoute] = useState(false)
	const [isOpeningFuel, setIsOpeningFuel] = useState(false)
	const tasks = useTasks()
	const { deleteFleet } = useFleetsActions()
	const { updateShip } = useShipsActions()

	const isMoving = Object.values(tasks).some(
		(task) =>
			task.type === TaskType.FLYING_FLEET &&
			task.details.fleetId === currentFleet?.id
	)

	const planets = usePlanets()
	const { updateFleet } = useFleetsActions()
	const { updatePlanet } = usePlanetsActions()
	const fleetShips = currentFleet?.shipIds.map((shipId) => ships[shipId])

	useEffect(() => {
		const fetch = async () => {
			const res = await fetParcels([currentFleet?.solarSystem ?? ""])
			console.log(res)
		}
		fetch()
	}, [])


	useEffect(() => {
		if (!isDirty) {
			setSolarSystem(currentFleet?.solarSystem)
			setX(currentFleet?.coordinates?.x)
			setY(currentFleet?.coordinates?.y)
			setZ(currentFleet?.coordinates?.z)
		}
	}, [currentFleet, isDirty])

	if (!currentFleet) {
		return null
	}
	const shipIds = currentFleet.shipIds
	const remainingPlanet = Object.values(planets).filter(
		(planet) =>
			planet.solarSystem?.toString() === currentFleet.solarSystem?.toString() &&
			planet.coordinates?.x?.toString() ===
				currentFleet.coordinates.x?.toString() &&
			planet.coordinates?.y?.toString() ===
				currentFleet.coordinates.y?.toString() &&
			planet.coordinates?.z?.toString() ===
				currentFleet.coordinates.z?.toString()
	)
	const landFleet = () => {
		deleteFleet(currentFleet.id)
		currentFleet.shipIds.forEach((shipId) => {
			updateShip(shipId, {
				...ships[shipId],
				planetId: remainingPlanet[0].id,
				fleetId: undefined
			})
		})
	}

	if (!user) {
		return null
	}

	if (!currentFleet) {
		return null
	}

	if (currentFleet.userId !== user.id) {
		return <ModalFleetNotOwner />
	}
	const isFighting = Object.values(tasks).some(
		(task) =>
			task.type === TaskType.FIGHT &&
			task.details.fleetIds.includes(currentFleet?.id)
	)
	const isCollectingAsteroid = Object.values(tasks).some(
		(task) =>
			task.type === TaskType.COLLECT_ASTEROIDS &&
			task.details.fleetId === currentFleet?.id
	)
	const isFlying = Object.values(tasks).some(
		(task) =>
			task.type === TaskType.FLYING_FLEET &&
			task.details.fleetId === currentFleet?.id
	)
	const isOccuped = isFlying || isFighting || isCollectingAsteroid
	const hasSonde = fleetShips.some((ship) => ship.class === "sonde")
	debugger
	return (
		<>
			<BModal
				size="5xl"
				isOpen={!!currentFleet}
				title={currentFleet.name}
				onOpenChange={() => dispatch(setCurrentFleet(undefined))}
			>
				<ModalContent>
					<ModalHeader>
						<div className="text-4xl font-bold">{currentFleet.name}</div>
					</ModalHeader>
					<ModalBody>
						<Flex gap="1rem" fullWidth justifyContent="space-between">
							<Flex gap="1rem" wrap="wrap" direction="column">
								{shipIds.map((shipId, index) => {
									const img =
										ShipService.getAllShips()[ships?.[shipId]?.class]?.img
									return (
										<Image
											isBlurred
											isZoomed
											key={shipId}
											src={img}
											width={200}
											alt={ships?.[shipId]?.name}
											onClick={() => {
												dispatch(setCurrentShip(shipId))
											}}
										/>
									)
								})}
							</Flex>
							{!isOpeningSoute && !isOpeningFuel && (
								<Flex direction="column" gap="1rem">
									<Flex direction="column">
										<div className="text-white">Fuel</div>
										<FuelBar
											progress={
												(currentFleet?.fuel * 100) /
												FleetService.getTotalFuel({
													ships: shipIds.map((shipId) => ships[shipId])
												})
											}
										/>
										<Spacer y={8} />
										<div className="text-white flex justify-between">
											<div>Cargo</div>
											<div>
												{Object.values(currentFleet?.cargo ?? {}).reduce(
													(acc, curr) => acc + curr,
													0
												)}{" "}
												/{" "}
												{FleetService.getFleetStats({
													ships: shipIds.map((shipId) => ships[shipId]),
													modifier: IModifier.CARGO
												})}
											</div>
										</div>
										<FuelBar
											progress={
												(Object.values(currentFleet?.cargo ?? {}).reduce(
													(acc, curr) => acc + curr,
													0
												) *
													100) /
												FleetService.getFleetStats({
													ships: shipIds.map((shipId) => ships[shipId]),
													modifier: IModifier.CARGO
												})
											}
										/>
									</Flex>
									<Flex direction="column">
										<Flex gap="0.5rem" className="max-w-[500px]">
											<Input
												value={solarSystem}
												onValueChange={(e) => {
													setSolarSystem(e)
													setIsDirty(true)
												}}
												variant="bordered"
											/>
											<Input
												value={x?.toString()}
												onValueChange={(e) => {
													setX(Number(e))
													setIsDirty(true)
												}}
												type="number"
												variant="bordered"
											/>
											<Input
												value={y?.toString()}
												onValueChange={(e) => {
													setY(Number(e))
													setIsDirty(true)
												}}
												type="number"
												variant="bordered"
											/>
											<Input
												value={z?.toString()}
												onValueChange={(e) => {
													setZ(Number(e))
													setIsDirty(true)
												}}
												type="number"
												variant="bordered"
											/>
											<BButton
												variant="bordered"
												color="emerald600"
												onClick={() => {
													createTask({
														type: TaskType.FLYING_FLEET,
														endDate: moment().add(40, "seconds").format(),
														details: {
															solarSystem,
															coordinates: {
																x,
																y,
																z
															},
															fleetId: currentFleet.id
														},
														userId: user.id
													})
													fetchTasks()
													dispatch(setCurrentFleet(undefined))
												}}
												isDisabled={
													solarSystem === currentFleet?.solarSystem &&
													x === currentFleet?.coordinates.x &&
													y === currentFleet?.coordinates.y &&
													z === currentFleet?.coordinates.z &&
													!isMoving
												}
											>
												Déplacer
											</BButton>
										</Flex>
										<Spacer y={8} />
										<RenderResources resources={currentFleet?.cargo} />
									</Flex>
								</Flex>
							)}
						</Flex>
					</ModalBody>
					{remainingPlanet.length > 0 &&
						remainingPlanet[0].userId === user.id &&
						isOpeningSoute && (
							<ModalFleetCargo setIsOpeningSoute={setIsOpeningSoute} />
						)}
					{remainingPlanet.length > 0 &&
						remainingPlanet[0].userId === user.id &&
						isOpeningFuel && (
							<ModalFleetFuel setIsOpeningFuel={setIsOpeningFuel} />
						)}
					{!isOpeningSoute && !isOpeningFuel && (
						<ModalFooter>
							<>
								<CloseElementButton
									onPress={() => dispatch(setCurrentFleet(undefined))}
								/>

								{!isOpeningSoute && !isOccuped && (
									<>
										{remainingPlanet.length > 0 && (
											<>
												<Button color="primary" onClick={landFleet}>
													Atterrir
												</Button>
												<Button
													color="cyan"
													variant="bordered"
													onClick={() => {
														setIsOpeningSoute(true)
													}}
												>
													Remplir la soute
												</Button>
												<Button
													color="cyan"
													variant="bordered"
													onClick={() => {
														setIsOpeningFuel(true)
													}}
												>
													Remplir le carburant
												</Button>
											</>
										)}
										{/* {hasSonde && (
											<Button color="cyan" variant="bordered">
												Scanner
											</Button>
										)} */}
									</>
								)}
							</>
						</ModalFooter>
					)}
				</ModalContent>
			</BModal>
		</>
	)
}

export default ModalFleet
