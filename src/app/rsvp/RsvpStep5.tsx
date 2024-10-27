import FFieldArrayHebergement from "@/ui/molecules/forms/FFieldArrayHebergement"
import FFieldArrayPeople from "@/ui/molecules/forms/FFieldArrayPeople"
import FFieldArray from "@/ui/molecules/forms/FFieldArrayPeople"
import FRadios from "@/ui/molecules/forms/Fradios"
import FText from "@/ui/molecules/forms/FText"
import { Spacer } from "@nextui-org/react"
import { Hebergement } from "@prisma/client"
import { useState } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import styled from "styled-components"

export default function RsvpStep5({
	hebergements
}: { hebergements: Hebergement[] }) {
	const { control } = useFormContext()
	const hebergement = useWatch({
		control,
		name: "hebergement"
	})
	return (
		<div>
			<div className="font-bold text-2xl">Hébergement</div>
			<Spacer y={4} />

			<div className="flex gap-2 justify-between w-full items-center">
				<div>🏨 Souhaitez vous un hébergement sur place ?</div>
				<div className="h-1 flex-1 border-b border-dashed border-slate-400" />
				<FRadios
					hideLabel
					orientation="horizontal"
					name="hebergement"
					options={[
						{ label: "Oui", value: "oui" },
						{ label: "Non", value: "non" }
					]}
				/>
			</div>
			<Spacer y={4} />
			{hebergement === "oui" && (
				<FFieldArrayHebergement
					name="hebergement_details"
					hebergements={hebergements}
				/>
			)}
		</div>
	)
}
