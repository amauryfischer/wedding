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
import { useEffect, useState } from "react"
import { Payment, Product } from "@prisma/client"
import ProductPrice from "./ProductPrice"
import { setIsOpenOfferModal, setProducts } from "@/redux/slice/current.slice"
import { useDispatch } from "react-redux"

const SContribution = styled.div`
	background-color: var(--primary50);
`

export default function Gift({
	products,
	payments
}: {
	products: Product[]
	payments: Payment[]
}) {
	const [amount, setAmount] = useState(0)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setProducts(products))
	}, [])
	const offer = async ({
		euros,
		product
	}: { product?: Product; euros: number }) => {
		try {
			const { data } = await axios.post("/api/checkout_sessions", {
				data: { amount: euros, productId: product?.id }
			})
			const sessionUrl = data

			// Redirect the user to the Stripe Checkout page
			window.open(sessionUrl, "_blank")
		} catch (error) {
			console.log(error)
		}
	}

	console.log("payments", payments)

	return (
		<div className="flex flex-col p-4 gap-8 lg:p-12">
			<div className="flex gap-2 flex-col md:flex-row md:gap-16">
				<Image
					src="/images/mariesBlur.png"
					alt="rsvp"
					className="md:h-48 md:w-48 object-cover rounded-md w-full md:block hidden"
				/>
				<div className="flex flex-col gap-4">
					<Spacer y={4} />
					<div className="md:text-6xl text-4xl font-bold">
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
			<SContribution className="rounded-md p-4 flex justify-between w-full flex-col gap-8 sm:flex-row sm:gap-2">
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
					<Button
						color="primary"
						onPress={() => {
							dispatch(
								setIsOpenOfferModal({
									isOpenOfferModal: true,
									offerAmount: amount,
									offerProductId: undefined
								})
							)
						}}
					>
						Offrir
					</Button>
				</ButtonGroup>
			</SContribution>
			<div className="text-2xl font-bold">🎁 Liste de cadeaux</div>
			<Tabs
				color="primary"
				variant="solid"
				radius="lg"
				classNames={{
					tabContent: "p-0",
					tabList: "p-0",
					wrapper: "p-0",
					panel: "p-0 px-0 py-0"
				}}
			>
				<Tab key="gift" title="Cadeaux">
					<div className="flex flex-wrap gap-16 justify-center">
						{products.map((product) => (
							<ProductPrice
								key={product.description}
								product={product}
								payments={payments}
							/>
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
