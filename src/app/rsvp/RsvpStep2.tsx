import FRadios from "@/ui/molecules/forms/Fradios"
import { Spacer } from "@nextui-org/react"
import { useState } from "react"
import styled from "styled-components"

const Callout = styled.div`
	background-color: var(--caramel50);
	padding: 1rem;
	border-radius: 0.5rem;
`

export default function RsvpStep2({ guest }) {
	return (
		<div className="flex flex-col gap-4">
			<div className="font-bold text-2xl">Présence</div>
			<div className="font-bold">
				Je confirme ma présence aux événements suivants :
			</div>
			<div className="flex flex-col gap-4">
				<Callout>
					<div>A l’Église Saint-Amand de Caudéran à 15h30</div>
				</Callout>
				<div className="flex gap-2 justify-between w-full items-center">
					<div>⛪ Cérémonie à l'église</div>
					<div className="h-1 flex-1 border-b border-dashed border-slate-400" />
					<FRadios
						hideLabel
						orientation="horizontal"
						label="Je confirme ma présence"
						name="eglise"
						options={[
							{ label: "Oui", value: "oui" },
							{ label: "Non", value: "non" }
						]}
					/>
				</div>
				{guest?.Cocktail?.includes("Oui") && (
					<>
						<Callout>
							<div>
								Au Château Pontet d’Eyrans à partir de 18h30 (53 Rte de Royan,
								33390 Eyrans)
							</div>
						</Callout>
						<div className="flex gap-2 justify-between w-full items-center">
							<div>🍹 Cocktail</div>
							<div className="h-1 flex-1 border-b border-dashed border-slate-400" />
							<FRadios
								hideLabel
								orientation="horizontal"
								label="Je confirme ma présence"
								name="cocktail"
								options={[
									{ label: "Oui", value: "oui" },
									{ label: "Non", value: "non" }
								]}
							/>
						</div>
					</>
				)}
				{guest?.Dîner?.includes("Oui") && (
					<div className="flex gap-2 justify-between w-full items-center">
						<div>🍽️ Dîner</div>
						<div className="h-1 flex-1 border-b border-dashed border-slate-400" />
						<FRadios
							hideLabel
							orientation="horizontal"
							label="Je confirme ma présence"
							name="diner"
							options={[
								{ label: "Oui", value: "oui" },
								{ label: "Non", value: "non" }
							]}
						/>
					</div>
				)}
				{guest?.Brunch?.includes("Oui") && (
					<div className="flex gap-2 justify-between w-full items-center">
						<div>🍳 Brunch du lendemain (10h30-13h)</div>
						<div className="h-1 flex-1 border-b border-dashed border-slate-400" />
						<FRadios
							hideLabel
							orientation="horizontal"
							label="Je confirme ma présence"
							name="brunch"
							options={[
								{ label: "Oui", value: "oui" },
								{ label: "Non", value: "non" }
							]}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
