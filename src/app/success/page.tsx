"use server"
import prisma from "../db"
import ModalThanks from "./ModalThanks"
export default async function Page({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const products = await prisma.product.findMany()
	const payments = await prisma.payment.findMany()
	// url params
	const productId = searchParams.productId as string
	const amount = searchParams.amount as string
	const from = searchParams.from as string
	const description = searchParams.description as string
	const transactionId = searchParams.transactionId as string

	const existingPayment = await prisma.payment.findFirst({
		where: {
			transactionId: transactionId
		}
	})

	if (existingPayment) {
		return <div>Payment already exists</div>
	}

	await prisma.payment.create({
		data: {
			amount: Number(amount),
			productId: productId,
			from: from,
			description: description,
			transactionId: transactionId
		}
	})
	const product = products.find((p) => p.id === productId)

	return (
		<div>
			<ModalThanks
				from={from}
				amount={amount}
				product={product}
				description={description}
			/>
		</div>
	)
}
