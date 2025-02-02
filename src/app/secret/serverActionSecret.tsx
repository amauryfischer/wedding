"use server"

import prisma from "../db"

export async function forceReservation(productId: string) {
	await prisma.product.update({
		where: { id: productId },
		data: { forcedReservation: true }
	})
}

export async function cancelReservation(productId: string) {
	await prisma.product.update({
		where: { id: productId },
		data: { forcedReservation: false }
	})
}