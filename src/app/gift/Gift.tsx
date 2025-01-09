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
import { Payment, Product } from "@prisma/client"

const SContribution = styled.div`
	background-color: var(--primary50);
`
const SCheck = styled(Check)`
	color: var(--success);
	font-size: 1.2rem;
`
export default function Gift({
	products,
	payments
}: {
	products: Product[]
	payments: Payment[]
}) {
	const [amount, setAmount] = useState(0)
	const offer = async (product?: Product) => {
		try {
			const { data } = await axios.post("/api/checkout_sessions", {
				data: { amount: amount, productId: product?.id }
			})
			const sessionUrl = data

			// Redirect the user to the Stripe Checkout page
			window.open(sessionUrl, "_blank")
		} catch (error) {
			console.log(error)
		}
	}
	const financed = (product: Product) => {
		return payments
			.filter((payment) => payment.productId === product.id)
			.map((payment) => payment.amount)
			.reduce((acc, curr) => acc + curr, 0)
	}
	console.log("payments", payments)

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
					<div className="max-w-lg text-sm">
						Une urne de mariage sera aussi disponible le jour de la cérémonie.
						💍
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
					<Button color="primary" onPress={() => offer()}>
						Offrir
					</Button>
				</ButtonGroup>
			</SContribution>
			<div className="text-2xl font-bold">🎁 Liste de cadeaux</div>
			<Tabs color="primary" variant="solid" radius="lg">
				<Tab key="gift" title="Cadeaux">
					<div className="flex flex-wrap gap-16 justify-center">
						{products.map((product) => (
							<div
								key={product.description}
								className="flex flex-col gap-4 max-w-64"
							>
								<div className="flex flex-col gap-0">
									<Image
										src={product.imageUrl}
										alt={product.description}
										className="h-64 w-64 object-cover rounded-md"
									/>
									<Progress
										value={financed(product)}
										maxValue={Number(product.prix)}
										className="w-full h-2"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										{Number(product.prix) > 0 && (
											<>
												<div className="text-sm">{financed(product)}€</div>
												<div>/</div>
											</>
										)}
										<div className="font-bold">{product.prix}€</div>
									</div>
									<div
										className="text-xs min-h-13 h-13"
										style={{ height: "3.25rem" }}
									>
										{product.description}
									</div>
								</div>
								<div className="flex flex-col gap-2">
									{financed(product) === 0 && (
										<Button
											color="primary"
											onPress={() => {
												setAmount(product.prix)
												offer(product)
											}}
										>
											Offrir
										</Button>
									)}
									{financed(product) < Number(product.prix) && (
										<div className="flex w-full gap-2">
											<ButtonGroup className="w-full">
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
													onPress={() => offer(product)}
													variant="bordered"
													className="w-full"
												>
													Participer
												</Button>
											</ButtonGroup>
										</div>
									)}
									{financed(product) >= Number(product.prix) && (
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
