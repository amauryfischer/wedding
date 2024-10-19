import { StyledTaskCard } from "./TaskCard.styled"
import useTasksActions from "@/hooks/data/actions/use-tasks-actions.hook"
import { useEffect, useState } from "react"
import moment from "moment"
import {
	ITask,
	ITaskAssembleFleet,
	ITaskAsteroid,
	ITaskBuildShip,
	ITaskFight,
	ITaskFlyingFleet,
	ITaskResearch,
	ITaskUpgradeBuilding,
	ITaskUpgradeResource,
	TaskType
} from "@/type/data/ITask"
import useAsteroidsActions from "@/hooks/data/actions/use-asteroids-actions.hook"
import useFleetsActions from "@/hooks/data/actions/use-fleets-actions.hook"
import TaskCollectAsteroid from "./TaskCollectAsteroid.tsx/TaskCollectAsteroid"
import TaskFlyingFleet from "./TaskFlyingFleet/TaskFlyingFleet"
import Mine from "@/ui/fondations/icons/Mine"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import TaskAssembleFleet from "./TaskAssembleFleet/TaskAssembleFleet"
import useShipsActions from "@/hooks/data/actions/use-ships-actions.hook"
import TaskBuildShip from "./TaskBuildShip/TaskBuildShip"
import useUserActions from "@/hooks/data/actions/use-user-actions.hook"
import usePlanetsActions from "@/hooks/data/actions/use-planets-actions.hook"
import TaskResearch from "../TaskResearch/TaskResearch"
import TaskUpgradeResource from "./TaskUpgradeResource/TaskUpgradeResource"
import TaskFight from "./TaskFight/TaskFight"
import useParcelsActions from "@/hooks/data/actions/use-parcels-actions.hook"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import TaskUpgradeBuilding from "./TaskUpgradeBuilding/TaskUpgradeBuilding"
import useAsteroids from "@/hooks/data/entity/use-asteroid.hook"

const TaskCard = ({ task }: { task: ITask }) => {
	const [progress, setProgress] = useState(0)
	const { fetchTasks } = useTasksActions()
	const { fetchAsteroids } = useAsteroidsActions()
	const { fetchFleets } = useFleetsActions()
	const { fetchShips } = useShipsActions()
	const { fetchUser } = useUserActions()
	const { fetchPlanets } = usePlanetsActions()
	const fetParcels = useParcelsActions()
	const asteroids = useAsteroids()
	const user = useCurrentUser()
	// tick every seconds
	useEffect(() => {
		const interval = setInterval(() => {
			const endDate = moment(task.endDate)
			const createdAt = moment(task.createdAt)
			const current = moment()
			setProgress(
				Math.round((current.diff(createdAt) / endDate.diff(createdAt)) * 100)
			)
			if (current.isAfter(endDate)) {
				if (task.type === TaskType.COLLECT_ASTEROIDS) {
					const asteroid = asteroids[task.details.asteroidId]
					setTimeout(() => {
						fetParcels([asteroid.solarSystem])
						fetchTasks()
					}, 500)
				}
				if (task.type === TaskType.FLYING_FLEET) {
					fetchFleets()
					setTimeout(() => {
						fetchTasks()
						fetParcels([task.details.solarSystem])
					}, 500)
				}
				if (task.type === TaskType.ASSEMBLE_FLEET) {
					fetchFleets()
				}
				if (task.type === TaskType.BUILD_SHIP) {
					fetchShips()
				}
				if (task.type === TaskType.RESEARCH) {
					fetchTasks()
					setTimeout(() => {
						fetchUser()
					}, 500)
				}
				if (task.type === TaskType.UPGRADE_RESOURCE) {
					fetchPlanets()
					fetchTasks()
				}
				if (task.type === TaskType.FIGHT) {
					fetchTasks()
					setTimeout(() => {
						fetParcels([task.details.solarSystem])
					}, 500)
				}
			}
		}, 2000)
		return () => clearInterval(interval)
	}, [task])

	if (moment().isAfter(moment(task.endDate))) {
		return null
	}
	if (!user) {
		return null
	}
	if (task.userId !== user.id && task.type !== TaskType.FIGHT) {
		return null
	}

	return (
		<StyledTaskCard>
			{task.type === TaskType.COLLECT_ASTEROIDS && (
				<TaskCollectAsteroid
					task={task as unknown as ITaskAsteroid}
					progress={progress}
					icon={<Mine width="24px" />}
					color="caramel300"
				/>
			)}
			{task.type === TaskType.FLYING_FLEET && (
				<TaskFlyingFleet
					task={task as unknown as ITaskFlyingFleet}
					progress={progress}
					icon={<Spaceship width="24px" />}
					color="cyan300"
				/>
			)}
			{task.type === TaskType.ASSEMBLE_FLEET && (
				<TaskAssembleFleet
					task={task as unknown as ITaskAssembleFleet}
					progress={progress}
				/>
			)}
			{task.type === TaskType.BUILD_SHIP && (
				<TaskBuildShip
					task={task as unknown as ITaskBuildShip}
					progress={progress}
				/>
			)}
			{task.type === TaskType.RESEARCH && (
				<TaskResearch
					task={task as unknown as ITaskResearch}
					progress={progress}
				/>
			)}
			{task.type === TaskType.UPGRADE_RESOURCE && (
				<TaskUpgradeResource
					progress={progress}
					color="caramel300"
					task={task as unknown as ITaskUpgradeResource}
				/>
			)}
			{task.type === TaskType.FIGHT && (
				<TaskFight
					progress={progress}
					color="red300"
					task={task as unknown as ITaskFight}
				/>
			)}
			{task.type === TaskType.UPGRADE_BUILDING && (
				<TaskUpgradeBuilding
					progress={progress}
					color="caramel300"
					task={task as unknown as ITaskUpgradeBuilding}
				/>
			)}
			{/* <div>
				Temps restant: {moment(task.endDate).diff(moment(), "seconds")} secondes
			</div> */}
		</StyledTaskCard>
	)
}

export default TaskCard
