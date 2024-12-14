"use server"
import prisma from "../db"

export default async function Page() {
	const products = await prisma.product.findMany()
	const payments = await prisma.payment.findMany()
	// url params
	const searchParams = new URLSearchParams(window.location.search)
	const productId = searchParams.get("productId")
	const amount = searchParams.get("amount")
	const from = searchParams.get("from")
	const description = searchParams.get("description")
	return (
		<div>
			<h1>Merci pour votre contribution {from}!</h1>
			<p>
				Vous avez offert {amount}€ à {productId} pour {description}
			</p>
		</div>
	)
}
