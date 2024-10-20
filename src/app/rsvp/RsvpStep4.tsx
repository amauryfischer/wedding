import FFieldArray from "@/ui/molecules/forms/FFieldArray"
import FText from "@/ui/molecules/forms/FText"
import { Spacer } from "@nextui-org/react"
import { useState } from "react"
import styled from "styled-components"

const Callout = styled.div`
	background-color: var(--caramel50);
	padding: 1rem;
	border-radius: 0.5rem;
`

export default function RsvpStep4() {
	return (
		<div>
			<div className="font-bold text-2xl">Personnes supplémentaires</div>
			<Spacer y={4} />
			<FFieldArray name="guests" />
		</div>
	)
}
