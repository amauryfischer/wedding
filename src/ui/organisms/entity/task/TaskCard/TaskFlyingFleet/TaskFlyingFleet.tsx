import useFleets from "@/hooks/data/entity/use-fleets.hook"
import useShips from "@/hooks/data/entity/use-ships.hook"
import ShipService from "@/services/ShipService"
import { ITaskFlyingFleet } from "@/type/data/ITask"
import Spaceship from "@/ui/fondations/icons/Spaceship"
import TaskCardBasic from "../TaskCardBasic/TaskCardBasic"

const TaskFlyingFleet = ({
	task,
	progress
}: {
	task: ITaskFlyingFleet
	progress: number
}) => {
	const fleets = useFleets()
	const ships = useShips()
	return (
		<TaskCardBasic
			task={task}
			progress={progress}
			icon={<Spaceship />}
			color="blue"
			imgSrc={
				ShipService.getAllShips()[
					ships[fleets[task.details.fleetId].shipIds[0]]?.class
				]?.img
			}
		/>
	)
}

export default TaskFlyingFleet
