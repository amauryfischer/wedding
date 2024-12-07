import db from "@/app/db"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// success
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const productId = searchParams.get("productId")
	const amount = searchParams.get("amount")
	await db.payment.create({
		data: {
			amount: Number(amount),
			productId: productId ?? "",
			from: "gift"
		}
	})
	return new NextResponse("success", { status: 200 })
}
