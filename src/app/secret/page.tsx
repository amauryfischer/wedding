"use server"

import prisma from "../db"
import SecretPage from "./SecretPage"

export default async function Page() {
	const guests = await prisma.guest.findMany()
	const products = await prisma.product.findMany()
	return <SecretPage guests={guests} products={products} />
}