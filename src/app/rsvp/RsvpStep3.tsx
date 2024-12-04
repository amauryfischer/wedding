import FSelect from "@/ui/molecules/forms/FSelect"
import FText from "@/ui/molecules/forms/FText"
import FTextarea from "@/ui/molecules/forms/FTextarea"
import { Spacer } from "@nextui-org/react"
import { useState } from "react"
import styled from "styled-components"
import { regimes } from "./regimes"
import intolerances from "./intolerances"
import { useFormContext, useWatch } from "react-hook-form"

const Callout = styled.div`
	background-color: var(--caramel50);
	padding: 1rem;
	border-radius: 0.5rem;
`

export default function RsvpStep3() {
	const { control } = useFormContext()
	const values = useWatch({ control })

	return (
		<div className="flex flex-col gap-4">
			{JSON.stringify(values, null, 2)}
			<div className="font-bold text-2xl">Régime alimentaire</div>
			<FSelect
				variant="bordered"
				label="Type de régime alimentaire"
				name="diet"
				options={regimes}
			/>
			<FSelect
				variant="bordered"
				label="Intolérance ou allergies"
				name="intolerances"
				options={intolerances}
			/>
			<FTextarea label="Précisions utiles" name="other" />
		</div>
	)
}
