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

const SContainer = styled.div`
	background-color: var(--primary50);
`

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
			<SContainer className="mt-4 text-sm bg-red-100 rounded-none p-4 text-neutral-700">
				Pour plus d’informations sur les options d’hébergement, consultez ce
				lien :{" "}
				<a
					className="underline text-blue-500 hover:text-blue-600"
					target="_blank"
					rel="noreferrer"
					href="https://docs.google.com/spreadsheets/d/1ATZLUprpQnL8MHJKP3XDfTBv9Mkp7bKr/edit?usp=sharing&ouid=105317779838532331466&rtpof=true&sd=true"
				>
					Détails des hébergements
				</a>{" "}
				Si vous souhaitez réserver, merci de nous contacter directement. Le
				règlement de votre chambre s’effectuera à votre arrivée, auprès de
				l’accueil du domaine.
			</SContainer>
		</div>
	)
}
