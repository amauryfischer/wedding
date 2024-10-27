import FSelect from "@/ui/molecules/forms/FSelect"
import FText from "@/ui/molecules/forms/FText"
import FTextarea from "@/ui/molecules/forms/FTextarea"
import { Spacer } from "@nextui-org/react"
import { useState } from "react"
import styled from "styled-components"
import { regimes } from "./regimes"
import intolerances from "./intolerances"

const Callout = styled.div`
	background-color: var(--caramel50);
	padding: 1rem;
	border-radius: 0.5rem;
`

export default function RsvpStep3() {
	return (
		<div className="flex flex-col gap-4">
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
