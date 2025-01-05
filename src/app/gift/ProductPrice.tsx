import { setIsOpenOfferModal, setProducts } from "@/redux/slice/current.slice"
import { AppDispatch } from "@/redux/store"
import { ButtonGroup, Input } from "@nextui-org/react"

import { Button } from "@nextui-org/react"

import { Image, Progress } from "@nextui-org/react"
import { Check } from "@phosphor-icons/react"
import { Payment, Product } from "@prisma/client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const SCheck = styled(Check)`
	color: var(--success);
	font-size: 1.2rem;
`

const ProductPrice = ({
	product,
	payments
}: {
	product: Product
	payments: Payment[]
}) => {
	const dispatch: AppDispatch = useDispatch()
	const [amount, setAmount] = useState(0)

	const financed = (product: Product) => {
		return payments
			.filter((payment) => payment.productId === product.externalId)
			.map((payment) => payment.amount)
			.reduce((acc, curr) => acc + curr, 0)
	}
	return (
		<div
			key={product.description}
			className="flex flex-col gap-1 sm:max-w-64 w-full"
		>
			<div className="flex flex-col gap-0">
				<Image
					src={product.imageUrl}
					alt={product.description}
					className="sm:h-64 sm:w-64 w-[calc(100vw-2rem)] h-[calc(100vw-2rem)] object-cover rounded-md"
					classNames={{
						wrapper: "max-w-full!"
						// img: "w-full"
					}}
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
				<div className="text-xs min-h-13 h-13" style={{ height: "3.25rem" }}>
					{product.description}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				{financed(product) === 0 && (
					<Button
						color="primary"
						onPress={() => {
							dispatch(
								setIsOpenOfferModal({
									isOpenOfferModal: true,
									offerAmount: product.prix,
									offerProductId: product.externalId
								})
							)
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
								onChange={(e) => {
									const newAmount = Math.max(0, Number(e.target.value))
									const totalFinanced = financed(product)
									const remainingAmount = Number(product.prix) - totalFinanced

									if (newAmount > remainingAmount) {
										setAmount(remainingAmount)
									} else {
										setAmount(newAmount)
									}
								}}
							/>
							<Button
								color="primary"
								onPress={() => {
									dispatch(
										setIsOpenOfferModal({
											isOpenOfferModal: true,
											offerAmount: amount,
											offerProductId: product.externalId
										})
									)
								}}
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
	)
}

export default ProductPrice