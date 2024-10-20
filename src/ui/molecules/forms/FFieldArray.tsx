import { useFieldArray, useFormContext } from "react-hook-form"
import FText from "./FText"
import FSelect from "./FSelect"
import { regimes } from "@/app/rsvp/regimes"
import intolerances from "@/app/rsvp/intolerances"
import FTextarea from "./FTextarea"
import { Button } from "@nextui-org/react"

const FFieldArray = ({
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
						<div>Personne {index + 1}</div>
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
			<div
				className="border-1 border-default-200 rounded-lg p-6 hover:cursor-pointer hover:bg-default-100 transition-colors cursor-pointer"
				onClick={() => append({})}
				onKeyUp={(e) =>
					e.key === "Enter" && append({ firstname: "", lastname: "" })
				}
			>
				<div>Ajouter une autre personne</div>
			</div>
		</div>
	)
}

export default FFieldArray
