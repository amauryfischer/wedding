import { PrismaClient } from "@prisma/client"
import { Coda } from "coda-js"
const prisma = new PrismaClient()
async function main() {
	const chateau1 = await prisma.hebergement.create({
		data: {
			value: "chateau_1",
			description: "Château - Chambre 1 Lit double 160cm (100€)",
			price: "100€",
			quantity: 10
		}
	})
	const chateau2 = await prisma.hebergement.create({
		data: {
			value: "chateau_2",
			description: "Château - Chambre 1 Lit double 150cm (100€)",
			price: "100€",
			quantity: 10
		}
	})
	const chateau3 = await prisma.hebergement.create({
		data: {
			value: "chateau_3",
			description:
				"Château - Chambre 2 Lits simples 100cm ou 1 Lit double 200cm (100€)",
			price: "100€",
			quantity: 10
		}
	})
	const hotel1 = await prisma.hebergement.create({
		data: {
			value: "hotel_1",
			description: "Hôtel – Chambre 1 Lit double 160 cm (75€)",
			price: "75€",
			quantity: 10
		}
	})
	const hotel2 = await prisma.hebergement.create({
		data: {
			value: "hotel_2",
			description:
				"Hôtel – Chambre 2 Lits simples 80 cm ou 1 Lit double 160 cm (75€)",
			price: "75€",
			quantity: 10
		}
	})
	const hotel3 = await prisma.hebergement.create({
		data: {
			value: "hotel_3",
			description:
				"Hôtel – Chambre 2 Lits simples 90 cm ou 1 Lit double 180 cm (75€)",
			price: "75€",
			quantity: 10
		}
	})
	const gite1 = await prisma.hebergement.create({
		data: {
			value: "gite_1",
			description: "Gîte - Chambre 1 Lit double 140 cm + 1 BZ (70€)",
			price: "70€",
			quantity: 10
		}
	})
	const bungalow1 = await prisma.hebergement.create({
		data: {
			value: "bungalow_1",
			description:
				"Bungalow – 2 x Chambres avec 2 Lits simples 80 cm ou 1 Lit double 160 cm (70€)",
			price: "70€",
			quantity: 10
		}
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})