"use client"

import {
	Button,
	ButtonGroup,
	Image,
	Input,
	Progress,
	Spacer,
	Tab,
	Tabs
} from "@nextui-org/react"
import styled from "styled-components"
import { CalendarBlank, Check } from "@phosphor-icons/react"
import axios from "axios"
import { useState } from "react"

const SCalendarBlank = styled(CalendarBlank)`
	color: var(--primary);
`
const SContribution = styled.div`
	background-color: var(--primary50);
`
const SCheck = styled(Check)`
	color: var(--success);
	font-size: 1.2rem;
`
export default function Gift() {
	const [amount, setAmount] = useState(0)
	const offer = async () => {
		try {
			const { data } = await axios.post("/api/checkout_sessions", {
				data: { amount: amount }
			})
			const sessionUrl = data

			// Redirect the user to the Stripe Checkout page
			window.open(sessionUrl, "_blank")
		} catch (error) {
			console.log(error)
		}
	}
	const gifts = [
		{
			img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRvoKbczxoIZ8fNKlzOA17S2rESmbYgGYor1I9Me0Jz4qxp30N7ajSS43adPgvf88Fw9cuXweMggM6VIspO1Bugt9pKguNe0NzSmHGdTjqFTI88K0p_amdaRw",
			title: "Machine a café",
			price: 200,
			financed: 100
		},
		{
			img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/35152294.jpg?k=763f33b8765549f8c315056dd3aa07f09ae2b76e4af2c2d5bdb52a10c7f88d10&o=&hp=1",
			title: "Golden Seoul Hôtel",
			price: 96,
			financed: 0
		},
		{
			img: "https://cache.marriott.com/content/dam/marriott-renditions/SELER/seler-suite-0047-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=*:339",
			title: "Suite de luxe",
			price: 310,
			financed: 310
		}
	]
	return (
		<div className="flex flex-col p-12 gap-8">
			<div className="flex gap-16">
				<Image
					src="/images/maries.jpg"
					alt="rsvp"
					className="h-48 w-48 object-cover rounded-md"
				/>
				<div className="flex flex-col gap-4">
					<Spacer y={4} />
					<div className="text-6xl font-bold">
						Mariage <span className="text-primary">Linh-Dan & Amaury</span>
					</div>
					<div className="max-w-2xl">
						Pour nous accompagner dans cette nouvelle aventure, nous avons créé
						une cagnotte de mariage Un Grand Jour. Nous vous remercions du fond
						du cœur pour votre amour et votre soutien en cette occasion si
						spéciale.
					</div>
				</div>
			</div>
			<SContribution className="rounded-md p-4 flex justify-between w-full">
				<div className="flex flex-col gap-2">
					<div className="text-2xl font-bold">Contribution libre</div>
					<div className="max-w-lg text-sm">
						Pour nous aider à financer notre nouvelle maison et notre voyage de
						noces en Corée du Sud ❤️
					</div>
				</div>
				<ButtonGroup>
					<Input
						type="number"
						placeholder="0"
						endContent={<div>€</div>}
						className="max-w-24"
						value={amount?.toString()}
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
					<Button color="primary" onPress={offer}>
						Offrir
					</Button>
				</ButtonGroup>
			</SContribution>
			<div className="text-2xl font-bold">🎁 Liste de cadeaux</div>
			<Tabs color="primary" variant="solid" radius="lg">
				<Tab key="gift" title="Cadeaux">
					<div className="flex flex-nowrap gap-4">
						{gifts.map((gift) => (
							<div key={gift.title} className="flex flex-col gap-4">
								<div className="flex flex-col gap-0">
									<Image
										src={gift.img}
										alt={gift.title}
										className="h-48 w-48 object-cover rounded-md"
									/>
									<Progress
										value={gift.financed}
										maxValue={gift.price}
										className="w-full h-2"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										{gift.financed > 0 && (
											<>
												<div className="text-sm">{gift.financed}€</div>
												<div>/</div>
											</>
										)}
										<div className="font-bold">{gift.price}€</div>
									</div>
									<div>{gift.title}</div>
								</div>
								<div className="flex flex-col gap-2">
									{gift.financed === 0 && (
										<Button color="primary">Offrir</Button>
									)}
									{gift.financed < gift.price && (
										<div className="flex">
											<ButtonGroup>
												<Input
													type="number"
													placeholder="0"
													endContent={<div>€</div>}
													className="max-w-24"
													value={amount?.toString()}
													onChange={(e) => setAmount(Number(e.target.value))}
												/>
												<Button
													color="primary"
													onPress={offer}
													variant="bordered"
												>
													Participer
												</Button>
											</ButtonGroup>
										</div>
									)}
									{gift.financed >= gift.price && (
										<Button variant="bordered">
											Réservé ! <SCheck />
										</Button>
									)}
								</div>
							</div>
						))}
					</div>
				</Tab>
				<Tab key="travel" title="Voyage de noce">
					<div>Voyage de noce</div>
				</Tab>
			</Tabs>
		</div>
	)
}
