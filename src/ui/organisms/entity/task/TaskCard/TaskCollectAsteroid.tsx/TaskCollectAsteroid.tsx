import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import Mine from "@/ui/fondations/icons/Mine"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"
import { ITaskAsteroid } from "@/type/data/ITask"
const TaskCollectAsteroid = ({
	task,
	progress
}: { task: ITaskAsteroid; progress: number }) => {
	const ships = useShips()
	const fleets = useFleets()
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Mine />}
			color="blue"
			imgSrc={
				ShipService.getAllShips()[
					ships[fleets[task.details.fleetId]?.shipIds?.[0]]?.class
				]?.img
			}
		/>
	)
}

export default TaskCollectAsteroid
