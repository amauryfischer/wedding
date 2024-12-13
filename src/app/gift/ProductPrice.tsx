import { ButtonGroup, Input } from "@nextui-org/react"

import { Button } from "@nextui-org/react"

import { Image, Progress } from "@nextui-org/react"
import { Check } from "@phosphor-icons/react"
import { Payment, Product } from "@prisma/client"
import { useState } from "react"
import styled from "styled-components"

const SCheck = styled(Check)`
	color: var(--success);
	font-size: 1.2rem;
`

const ProductPrice = ({
	product,
	payments,
	offer
}: {
	product: Product
	payments: Payment[]
	offer: ({ product, euros }: { product: Product; euros: number }) => void
}) => {
	const [amount, setAmount] = useState(0)
	const financed = (product: Product) => {
		return payments
			.filter((payment) => payment.productId === product.id)
			.map((payment) => payment.amount)
			.reduce((acc, curr) => acc + curr, 0)
	}
	return (
		<div key={product.description} className="flex flex-col gap-4 max-w-64">
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
				<div className="text-xs min-h-13 h-13" style={{ height: "3.25rem" }}>
					{product.description}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				{financed(product) === 0 && (
					<Button
						color="primary"
						onPress={() => {
							setAmount(product.prix)
							offer({ product, euros: product.prix })
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
								onPress={() => offer({ product, euros: amount })}
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