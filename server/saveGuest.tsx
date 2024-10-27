"use server"

import prisma from "@/app/db"

export const saveGuest = async (guest: any) => {
	const newGuest = await prisma.guest.create({
		data: {
			...guest
		}
	})
	return newGuest
}
