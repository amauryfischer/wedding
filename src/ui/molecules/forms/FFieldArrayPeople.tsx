import { useFieldArray, useFormContext } from "react-hook-form"
import FText from "./FText"
import FSelect from "./FSelect"
import { regimes } from "@/app/rsvp/regimes"
import intolerances from "@/app/rsvp/intolerances"
import FTextarea from "./FTextarea"
import { Button } from "@nextui-org/react"
import styled from "styled-components"
import { PlusCircle } from "@phosphor-icons/react"
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

const FFieldArrayPeople = ({
	name
}: {
	name: string
}) => {
	const { control } = useFormContext()
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control, // control props comes from useForm (optional: if you are using FormContext)
			name
		}
	)

	return (
		<div className="flex flex-col gap-4">
			{fields.map((field, index) => (
				<div
					className="border-1 border-default-200 rounded-lg p-6"
					key={field.id}
				>
					<div className="flex justify-between items-center">
						<div></div>
						<Button
							variant="light"
							color="danger"
							onPress={() => remove(index)}
						>
							Supprimer
						</Button>
					</div>
					<div className="flex flex-col gap-4" key={field.id}>
						<div className="flex gap-4">
							<FText label="Prénom" name={`${name}.${index}.firstname`} />
							<FText label="Nom" name={`${name}.${index}.lastname`} />
						</div>
						<FSelect
							variant="bordered"
							label="Type de régime alimentaire"
							name={`${name}.${index}.diet`}
							options={regimes}
						/>
						<FSelect
							variant="bordered"
							label="Intolérance ou allergies"
							name={`${name}.${index}.intolerance`}
							options={intolerances}
						/>
						<FTextarea
							label="Précisions utiles"
							name={`${name}.${index}.other`}
						/>
					</div>
				</div>
			))}
			{!fields.length && (
				<AddPeople
					className="border-1 border-primary-200 rounded-lg p-6 hover:cursor-pointer hover:bg-primary-100 transition-colors cursor-pointer"
					onClick={() => append({})}
					onKeyUp={(e) =>
						e.key === "Enter" && append({ firstname: "", lastname: "" })
					}
				>
					<div className="flex items-center gap-2">
						<SPlusCircle size={24} />
						Ajouter un/une conjoint(e)
					</div>
				</AddPeople>
			)}
		</div>
	)
}

export default FFieldArrayPeople
