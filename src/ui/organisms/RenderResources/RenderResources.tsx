import ResourcesService, { RESOURCE_TYPES } from "@/services/ResourcesService"
import Flex from "@/ui/atoms/Flex"
import { GridContainer } from "./RenderResources.styled"
import AnimatedNumber from "react-animated-number"
interface RenderResourcesProps {
	resources?: Record<RESOURCE_TYPES, number>
}

const RenderResources = ({ resources }: RenderResourcesProps) => {
	return (
		<GridContainer>
			{Object.values(ResourcesService.getAllResources()).map((resource) => (
				<>
					<img src={resource.img} width={25} height={25} />
					<div>{resource.name}</div>
					<AnimatedNumber
						component="text"
						value={resources?.[resource.name]}
						style={{
							transition: "0.8s ease-out",
							transitionProperty: "background-color, color, opacity"
						}}
						duration={1000}
						formatValue={(n) => ResourcesService.renderResources(n)}
					/>
				</>
			))}
		</GridContainer>
	)
}

export default RenderResources
