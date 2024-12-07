"use client"

import Button from "@/ui/atoms/buttons/Button"
import FText from "@/ui/molecules/forms/FText"
import { Image, Spacer } from "@nextui-org/react"
import { FormProvider, useForm } from "react-hook-form"
import RsvpStep1 from "./RsvpStep1"
import { useState } from "react"
import RsvpStep2 from "./RsvpStep2"
import RsvpStep3 from "./RsvpStep3"
import RsvpStep4 from "./RsvpStep4"
import PaymentForm from "../checkout/PaymentForm"
import { CalendarBlank } from "@phosphor-icons/react"
import styled from "styled-components"
import RsvpStep5 from "./RsvpStep5"
import { Hebergement } from "@prisma/client"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import formatNfdLowerCase from "@/utils/formatNfdLowerCase"
import easterEgg from "./easterEgg"
import { saveGuest } from "../../../server/saveGuest"
import { useRouter } from "next/navigation"

const SCalendarBlank = styled(CalendarBlank)`
	color: var(--primary);
`

const Rsvp = ({
	hebergements,
	allGuests
}: { hebergements: Hebergement[]; allGuests: any }) => {
	const [step, setStep] = useState(0)
	const router = useRouter()
	const schemas = [
		yup.object({
			firstName: yup.string().required("Le prénom est requis"),
			lastName: yup.string().required("Le nom est requis"),
			email: yup
				.string()
				.email("L'email est invalide")
				.required("L'email est requis")
		}),
		yup.object({
			eglise: yup
				.string()
				.required("La confirmation de la cérémonie est requise"),
			cocktail: yup
				.string()
				.required("La confirmation du cocktail est requise"),
			diner: yup.string().required("La confirmation du dîner est requise"),
			brunch: yup.string().required("La confirmation du brunch est requise")
		}),
		yup.object({
			diet: yup.array().of(yup.string()).optional().default([]),
			intolerances: yup.array().of(yup.string()).optional().default([]),
			other: yup.string().optional()
		}),
		yup.object({}),
		yup.object({})
	]
	const currentSchema = schemas[step]
	const [currentGuest, setCurrentGuest] = useState<any>(undefined)
	const methods = useForm({
		resolver: yupResolver(currentSchema),
		defaultValues: {
			hebergement_details: [],
			guests: []
		}
	})
	const onSubmit = (data: any) => {
		const allGuestOnlyCocktail =
			currentGuest?.Cocktail?.includes("Oui") &&
			currentGuest?.Dîner?.includes("Non") &&
			currentGuest?.Brunch?.includes("Non")
		if (step === 4 || (step === 3 && allGuestOnlyCocktail)) {
			saveGuest(data)
			alert("Merci pour votre réponse !")
			router.push("/gift")
			return
		}
		if (step === 0) {
			const currentGuestName = `${formatNfdLowerCase(data.firstName)} ${formatNfdLowerCase(data.lastName)}`
			const guest = allGuests.find(
				(guest: any) => formatNfdLowerCase(guest.Nom) === currentGuestName
			)
			if (guest) {
				setCurrentGuest(guest)
				if (guest?.Cocktail?.includes("Non")) {
					methods.setValue("cocktail", "non")
				}
				if (guest?.Dîner?.includes("Non")) {
					methods.setValue("diner", "non")
				}
				if (guest?.Brunch?.includes("Non")) {
					methods.setValue("brunch", "non")
				}
				if (
					guest?.Cocktail?.includes("Non") &&
					guest?.Dîner?.includes("Non") &&
					guest?.Brunch?.includes("Non")
				) {
					setStep(3)
				}
				easterEgg({ methods, guest })
			} else {
				alert(
					"Un problème est survenue veuillez nous joindre au 07 69 99 77 85"
				)
				return
			}
		}
		setStep(step + 1)
	}

	return (
		<FormProvider {...methods}>
			<div className="flex h-full w-full">
				<Image
					src="/images/maries.jpg"
					alt="rsvp"
					width={window.innerWidth / 2}
					className="h-full object-cover hidden md:block"
					classNames={{
						wrapper: "rounded-none",
						img: "rounded-none"
					}}
				/>
				<div className="flex flex-col gap-4 p-4 lg:p-12">
					<div className="flex items-center gap-2">
						<SCalendarBlank size={24} />
						Evénement prévu le samedi 7 juin 2025
					</div>
					<Spacer y={4} />
					<div className="text-3xl font-bold">
						RSVP | Mariage{" "}
						<span className="text-primary">Linh-Dan & Amaury</span>
					</div>
					<div>
						Merci de bien vouloir répondre ces quelques questions pour nous
						aider à organiser notre mariage. Nous sommes impatients de célébrer
						ce moment unique avec vous !
					</div>
					<Spacer y={2} />
					{step === 0 && <RsvpStep1 />}
					{step === 1 && <RsvpStep2 guest={currentGuest} />}
					{step === 2 && <RsvpStep3 />}
					{step === 3 && <RsvpStep4 />}
					{step === 4 && <RsvpStep5 hebergements={hebergements} />}
					<Spacer y={4} />
					<div className="flex justify-between flex-col md:flex-row gap-4">
						<div className="flex gap-2">
							<div
								className={`w-12 h-4 transition-colors duration-300 ${step === 0 ? "bg-primary" : "bg-slate-200"} hover:bg-primary`}
							/>
							<div
								className={`w-12 h-4 transition-colors duration-300 ${step === 1 ? "bg-primary" : "bg-slate-200"} hover:bg-primary`}
							/>
							<div
								className={`w-12 h-4 transition-colors duration-300 ${step === 2 ? "bg-primary" : "bg-slate-200"} hover:bg-primary`}
							/>
							<div
								className={`w-12 h-4 transition-colors duration-300 ${step === 3 ? "bg-primary" : "bg-slate-200"} hover:bg-primary`}
							/>
							<div
								className={`w-12 h-4 transition-colors duration-300 ${step === 4 ? "bg-primary" : "bg-slate-200"} hover:bg-primary`}
							/>
						</div>
						<div className="flex gap-2">
							{step > 0 && (
								<Button
									className="w-fit"
									variant="bordered"
									size="lg"
									onClick={() => setStep(step - 1)}
								>
									Précedent
								</Button>
							)}
							{step < 4 && (
								<Button
									className="w-fit"
									color="primary"
									size="lg"
									onClick={methods.handleSubmit(onSubmit)}
								>
									Continuer
								</Button>
							)}
							{step === 4 && (
								<Button
									className="w-fit"
									onClick={methods.handleSubmit(onSubmit)}
									size="lg"
								>
									Finaliser
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</FormProvider>
	)
}

export default Rsvp
