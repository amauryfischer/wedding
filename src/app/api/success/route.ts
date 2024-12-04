import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// success
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const productId = searchParams.get("productId")
	const amount = searchParams.get("amount")
	console.log("success")
	console.log(productId, amount)
	return new NextResponse("success", { status: 200 })
}
