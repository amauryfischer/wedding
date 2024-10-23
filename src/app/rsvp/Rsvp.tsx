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

const SCalendarBlank = styled(CalendarBlank)`
	color: var(--primary);
`

const Rsvp = () => {
	const methods = useForm()
	const [step, setStep] = useState(4)
	return (
		<FormProvider {...methods}>
			<div className="flex h-full w-full">
				<Image
					src="/images/maries.jpg"
					alt="rsvp"
					width={window.innerWidth / 2}
					className="h-full object-cover"
					classNames={{
						wrapper: "rounded-none",
						img: "rounded-none"
					}}
				/>
				<div className="flex flex-col gap-4 p-12">
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
					{step === 1 && <RsvpStep2 />}
					{step === 2 && <RsvpStep3 />}
					{step === 3 && <RsvpStep4 />}
					{step === 4 && <RsvpStep5 />}
					<Spacer y={4} />
					<div className="flex justify-between">
						<div className="flex gap-2">
							<div
								onClick={() => setStep(0)}
								className={`w-12 h-4 transition-colors duration-300 ${step === 0 ? "bg-primary" : "bg-slate-200"} hover:cursor-pointer hover:bg-primary`}
							/>
							<div
								onClick={() => setStep(1)}
								className={`w-12 h-4 transition-colors duration-300 ${step === 1 ? "bg-primary" : "bg-slate-200"} hover:cursor-pointer hover:bg-primary`}
							/>
							<div
								onClick={() => setStep(2)}
								className={`w-12 h-4 transition-colors duration-300 ${step === 2 ? "bg-primary" : "bg-slate-200"} hover:cursor-pointer hover:bg-primary`}
							/>
							<div
								onClick={() => setStep(3)}
								className={`w-12 h-4 transition-colors duration-300 ${step === 3 ? "bg-primary" : "bg-slate-200"} hover:cursor-pointer hover:bg-primary`}
							/>
							<div
								onClick={() => setStep(4)}
								className={`w-12 h-4 transition-colors duration-300 ${step === 4 ? "bg-primary" : "bg-slate-200"} hover:cursor-pointer hover:bg-primary`}
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
							<Button
								className="w-fit"
								color="primary"
								size="lg"
								onClick={() => setStep(step + 1)}
							>
								Continuer
							</Button>
						</div>
					</div>
				</div>
			</div>
		</FormProvider>
	)
}

export default Rsvp
