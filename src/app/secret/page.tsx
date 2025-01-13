"use server"

import prisma from "../db"
import SecretPage from "./SecretPage"

export default async function Page() {
	const guests = await prisma.guest.findMany()
	return <SecretPage guests={guests} />
}