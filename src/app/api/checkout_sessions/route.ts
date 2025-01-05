import db from "@/app/db"
import { NextResponse, NextRequest } from "next/server"
import Stripe from "stripe"
import { v4 as uuidv4 } from "uuid"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	typescript: true,
	apiVersion: "2024-09-30.acacia"
})

export async function POST(req: NextRequest) {
	const { data } = await req.json()
	const { amount, productId, from, description } = data
	const product = await db.product.findFirst({
		where: { externalId: productId }
	})
	console.log("received",product)
	const transactionId = uuidv4()
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "EUR",
						product_data: {
							name: product?.description ?? "Contribution libre",
							...(product?.imageUrl && { images: [product?.imageUrl] })
						},
						unit_amount: Math.round(Number(amount) * 100)
					},
					quantity: 1
				}
			],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?productId=${productId}&amount=${amount}&from=${from}&description=${description}&transactionId=${transactionId}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`
		})

		return new NextResponse(session.url, { status: 200 })
	} catch (error: any) {
		return new NextResponse(error, {
			status: 400
		})
	}
}

