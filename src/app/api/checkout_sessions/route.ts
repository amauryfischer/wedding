import { NextResponse, NextRequest } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!, {
	typescript: true,
	apiVersion: "2024-09-30.acacia"
})

export async function POST(req: NextRequest) {
	const { data } = await req.json()
	const { amount, productId } = data
	console.log("received")
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "EUR",
						product_data: {
							name: "Your Product Name"
						},
						unit_amount: Number(amount) * 100
					},
					quantity: 1
				}
			],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/success?productId=${productId}&amount=${amount}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`
		})

		return new NextResponse(session.url, { status: 200 })
	} catch (error: any) {
		return new NextResponse(error, {
			status: 400
		})
	}
}

