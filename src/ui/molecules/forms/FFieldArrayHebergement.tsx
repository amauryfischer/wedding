import { useFieldArray, useFormContext } from "react-hook-form"
import FText from "./FText"
import FSelect from "./FSelect"
import { regimes } from "@/app/rsvp/regimes"
import intolerances from "@/app/rsvp/intolerances"
import FTextarea from "./FTextarea"
import { Button, Spacer } from "@nextui-org/react"
import styled from "styled-components"
import { PlusCircle } from "@phosphor-icons/react"
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
	const hebergements = [
		{
			value: "chateau_1",
			label: "Château - Chambre 1 Lit double 160cm (100€)",
			section: "Château"
		},
		{
			value: "chateau_2",
			label: "Château - Chambre 1 Lit double 150cm (100€)",
			section: "Château"
		},
		{
			value: "chateau_3",
			label:
				"Château - Chambre 2 Lits simples 100cm ou 1 Lit double 200cm (100€)",
			section: "Château"
		},
		{
			value: "hotel_1",
			label: "Hôtel – Chambre 1 Lit double 160 cm (75€)",
			section: "Hôtel au dessus de la salle de réception"
		},
		{
			value: "hotel_2",
			label:
				"Hôtel – Chambre 2 Lits simples 80 cm ou 1 Lit double 160 cm (75€)",
			section: "Hôtel au dessus de la salle de réception"
		},
		{
			value: "hotel_3",
			label:
				"Hôtel – Chambre 2 Lits simples 90 cm ou 1 Lit double 180 cm (75€)",
			section: "Hôtel au dessus de la salle de réception"
		},
		{
			value: "gite_1",
			label: "Gîte - Chambre 1 Lit double 140 cm + 1 BZ (70€)",
			section: "Gîte de 1 à 4 personnes"
		},
		{
			value: "bungalow_1",
			label:
				"Bungalow – 2 x Chambres avec 2 Lits simples 80 cm ou 1 Lit double 160 cm (70€)",
			section: "Bungalow de 1 à 4 personnes"
		}
	]

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
							options={hebergements}
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
