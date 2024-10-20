import FText from "@/ui/molecules/forms/FText"
import { Spacer } from "@nextui-org/react"
import { useState } from "react"

export default function RsvpStep1() {
	return (
		<div>
			<div className="font-bold text-2xl">Informations personnelles</div>
			<div className="flex flex-col gap-4">
				<Spacer y={2} />
				<div className="flex gap-4">
					<FText label="Prénom" name="firstName" placeholder="Prénom" />
					<FText label="Nom" name="lastName" placeholder="Nom" />
				</div>
				<FText label="Email" name="email" placeholder="Email" />
			</div>
		</div>
	)
}
