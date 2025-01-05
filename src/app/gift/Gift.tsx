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


	return (
		<div className="flex flex-col p-4 gap-8 lg:p-12">
			<div className="flex gap-2 flex-col md:flex-row md:gap-16">
				<Image
					src="/images/mariesBlur.webp"
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
						une cagnotte de mariage. Un grand merci pour votre générosité et
						votre présence à nos côtés en ce jour si spécial !
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

			<div className="flex flex-wrap gap-16 justify-center">
				{products.map((product) => (
					<ProductPrice
						key={product.description}
						product={product}
						payments={payments}
					/>
				))}
			</div>
		</div>
	)
}
