import db from "@/app/db"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// success
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const productId = searchParams.get("productId")
	const amount = searchParams.get("amount")
	const from = searchParams.get("from")
	const description = searchParams.get("description")
	console.log("create payment", {
		amount,
		productId,
		from,
		description
	})
	await db.payment.create({
		data: {
			amount: Number(amount),
			productId: productId ?? "",
			from: from ?? "",
			description: description ?? ""
		}
	})
	// redirect to the gift thanks page
	return NextResponse.redirect(
		new URL(
			`/gift-thanks?productId=${productId}&amount=${amount}&from=${from}&description=${description}`,
			req.url
		)
	)
}
