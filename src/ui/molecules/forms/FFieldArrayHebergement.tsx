import { Button, Spacer } from "@nextui-org/react"
import { PlusCircle } from "@phosphor-icons/react"
import { Hebergement } from "@prisma/client"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import styled from "styled-components"
import FSelectSection from "./FSelectSection"
const AddPeople = styled.div`
	border: 1px solid var(--grey200);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--nextui-radius-lg);
	padding: 1rem;
	width: 100%;
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: var(--primary50);
	}
`

const SPlusCircle = styled(PlusCircle)`
	color: var(--primary);
`

const FFieldArrayHebergement = ({
	name,
	hebergements
}: {
	name: string
	hebergements: Hebergement[]
}) => {
	const { control } = useFormContext()
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control, // control props comes from useForm (optional: if you are using FormContext)
			name
		}
	)
	const currentHebergements = useWatch({
		control,
		name
	})
	const currentHebergementQuantityByType: Record<string, number> = {}
	Object.entries(currentHebergements ?? {}).forEach(([key, value]) => {
		if (!currentHebergementQuantityByType[value.type]) {
			currentHebergementQuantityByType[value.type] = 0
		}
		currentHebergementQuantityByType[value.type] =
			currentHebergementQuantityByType[value.type] + 1
	})
	return (
		<div className="flex flex-col gap-4">
			{fields.map((field, index) => (
				<div
					className="border-1 border-default-200 rounded-lg p-6"
					key={field.id}
				>
					<div className="flex justify-between items-center">
						<div>Hébergement {index + 1}</div>
						<Button
							variant="light"
							color="danger"
							onPress={() => remove(index)}
						>
							Supprimer
						</Button>
					</div>
					<Spacer y={2} />
					<div className="flex flex-col gap-4" key={field.id}>
						<FSelectSection
							variant="bordered"
							label="Séléctionnez un type d'hébergement"
							name={`${name}.${index}.type`}
							options={hebergements.map((hebergement) => {
								const remainingQuantity = hebergement.quantity - (currentHebergementQuantityByType[hebergement.value] || 0);
								return {
									label: `${hebergement.description} ${remainingQuantity} places restantes`,
									value: hebergement.value,
									section: hebergement.value
								};
							})}
							renderValue={(value: Set<string>) => {
								
								return (
									<>
										{value.map((v) =>
											hebergements.find((h) => h.value === v.key)
												?.description
										).join(", ")}
									</>
								)
							}}
						/>
					</div>
				</div>
			))}
			<AddPeople
				className="border-1 border-primary-200 rounded-lg p-6 hover:cursor-pointer hover:bg-primary-100 transition-colors cursor-pointer"
				onClick={() => append({})}
				onKeyUp={(e) =>
					e.key === "Enter" && append({ firstname: "", lastname: "" })
				}
			>
				<div className="flex items-center gap-2">
					<SPlusCircle size={24} />
					Ajouter un hébergement
				</div>
			</AddPeople>
		</div>
	)
}

export default FFieldArrayHebergement
