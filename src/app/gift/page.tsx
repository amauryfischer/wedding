"use server"
import Gift from "./Gift"
import prisma from "../db"

export default async function Page() {

	const products = await prisma.product.findMany()
	const payments = await prisma.payment.findMany()
	return <Gift products={products} payments={payments} />
}
